import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { updateEntity } from '@src/services/helper/crud'
import { SUCCESS_MSG } from '@src/utils/success'

export class UpdateUserHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    let {
      userId, firstName, lastName, email, phone, phoneCode, gender, dateOfBirth,
      username, countryCode, city, zipCode, address, locale, newsLetter, sms, state
    } = this.args

    const transaction = this.context.sequelizeTransaction

    const checkUserExists = await db.User.findByPk(userId, { transaction })
    if (!checkUserExists) throw new AppError(Errors.USER_NOT_EXISTS)

    if (!username) username = ''
    // if ((email && (checkUserExists.email !== email)) || (checkUserExists.username && (checkUserExists.username !== username))) {
    //   email = email.toLowerCase()
    //   const emailOrUsernameExist = await getOne({
    //     model: db.User,
    //     data: { [Op.or]: { email, username }, [Op.not]: { userId } },
    //     attributes: ['email', 'username'],
    //     transaction
    //   })

    //   if (emailOrUsernameExist) {
    //     if (emailOrUsernameExist.email === email) throw new AppError(Errors.EMAIL_ALREADY_EXISTS)

    //     throw new AppError(Errors.USER_NAME_EXISTS)
    //   }
    // }

    const updateUser = {
      firstName,
      lastName,
      email,
      phone,
      phoneCode,
      gender,
      dateOfBirth,
      username,
      countryCode,
      city,
      state,
      zipCode,
      other: { ...checkUserExists.other, newsLetterSubscription: newsLetter, sms },
      locale
    }
    const userDetails = {
      address,
      state
    }

    await updateEntity({ model: db.User, values: { userId }, data: updateUser, transaction })
    await db.UserDetails.update(userDetails, { where: { userId } })

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
