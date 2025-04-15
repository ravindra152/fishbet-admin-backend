import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'

export class UpdateBonusHandler extends BaseHandler {
  async run() {
    const { bonusId, bonusType, promotionTitle, scAmount, gcAmount, percentage, maxBonusLimit, status, description, termsConditions, bonusImage } = this.args
    const transaction = this.context.sequelizeTransaction

    const bonus = await db.Bonus.findOne({
      where: { id: bonusId },
      transaction
    })

    if (!bonus) throw new AppError(Errors.BONUS_NOT_FOUND)

    const updatedData = {
      bonusType: bonusType || bonus.bonusType,
      promotionTitle: promotionTitle || bonus.promotionTitle,
      scAmount: scAmount || bonus.scAmount,
      gcAmount: gcAmount || bonus.gcAmount,
      percentage: percentage || bonus.percentage,
      maxBonusLimit: maxBonusLimit || bonus.maxBonusLimit,
      status: status || bonus.status,
      description: description || bonus.description,
      termsConditions: termsConditions || bonus.termsConditions
    }

    if (bonusImage) {
      const data = await uploadFile(bonusImage.buffer, {
        name: bonusImage.originalname,
        mimetype: bonusImage.mimetype,
        filePathInS3Bucket: S3_FILE_PREFIX.bonus
      })
      updatedData.imageUrl = data.location
    }

    await db.Bonus.update(updatedData, { where: { id: bonusId }, transaction })

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
