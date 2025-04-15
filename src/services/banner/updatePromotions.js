import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile, deleteFileFromS3 } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'
import { getOne } from '@src/services/helper/crud'


export class UpdatePromotionsHandler extends BaseHandler {

  async run() {
    let { images, title, slug, description, isActive, category, content, url, promotionId } = this.args
    const transaction = this.context.sequelizeTransaction
    let fileName

    let updateData = {}
    const promotionsExists = await db.Promotions.findOne({
      where: { id: promotionId },
      transaction
    })
    if (!promotionsExists) throw new AppError(Errors.PROMOTION_NOT_EXISTS)
    if (title) {
      updateData.title = title
    }
    if (description) {
      updateData.description = description
    }
    if (content) {
      updateData.content = content
    }
    if (isActive != undefined) {
      updateData.isActive = isActive

    }
    if (url) {
      updateData.url = url
    }
    if (category) {
      updateData.category = category
    }
    // if (image) {
    // fileName = await uploadFile(image.buffer, {
    //   name: image.originalname,
    //   mimetype: image.mimetype,
    //   filePathInS3Bucket: S3_FILE_PREFIX.promotions
    // })

    // if (promotionsExists?.image) await deleteFileFromS3(promotionsExists.image)
    // }
    if (slug) {
      const checkPromotionSlugExist = await db.Promotions.findOne({
        where: { slug: slug }
      })
      if (checkPromotionSlugExist && checkPromotionSlugExist.id != promotionId) throw new AppError(Errors.PROMOTION_SLUG_ALREADY_EXISTS)
      updateData.slug = slug
    }
    let imagesData = {}
    if (images) {

      const uploadedImagesArray = await Promise.all(
        Object.entries(images).map(async ([deviceType, image]) => {
          if (!image) return { [deviceType]: null };

          const uploadResult = await uploadFile(image.buffer, {
            name: `${image.originalname}_${deviceType}`,
            filePathInS3Bucket: S3_FILE_PREFIX.promotions,
          });

          return { [deviceType]: uploadResult.location };
        })
      );

      imagesData = Object.assign({}, ...uploadedImagesArray);
      const ImageUpdateDate = {}
      if (imagesData.web) ImageUpdateDate.image = imagesData.web
      if (imagesData.mobile) ImageUpdateDate.mobileImage = imagesData.mobile
      updateData = { ...updateData, ...ImageUpdateDate }
    }
    const promotions = await db.Promotions.update({
      ...updateData
      // title,
      // description,
      // category,
      // slug,
      // url,
      // content,
      // image: image ? fileName.location : promotionsExists.image
    }, { where: { id: promotionId }, transaction })

    return { promotions, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
