import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { Op } from 'sequelize'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne, updateEntity } from '@src/services/helper/crud'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'


export class UpdateGameCategoryHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { name, casinoCategoryId, isActive, images } = this.args
    const transaction = this.context.sequelizeTransaction
    let updateData = {}
    const checkCategoryExists = await getOne({
      model: db.CasinoCategory,
      data: { id: casinoCategoryId },
      transaction
    })

    if (!checkCategoryExists) throw new AppError(Errors.GAME_CATEGORY_NOT_FOUND)

    if (name) {
      // const nameExists = await getOne({
      //   model: db.CasinoCategory,
      //   data: { name },
      //   transaction
      // })

      // if (nameExists) throw new AppError(Errors.NAME_EXISTS)
      const nameExists = await getOne({
        model: db.CasinoCategory,
        data: { name: { [Op.contains]: { EN: name.EN } } },
        transaction
      })
      if (nameExists) {
        if (nameExists.dataValues.name.EN.trim().toLowerCase() === String(name.EN).trim().toLowerCase()) {
          throw new AppError(Errors.GAME_CATEGORY_EXISTS)
        }
      }
      updateData.name = name
    }
    // let updateData = { name: { ...checkCategoryExists.name, ...name }, isActive }
    if (isActive != undefined) {
      updateData.isActive = isActive
    }

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
      const updateImageData = {}
      if (imagesData.web) {
        updateImageData.imageUrl = imagesData.web
      }
      if (imagesData.mobile) {
        updateImageData.mobileImageUrl = imagesData.mobile
      }
      updateData = { ...updateData, ...updateImageData }
    }

    const updateCategory = await updateEntity({
      model: db.CasinoCategory,
      data: updateData,
      values: { id: casinoCategoryId },
      transaction
    })
    return { updateCategory, message: SUCCESS_MSG.CREATE_SUCCESS }
  }
}
