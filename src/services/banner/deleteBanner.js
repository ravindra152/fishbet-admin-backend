import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { deleteImage } from '@src/utils/common'
import { deleteFileFromS3 } from '@src/utils/s3.utils'

// const schema = {
//   type: 'object',
//   properties: {
//     bannerId: { type: 'string' }
//   },
//   required: ['bannerId']
// }

//

export class DeleteBannerHandler extends BaseHandler {
  // get constraints () {
  //   return constraints
  // }

  async run () {
    const { bannerId } = this.args

    const checkBannerExist = await db.Banner.findOne({
      where: { id: bannerId }
    })
    if (!checkBannerExist) throw new AppError(Errors.BANNER_NOT_FOUND)
    if (checkBannerExist?.imageUrl) await deleteFileFromS3(checkBannerExist.imageUrl)

    await checkBannerExist.destroy()

    return { success: true, message: SUCCESS_MSG.DELETE_SUCCESS }
  }
}
