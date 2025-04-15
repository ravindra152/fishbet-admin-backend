import db from '@src/db/models';
import { AppError } from '@src/errors/app.error';
import { Errors } from '@src/errors/errorCodes';
import { SUCCESS_MSG } from '@src/utils/success';
import { BaseHandler } from '@src/libs/logicBase';

export class GetAdminRoleHandler extends BaseHandler {
  async run() {
    const { roleId } = this.args;

    const data = await db.AdminRole.findOne({
      where: { roleId }
    });

    if (!data) {
      throw new AppError(Errors.ADMIN_ROLE_NOT_FOUND);
    }

    return { data, message: SUCCESS_MSG.GET_SUCCESS };
  }
}
