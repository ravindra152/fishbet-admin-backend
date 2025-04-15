import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import Jwt from 'jsonwebtoken'

import config from '@src/configs/app.config'
import db from '@src/db/models'
import { deleteCache } from '@src/libs/redis'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne } from '@src/services/helper/crud'
import { encryptPassword } from '@src/utils/common'
import { ROLE } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    newPasswordKey: { type: 'string' },
    userId: { type: ['number', 'null'] },
    username: { type: ['string', 'null'] },
    password: { type: ['string', 'null'], format: 'password' }
  },
  required: ['newPasswordKey']
}



export class VerifyForgetPasswordHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { newPasswordKey, password, username, userId } = this.args
    let newPasswordKeyData, userData, key

    try {
      newPasswordKeyData = Jwt.verify(newPasswordKey, config.get('jwt.resetPasswordKey'))
      if (!newPasswordKeyData) throw new AppError(Errors.RESET_PASSWORD_TOKEN)
      if (!password && !username && !userId) {
        return { tokenValid: true, username: newPasswordKeyData.username, userId: newPasswordKeyData.userId, newPasswordKey, message: 'Reset your password' }
      }
    } catch (error) {
      throw new AppError(Errors.RESET_PASSWORD_TOKEN)
    }

    userData = await getOne({
      model: db.SuperAdminUser,
      data: { superAdminUserId: newPasswordKeyData.userId, superAdminUsername: newPasswordKeyData.username },
      attributes: ['superAdminUserId', 'password', 'superAdminUsername']
    })

    if (!userData) {
      userData = await getOne({
        model: db.AdminUser,
        data: { adminUserId: newPasswordKeyData.userId, adminUsername: newPasswordKeyData.username },
        attributes: ['adminUserId', 'password', 'adminUsername']
      })

      if (!userData) throw new AppError(Errors.USER_NOT_EXISTS)
      else if (userData && userId !== userData.dataValues.adminUserId &&
        username !== userData.dataValues.adminUsername) throw new AppError(Errors.RESET_PASSWORD_TOKEN)
    } else if (userData && userId !== userData.dataValues.superAdminUserId &&
      username !== userData.dataValues.username) throw new AppError(Errors.RESET_PASSWORD_TOKEN)

    if (userData?.superAdminUserId) key = `${ROLE.ADMIN}-${userData.superAdminUserId}-${userData.superAdminUsername}`
    else key = `${ROLE.ADMIN}-${userData.adminUserId}-${userData.adminUsername}`

    await userData.set({ password: encryptPassword(password) }).save()
    await deleteCache(key)

    return { success: true, message: SUCCESS_MSG.PASSWORD_RESET }
  }
}
