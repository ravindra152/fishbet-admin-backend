import db from '@src/db/models'
// import db from "@src/db/models"
import { BaseHandler } from '@src/libs/logicBase'
import { updateEntity } from '@src/services/helper/crud'
import { SUCCESS_MSG } from '@src/utils/success'

export class UpdateAffiliatePercentage extends BaseHandler {

  async run() {
    const { userId, affiliatePercentage } = this.args
    const transaction = this.context.sequelizeTransaction

    const updatedPercentage = await updateEntity({
      model: db.UserDetails,
      values: { userId: userId },
      data: { referralPercentage: affiliatePercentage },
      transaction
    })

    return { updatedPercentage, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
