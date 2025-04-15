import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import { Op } from 'sequelize'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { getOne, updateEntity } from '@src/services/helper/crud'

export class UpdateAdminProfile extends BaseHandler {
  async run () {
    let { firstName, lastName, phone, email, adminUsername, id } = this.args
    const updateAdmin = { firstName, lastName, phone, email, adminUsername }
    const transaction = this.context.sequelizeTransaction

    const checkAdminExists = await getOne({
      model: db.AdminUser,
      data: { adminUserId: id },
      attributes: ['adminUserId', 'email', 'adminUsername', 'password'],
      transaction
    })
    if (!checkAdminExists) throw new AppError(Errors.ADMIN_NOT_FOUND)

    if ((checkAdminExists.email !== email) || (checkAdminExists.adminUsername !== adminUsername)) {
      email = email.toLowerCase()
      const emailOradminUsernameExist = await getOne({
        model: db.AdminUser,
        data: { [Op.or]: { email, adminUsername }, [Op.not]: { adminUserId: id } },
        attributes: ['email', 'adminUsername'],
        transaction
      })

      if (emailOradminUsernameExist) {
        if (emailOradminUsernameExist.email === email) throw new AppError(Errors.EMAIL_ALREADY_EXISTS)

        throw new AppError(Errors.USER_NAME_EXISTS)
      }
    }

    await updateEntity({
      model: db.AdminUser,
      values: { adminUserId: checkAdminExists.adminUserId },
      data: updateAdmin,
      transaction
    })

    const adminDetail = await getOne({ model: db.AdminUser, data: { adminUserId: id }, exclude: ['password'], transaction })

    return { adminDetail, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
