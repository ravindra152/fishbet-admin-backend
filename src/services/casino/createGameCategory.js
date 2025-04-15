import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { Op } from 'sequelize'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { createNewEntity, getOne } from '@src/services/helper/crud'
import { SUCCESS_MSG } from '@src/utils/success'
import { uploadFile } from '@src/utils/s3.utils'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'


const schema = {
  type: 'object',
  properties: {
    name: { type: 'object' },
    isActive: { type: 'boolean' },
    imageUrl: { type: 'object' }
  },
  required: ['name', 'isActive']
}

export class CreateGameCategoryHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { name, isActive, images } = this.args
    const transaction = this.context.sequelizeTransaction
    const checkCategoryExists = await getOne({
      model: db.CasinoCategory,
      data: { name: { [Op.contains]: { EN: name.EN } } },
      transaction
    })
    if (checkCategoryExists) {
      if (checkCategoryExists.dataValues.name.EN.trim().toLowerCase() === String(name.EN).trim().toLowerCase()) {
        throw new AppError(Errors.GAME_CATEGORY_EXISTS)
      }
    }

    let lastOrderId = await db.CasinoCategory.max('orderId', transaction)
    if (!lastOrderId) lastOrderId = 0

    let imagesData = {}
    if (images) {
      const uploadedImagesArray = await Promise.all(
        Object.entries(images).map(async ([deviceType, image]) => {
          if (!image) return { [deviceType]: null }; // Handle missing images

          const uploadResult = await uploadFile(image.buffer, {
            name: `${image.originalname}_${deviceType}`,
            mimetype: image.mimetype,
            filePathInS3Bucket: S3_FILE_PREFIX.casino_category,
          });

          return { [deviceType]: uploadResult.location };
        })
      );
      imagesData = Object.assign({}, ...uploadedImagesArray);
    }

    const createCategory = await createNewEntity({
      model: db.CasinoCategory,
      data: { name, isActive, orderId: lastOrderId + 1, imageUrl: imagesData.web, mobileImageUrl: imagesData.mobile },
      transaction
    })

    createCategory.imageUrl = ''

    return { createCategory, message: SUCCESS_MSG.CREATE_SUCCESS }
  }
}
