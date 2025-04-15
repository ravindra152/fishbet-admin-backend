import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { DEVICE_TYPE, S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'

export class CreateBannerHandler extends BaseHandler {
  async run() {
    const { images, bannerType, title, description, redirectUrl, order } = this.args // Expecting an array of banner objects
    const transaction = this.context.sequelizeTransaction

    if (!bannerType) {
      throw new AppError(Errors.IMAGE_NOT_FOUND, 'Banner Type is required');
    }

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

          return { [deviceType]: uploadResult.location };
        })
      );

      imagesData = Object.assign({}, ...uploadedImagesArray);
    }

    const bannerData = {
      bannerType,
      title,
      description,
      redirectUrl,
      imageUrl: imagesData.web,
      mobileImageUrl: imagesData.mobile,
      isActive: true
    };

    const createdBanner = await db.Banner.create(bannerData, { transaction });

    return { createdBanner, message: SUCCESS_MSG.UPDATE_SUCCESS };
  }
}
