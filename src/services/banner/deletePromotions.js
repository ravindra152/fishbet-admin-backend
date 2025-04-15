import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { deleteFileFromS3 } from '@src/utils/s3.utils'

export class DeletePromotionsHandler extends BaseHandler {

  async run() {
    const promotionsExists = await db.Promotions.findOne({
      where: { id: this.args.promotionId }
    })
    if (!promotionsExists) throw new AppError(Errors.PROMOTION_NOT_EXISTS)
    if (promotionsExists.image) await deleteFileFromS3(promotionsExists.image)

    await promotionsExists.destroy()
    return { success: true, message: SUCCESS_MSG.DELETE_SUCCESS }
  }
}
