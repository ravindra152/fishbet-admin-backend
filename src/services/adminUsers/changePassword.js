import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { comparePassword, encryptPassword } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'


export class ChangePasswordHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { id, user, password, newPassword, userType } = this.args
    // const key = `${userType}-${user.superAdminUserId}-${user.superAdminUsername}`
    const transaction = this.dbTransaction;

    const requestingAdmin = await db.AdminUser.findOne({
      where: { adminUserId: user.userId },
      attributes: ["adminUserId", "password"],
      transaction,
    });

    if (!requestingAdmin) throw new AppError(Errors.UN_AUTHORIZE);

    if (!await comparePassword(password, requestingAdmin.password)) throw new AppError(Errors.WRONG_PASSWORD_ERROR)
    if (await comparePassword(newPassword, requestingAdmin.password)) throw new AppError(Errors.SAME_PASSWORD_ERROR)

    await db.AdminUser.update(
      { password: encryptPassword(newPassword) },
      { where: { adminUserId: user.userId }, transaction }
    );

    // await deleteCache(key)
    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
