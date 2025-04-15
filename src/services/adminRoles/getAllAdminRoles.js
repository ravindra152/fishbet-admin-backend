import db from '@src/db/models';
import { AppError } from '@src/errors/app.error';
import { Errors } from '@src/errors/errorCodes';
import { BaseHandler } from '@src/libs/logicBase';
import { SUCCESS_MSG } from '@src/utils/success';
import { pageValidation } from '@src/utils/common';

export class GetAllAdminRolesHandler extends BaseHandler {
  async run() {
    const { limit, pageNo } = this.args;


    const { page, size } = pageValidation(pageNo, limit);
    const offset = (page - 1) * size;

    try {

      const adminRoles = await db.AdminRole.findAndCountAll({
        attributes: ['roleId', 'name', 'permission', 'level', 'createdAt', 'updatedAt'],
        order: [['roleId', 'ASC']],
        limit: size,
        offset
      });


      if (!adminRoles.rows.length) {
        throw new AppError(Errors.ADMIN_ROLE_NOT_EXISTS);
      }

      return {
        adminRoles,
        total: adminRoles.count,
        page,
        size,
        message: SUCCESS_MSG.GET_SUCCESS
      };
    } catch (error) {
      throw new AppError(Errors.INTERNAL_ERROR, 'Failed to retrieve admin roles', error);
    }
  }
}
