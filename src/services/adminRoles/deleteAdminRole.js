import db from '@src/db/models';
import { AppError } from '@src/errors/app.error';
import { Errors } from '@src/errors/errorCodes';
import { BaseHandler } from '@src/libs/logicBase';
import { SUCCESS_MSG } from '@src/utils/success';


export class DeleteAdminRoleHandler extends BaseHandler {
  async run() {
    const { roleId } = this.args;
    const transaction = this.context.sequelizeTransaction;

    const adminUsers = await db.AdminRole.findAll({ where: { adminRoleId: roleId }, transaction })
    if (adminUsers.length > 0) throw new AppError(Errors.ADMIN_ALREADY_EXISTS)
    const adminRole = await db.AdminRole.findOne({ where: { roleId }, transaction });

    if (!adminRole) {
      throw new AppError(Errors.ADMIN_ROLE_NOT_FOUND);
    }

    try {
      await adminRole.destroy({ transaction });
      return { msuccess: true, message: SUCCESS_MSG.DELETE_SUCCESS };
    } catch (error) {
      throw error
    }
  }
}
