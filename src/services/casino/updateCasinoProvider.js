import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne, updateEntity } from '@src/services/helper/crud'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'


export class UpdateCasinoProviderHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {

    const { casinoProviderId, name, isActive, images, demo } = this.args
    const transaction = this.context.sequelizeTransaction
    let updateData = {}
    const checkProviderExists = await getOne({
      model: db.CasinoProvider,
      data: { id: casinoProviderId },
      transaction
    })
    if (name) updateData.name = { "EN": name }
    if (isActive != undefined) {
      updateData.isActive = isActive
    }
    if (demo) {
      updateData.demo = demo
    }
    if (!checkProviderExists) throw new AppError(Errors.CASINO_PROVIDER_NOT_FOUND)

    let imagesData = {}
    console.log("  images  ", images)
    if (images) {

      const uploadedImagesArray = await Promise.all(
        Object.entries(images).map(async ([deviceType, image]) => {
          if (!image) return { [deviceType]: null };

          const uploadResult = await uploadFile(image.buffer, {
            name: `${image.originalname}_${deviceType}`,
            filePathInS3Bucket: S3_FILE_PREFIX.casino_provider,
          });

          return { [deviceType]: uploadResult.location };
        })
      );

      imagesData = Object.assign({}, ...uploadedImagesArray);
      const ImageUpdateDate = {}
      if (imagesData.web) ImageUpdateDate.thumbnailUrl = imagesData.web
      if (imagesData.mobile) ImageUpdateDate.mobileThumbnailUrl = imagesData.mobile
      updateData = { ...updateData, ...ImageUpdateDate }
    }

    const updatedCasinoProvider = await updateEntity({
      model: db.CasinoProvider,
      values: { id: casinoProviderId },
      data: updateData,
      transaction
    })

    return { updatedCasinoProvider, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}