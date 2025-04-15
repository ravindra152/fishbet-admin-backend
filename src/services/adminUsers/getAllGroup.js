import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class GetAllAdminGroupHandler extends BaseHandler {
  async run () {
    const groupNames = await db.AdminUser.findAll({
      attributes: ['group'],
      group: ['group'],
      order: [['group', 'ASC']]
    })

    if (!groupNames) throw new AppError(Errors.GROUP_NOT_FOUND)

    const responseList = []
    groupNames.forEach(group => { responseList.push(group.group) })

    return { groupNames: responseList, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
