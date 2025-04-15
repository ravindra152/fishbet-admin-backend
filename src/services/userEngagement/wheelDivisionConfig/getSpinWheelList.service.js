import db from '@src/db/models';
import { BaseHandler } from '@src/libs/logicBase';
import { pageValidation } from '@src/utils/common';
import { SUCCESS_MSG } from '@src/utils/success';

export class GetSpinWheelListHandler extends BaseHandler {
   async run() {
    const { limit, pageNo } = this.args;

    const { page, size } = pageValidation(pageNo, limit);
    const offset = (page - 1) * size;

    const spinWheelList = await db.WheelDivisionConfiguration.findAndCountAll({
      order: [['wheelDivisionId', 'ASC']],
      limit,
      offset
    })
    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS, spinWheelList }
  }
}
