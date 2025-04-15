import { Errors } from '@src/errors/errorCodes';
import { AppError } from '@src/errors/app.error';
import db from '@src/db/models';
import { BaseHandler } from '@src/libs/logicBase';
import { SUCCESS_MSG } from '@src/utils/success';

export class GetAdminChildren extends BaseHandler {
  async run() {
    const { adminUserId } = this.args;


    const adminDetails = await db.AdminUser.findAndCountAll({
      where: { parentId: adminUserId },
      order: [['adminUserId', 'ASC']],
      attributes: ['adminUserId', 'firstName', 'lastName', 'email', 'adminRoleId', 'parentId'],
    });

    if (!adminDetails.count) {
      throw new AppError(Errors.ADMIN_NOT_FOUND, `No children found for adminUserId: ${adminUserId}`);
    }

    const details = await Promise.all(
      adminDetails.rows.map(async (admin) => {
        const childCount = await db.AdminUser.count({ where: { parentId: admin.adminUserId } });
        return { ...admin.dataValues, childCount };
      })
    );

    return { adminDetails: details, message: SUCCESS_MSG.GET_SUCCESS };
  }
}
