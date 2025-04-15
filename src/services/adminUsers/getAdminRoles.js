import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class GetAdminRolesHandler extends BaseHandler {
  async run() {

    const roles = await db.AdminRole.findAll()
    if (!roles) throw new AppError(Errors.ROLE_NOT_FOUND)

    return { roles, message: SUCCESS_MSG.GET_SUCCESS }

  }
}
