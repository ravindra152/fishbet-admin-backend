import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import { Op } from 'sequelize'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class UpdateAdminUserHandler extends BaseHandler {
  async run() {
    let { adminUserId, firstName, lastName, email, adminUsername, permission, group, isActive, user, id } = this.args
    const transaction = this.context.sequelizeTransaction


    const checkAdminExists = await db.AdminUser.findOne({
      where: { adminUserId },
      attributes: ['adminUserId', 'email', 'adminUsername'],
      transaction,
    })

    if (!checkAdminExists) throw new AppError(Errors.ADMIN_NOT_FOUND)

    email = email.toLowerCase()
    if ((checkAdminExists.email !== email) || (checkAdminExists.adminUsername !== adminUsername)) {
      const emailOradminUsernameExist = await db.AdminUser.findOne({
        where: { [Op.or]: { email, adminUsername }, [Op.not]: { adminUserId } },
        attributes: ['email', 'adminUsername'],
        transaction,
      })

      if (emailOradminUsernameExist) {
        if (emailOradminUsernameExist.email === email) {
          throw new AppError(Errors.EMAIL_ALREADY_EXISTS)
        }
        throw new AppError(Errors.USER_NAME_EXISTS)
      }
    }

    const updateAdminUser = await db.AdminUser.update(
      { firstName, lastName, email, adminUsername, group, permission, isActive, group },
      { where: { adminUserId: checkAdminExists.adminUserId }, transaction }
    )

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
