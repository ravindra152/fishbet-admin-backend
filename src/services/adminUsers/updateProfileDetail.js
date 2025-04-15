import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import { Op } from 'sequelize'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { updateEntity, getOne } from '@src/services/helper/crud'

const schema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    user: { type: 'object' },
    firstName: {
      type: 'string',
      maxLength: 50,
      minLength: 3,
      pattern: '^[a-zA-Z0-9]*$'
    },
    lastName: {
      type: 'string',
      maxLength: 50,
      pattern: '^[a-zA-Z0-9 ]*$'
    },
    email: {
      type: 'string',
      maxLength: 150,
      format: 'email'
    },
    superAdminUsername: {
      type: 'string',
      pattern: '^[A-Za-z][A-Za-z0-9_]{3,50}$'
    }
  },
  required: ['id', 'user', 'firstName', 'lastName', 'email', 'superAdminUsername']
}



export class UpdateProfileDetail extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    let { firstName, lastName, email, superAdminUsername, id, user } = this.args
    const updateSuperadminUser = { firstName, lastName, email, superAdminUsername }
    const transaction = this.context.sequelizeTransaction

    if ((user.email !== email) || (user.superAdminUsername !== superAdminUsername)) {
      email = email.toLowerCase()

      const emailOrUsernameExist = await getOne({
        model: db.SuperAdminUser,
        data: { [Op.or]: { email, superAdminUsername }, [Op.not]: { superAdminUserId: id } },
        attributes: ['email', 'superAdminUsername'],
        transaction
      })

      if (emailOrUsernameExist) {
        if (emailOrUsernameExist.email === email) throw new AppError(Errors.EMAIL_ALREADY_EXISTS)

        throw new AppError(Errors.USER_NAME_EXISTS)
      }
    }

    await updateEntity({
      model: db.SuperAdminUser,
      values: { superAdminUserId: id },
      data: updateSuperadminUser,
      transaction
    })

    const superadminDetail = await getOne({
      model: db.SuperAdminUser,
      data: { superAdminUserId: id },
      exclude: ['password', 'resetPasswordToken', 'resetPasswordSentAt'],
      transaction
    })

    return { superadminDetail, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
