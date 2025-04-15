import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { updateEntity } from '@src/services/helper/crud'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    image: { type: 'object' }
  },
  required: ['name', 'image']
}



export class UploadImageGalleryHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

   async run () {
    const { image, name } = this.args
    const transaction = this.context.sequelizeTransaction
    let fileName, gallery

    if (image) {
      fileName = await uploadFile(image.buffer, {
        name: image.originalname,
        mimetype: image.mimetype,
        filePathInS3Bucket: S3_FILE_PREFIX.imageGallery
      })
      fileName = fileName.location
    }

    const superadminGallery = ((await db.GlobalSetting.findOne({
      attributes: ['key', 'value'],
      where: { key: 'ADMIN_GALLERY' },
      raw: true,
      transaction
    })).value)
    superadminGallery.push({ name, fileName })
    gallery = superadminGallery
    await updateEntity({
      model: db.GlobalSetting,
      values: { key: 'ADMIN_GALLERY' },
      data: { value: superadminGallery },
      transaction
    })

    return { gallery, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
