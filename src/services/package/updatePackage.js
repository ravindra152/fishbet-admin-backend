import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'
import { PACKAGE_MINIMUM_AMOUNT_LIMIT } from '@src/utils/constants/public.constants'

export class UpdatePackageHandler extends BaseHandler {

  async run() {
    const { id, label, amount, gcCoin, scCoin, isActive, isVisibleInStore, imageUrl, discountAmount } = this.args
    const transaction = this.context.sequelizeTransaction

    const existingPackage = await db.Package.findOne({ where: { id } })

    if (!existingPackage) {
      throw new AppError(Errors.PACKAGE_NOT_FOUND)
    }

    if (label) existingPackage.label = label
    if (amount) {
      if (Number(amount) < PACKAGE_MINIMUM_AMOUNT_LIMIT.MIN) {
        throw new AppError(Errors.PACKAGE_MINIMUM_AMOUNT_ERROR)
      }
      existingPackage.amount = amount
    }
    if (gcCoin) existingPackage.gcCoin = gcCoin
    if (scCoin) existingPackage.scCoin = scCoin
    if (isActive) existingPackage.isActive = isActive
    if (isVisibleInStore) existingPackage.isVisibleInStore = isVisibleInStore
    if (discountAmount) existingPackage.discountAmount = discountAmount

    if (imageUrl) {
      const location = await uploadFile(imageUrl.buffer, {
        name: imageUrl.originalname,
        mimetype: imageUrl.mimetype,
        filePathInS3Bucket: S3_FILE_PREFIX.packages
      })
      existingPackage.imageUrl = location.location
    }
    await existingPackage.save({ transaction })

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
