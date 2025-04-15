import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { createAccessToken } from '@src/helpers/authentication.helpers'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { comparePassword } from '@src/utils/common'
import { JWT_TOKEN_TYPES } from '@src/utils/constant'

const constraints = ajv.compile({
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['password', 'email']
})

export class AdminLoginHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { email, password, } = this.args

    try {
      const adminUser = await db.AdminUser.findOne({
        where: { email: email.toLowerCase() },
        attributes: ['adminUserId', 'firstName', 'lastName', 'permission', 'phone', 'adminRoleId', 'email', 'createdAt', 'password', 'permission'],
      })
      if (!adminUser) throw new AppError(Errors.USER_NOT_EXISTS)
      if (!await comparePassword(password, adminUser.password)) throw new AppError(Errors.WRONG_PASSWORD_ERROR)
      const accessToken = await createAccessToken(adminUser, JWT_TOKEN_TYPES.LOGIN)
    console.log("Token>>>>>>>>>>",accessToken)
      adminUser.dataValues.accessToken = accessToken
      delete adminUser.dataValues.password
      return { success: true, adminUser }
    }
    catch (error) {
      return this.handleError(error)
    }
  }
}
