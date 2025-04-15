import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'


export class CreateAdminUserHandler extends BaseHandler {
  async run() {
    const { name, permission, level } = this.args
    const transaction = this.dbTransaction

    const roleExists = await db.AdminRole.findOne({
      where: { name: name.toLowerCase() }
    }, transaction)

    if (roleExists) throw new AppError(Errors.ROLE_NOT_FOUND)

    const role = db.AdminRole.create({
      name,
      permission,
      level
    }, transaction)

    delete admin.password

    return { role, message: SUCCESS_MSG.CREATE_SUCCESS }
  }
}
