import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    casinoGameId: { type: 'string' },
    casinoProviderId: { type: 'string' },
    casinoCategoryId: { type: 'string' },
    name: { type: 'string' },
    devices: { type: 'string' },
    thumbnail: { type: 'object' },
    moreDetails: { type: 'string' },
    isActive: { enum: ['true', 'false'], default: 'true' },
    description: { type: ['string'] },
    hasFreespins: { type: ['string'] }
  },
  required: ['casinoGameId']
}



export class UpdateCasinoGameHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {

    const {
      casinoGameId, name, casinoProviderId, casinoCategoryId, images, isActive,
      devices, moreDetails, description, hasFreespins
    } = this.args
    const transaction = this.context.sequelizeTransaction

    const checkGameExists = await db.CasinoGame.findOne({ where: { id: casinoGameId }, transaction })
    if (!checkGameExists) throw new AppError(Errors.GAME_NOT_FOUND)

    const updateData = { casinoProviderId, casinoCategoryId, isActive, devices }
    if (casinoProviderId) {
      const provider = await db.CasinoProvider.findOne({ where: { id: casinoProviderId } })
      if (!provider) throw new AppError(Errors.PROVIDER_NOT_FOUND)
      checkGameExists.casinoProviderId = casinoProviderId
    }
    if (casinoCategoryId) {
      const category = await db.CasinoCategory.findOne({ where: { id: casinoCategoryId } })
      if (!category) throw new AppError(Errors.GAME_CATEGORY_NOT_FOUND)
      checkGameExists.casinoCategoryId = casinoCategoryId
    }
    if (hasFreespins) checkGameExists.hasFreespins = hasFreespins
    if (moreDetails) checkGameExists.moreDetails = moreDetails
    if (description) checkGameExists.description = description
    if (name) checkGameExists.name = name
    if (isActive != undefined) checkGameExists.isActive = isActive


    let imagesData = {}
    if (images) {
      const uploadedImagesArray = await Promise.all(
        Object.entries(images).map(async ([deviceType, image]) => {
          if (!image) return { [deviceType]: null }; // Handle missing images

          const uploadResult = await uploadFile(image.buffer, {
            name: `${image.originalname}_${deviceType}`,
            mimetype: image.mimetype,
            filePathInS3Bucket: S3_FILE_PREFIX.casino_game,
          });

          return { [deviceType]: uploadResult.location };
        })
      );

      imagesData = Object.assign({}, ...uploadedImagesArray);
      if (imagesData.web) checkGameExists.thumbnailUrl = imagesData.web;
      if (imagesData.mobile) checkGameExists.mobileThumbnailUrl = imagesData.mobile;
    }

    await checkGameExists.save({ transaction })
    // const updatedCasinoGame = await db.CasinoGame.update(updateData, { where: { id: casinoGameId }, transaction })
    return { checkGameExists, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
