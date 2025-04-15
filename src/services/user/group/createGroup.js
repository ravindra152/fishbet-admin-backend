import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'

import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { Op } from 'sequelize'

export class CreateGroupHandler extends BaseHandler {

  async run () {
    const { name, isActive } = this.args

    const transaction = this.context.sequelizeTransaction
    const group = await db.Group.findOne({
      where: { name: { [Op.contains]: { EN: name.EN } } }
    })
    if (group) throw new AppError(Errors.GROUP_ALREADY_EXISTS)

    await db.Group.create({
      name: name,
      isActive: isActive
    }, { transaction })

    return { success: true, message: SUCCESS_MSG.CREATE_SUCCESS }
  }
}
