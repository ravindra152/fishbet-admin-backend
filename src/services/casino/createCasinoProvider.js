import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { createNewEntity, getOne } from '@src/services/helper/crud'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    gameAggregatorId: {
      type: ['string', 'null'],
      pattern: '^[0-9]+$'
    },
    isActive: {
      type: ['string', 'null'],
      enum: ['true', 'false', 'null', '']
    },
    thumbnail: { type: ['object', 'null'] },
    demo: { type: 'string' }
  },
  required: ['name']

}



export class CreateCasinoProviderHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run() {
    const { name, isActive, gameAggregatorId, thumbnail, demo } = this.args
    const transaction = this.context.sequelizeTransaction
    let data = { name, isActive, demo }
    let query

    if (gameAggregatorId) query = { gameAggregatorId }

    const checkProviderExists = await getOne({ model: db.CasinoProvider, data: { ...query, name }, transaction })
    if (checkProviderExists) throw new AppError(Errors.CASINO_PROVIDER_EXISTS)

    if (gameAggregatorId) {
      const checkAggregatorExist = await getOne({
        model: db.CasinoAggregator,
        data: { id: gameAggregatorId },
        transaction
      })

      data = { ...data, gameAggregatorId }
      if (!checkAggregatorExist) throw new AppError(Errors.AGGREGATOR_NOT_FOUND)
    }

    const createCasinoProvider = await createNewEntity({ model: db.CasinoProvider, data: data, transaction })

    if (thumbnail) {
      const location = await uploadFile(thumbnail.buffer, {
        name: createCasinoProvider.id,
        mimetype: thumbnail.mimetype,
        filePathInS3Bucket: S3_FILE_PREFIX.casino_provider
      })

      createCasinoProvider.thumbnailUrl = location.location
    }
    await createCasinoProvider.save({ transaction })

    return { createCasinoProvider, message: SUCCESS_MSG.CREATE_SUCCESS }
  }
}
