import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne } from '@src/services/helper/crud'
import { SUCCESS_MSG } from '@src/utils/success'
import { Op } from 'sequelize' // Correct import for Op


export class CreateCategoryGameHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run() {
    const { categoryId, games } = this.args
    const transaction = this.context.sequelizeTransaction

    // Check if the category exists
    const categoryExists = await getOne({
      model: db.CasinoCategory,
      data: { id: categoryId },
      transaction
    })

    if (!categoryExists) {
      throw new AppError(Errors.GAME_CATEGORY_NOT_FOUND)
    }

    // Update all games with the new categoryId in a bulk operation
    await db.CasinoGame.update(
      { casinoCategoryId: categoryId },
      {
        where: { casinoGameId: { [Op.in]: games } }, // Correct filter using Op
        transaction
      }
    )
    return { success: true, message: SUCCESS_MSG.CREATE_SUCCESS }
  }

  catch (error) {
    // Replace with a proper logging mechanism if available
    console.error('Error in CreateCategoryGameHandler:', error)

    // Add internal server error to error log
    this.addError('InternalServerErrorType', error)
  }
}
