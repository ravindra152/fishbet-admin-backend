import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { BANNER_KEYS } from '@src/utils/constant'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { S3_FILE_PREFIX, BANNER_TYPE } from '@src/utils/constants/public.constants'
import { uploadFile, deleteFileFromS3 } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'

export class UpdateBannerPageHandler extends BaseHandler {

  async run() {
    const { bannerId, images, title, description, redirectUrl, order, bannerType } = this.args
    const transaction = this.context.sequelizeTransaction
    let fileName

    const checkBannerExist = await db.Banner.findOne({
      where: { id: bannerId }
    })
    if (!checkBannerExist) throw new AppError(Errors.BANNER_NOT_FOUND)
    // if (!BANNER_KEYS.includes(bannerType)) throw new AppError(Errors.BANNER_NOT_FOUND)
    if (bannerType) {
      if (!Object.values(BANNER_TYPE).includes(bannerType)) throw new AppError(Errors.INVALID_BANNER_TYPE)
    }

    const updateData = {}
    if (bannerType) updateData.bannerType = bannerType
    if (redirectUrl) updateData.redirectUrl = redirectUrl
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (order) updateData.order = Number(order)


    let imagesData = {}
    if (images) {
      const uploadedImagesArray = await Promise.all(
        Object.entries(images).map(async ([deviceType, image]) => {
          if (!image) return { [deviceType]: null }; // Handle missing images

          const uploadResult = await uploadFile(image.buffer, {
            name: `${deviceType}_${image.originalname}`,
            mimetype: image.mimetype,
            filePathInS3Bucket: S3_FILE_PREFIX.banner,
          });

          if (checkBannerExist?.imageUrl) await deleteFileFromS3(checkBannerExist.imageUrl)
          return { [deviceType]: uploadResult.location };
        })
      );

      imagesData = Object.assign({}, ...uploadedImagesArray);
      console.log(imagesData)
      // ✅ Correct way to update Sequelize instance fields
      if (imagesData.web) updateData.imageUrl = imagesData.web;
      if (imagesData.mobile) updateData.mobileImageUrl = imagesData.mobile;
    }
    const updateBanner = await db.Banner.update(updateData, {
      where: {
        id: bannerId
      }
    }, { transaction })

    return { updateBanner, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}