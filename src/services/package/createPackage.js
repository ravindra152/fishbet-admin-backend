import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { from } from 'form-data'

export class CreatePackageHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { label, amount, gcCoin, scCoin, isActive, isVisibleInStore, imageUrl, discountAmount } = this.args

    const transaction = this.context.sequelizeTransaction

    const packageData = {
      label,
      amount,
      gcCoin,
      scCoin,
      isActive,
      isVisibleInStore,
      discountAmount
    }

    if (imageUrl) {
      const location = await uploadFile(imageUrl.buffer, {
        name: imageUrl.originalname,
        mimetype: imageUrl.mimetype,
        filePathInS3Bucket: S3_FILE_PREFIX.packages
      })
      packageData.imageUrl = location.location
    }

    const packageInstance = await db.Package.create(packageData, { transaction })

    return { package: packageInstance }

  }
}
