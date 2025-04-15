import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { BONUS_TYPE } from '@src/utils/constants/bonus.constants'

const constraints = ajv.compile({
  type: 'object',
  properties: {
    promotionTitle: { type: 'object' },
    termCondition: { type: 'object' },
    description: { type: 'object' },
    casinoProviderId: { type: 'string' },
    freeSpinsQty: { type: 'string' },
    betValue: { type: 'string' },
    bonusType: {
      type: 'string',
      enum: Object.values(BONUS_TYPE)
    },
    type: {
      type: 'string'
    },
    validTo: { type: 'string' },
    validFrom: { type: 'string' },
    daysToClear: { type: 'string' },
    forfeitThreshold: { type: 'number' },
    wageringMultiplier: { type: 'string', default: 1 },
    visibleInPromotions: { type: 'string' },
    userCanCancel: { type: 'boolean' },
    isDisplayOnBonus: { type: 'boolean' },
    excludeUserIds: { type: 'array', default: [] },
    gameIds: { type: 'array', default: [] },
    currencyDetails: {
      type: 'array'
      // items: {
      //  type: 'object',
      //  properties: {
      //    currencyId: { type: 'string' },
      //    amountType: {
      //     type: 'string',
      //     enum: Object.values(BONUS_AMOUNT_TYPE)
      //   },
      //   percentOrAmount: { type: 'string' },
      //   minDepositAmount: { type: 'string' },
      //  maxBonusClaimed: { type: 'string', minimum: '1' },
      // },
      // required: ['currencyId', 'percentOrAmount'],
      // additionalProperties: false
      // }
    },
    participationGames: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          providerId: { type: 'string' },
          subCategoryId: { type: 'string' },
          minimumBet: { type: 'string' },
          cashbackPercentage: { type: 'string' },
          gameIds: { type: 'array' },
          turnoverCoefficient: { type: 'string', default: '1' }
        },
        required: ['minimumBet'],
        additionalProperties: false
      }
    },
    userIds: { type: 'array' },
    userGroups: { type: 'array', default: [] },
    bonusImage: { type: 'object' },
    isActive: { type: 'string' }
  },
  required: ['promotionTitle', 'bonusType', 'daysToClear', 'termCondition']
})

export class CreateBonusHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { bonusType, bonusImage, gameList } = this.args
    let bonus

    const transaction = this.context.sequelizeTransaction
    const userGroup = this.args.userGroups || []

    //
    //   let bonuses = await db.Bonus.findOne({ where: { bonusType: this.args.bonusType, 'promotionTitle.EN': this.args.promotionTitle.EN } })
    //   if (bonuses) throw new AppError(Errors.ACTIVE_BONUS_EXISTS)

    //   if (bonusType === BONUS_TYPE.DEPOSIT) {
    //     if (!Object.values(DEPOSIT_BONUS_TYPE).includes(this.args.type)) {
    //       throw new AppError(Errors.INVALID_DEPOSITE_BONUS)
    //     }
    //     bonus = await db.Bonus.create({
    //       promotionTitle: this.args.promotionTitle,
    //       termCondition: this.args.termCondition,
    //       description: this.args.description,
    //       validFrom: this.args.validFrom,
    //       validTo: this.args.validTo,
    //       daysToClear: this.args.daysToClear,
    //       bonusType: this.args.bonusType,
    //       type: this.args.type,
    //       wageringMultiplier: this.args.wageringMultiplier || 1,
    //       forfeitThreshold: this.args.forfeitThreshold,
    //       isDisplayOnBonus: this.args.isDisplayOnBonus,
    //       userCanCancel: this.args.userCanCancel,
    //       visibleInPromotions: this.args.visibleInPromotions,
    //     }, { transaction })

    //     const currencyDetails = await Promise.all(this.args.currencyDetails.map(async (currency) => {
    //       if (await db.Currency.findOne({ where: { currencyId: currency.currencyId } })) {
    //         currency.bonusId = bonus.id
    //         return currency
    //       }
    //       return null
    //     }))
    //     if (currencyDetails.includes(null)) throw new AppError(Errors.CURRENCY_NOT_FOUND)

    //     const participationGames = await Promise.all(this.args.participationGames.map(async (subCategory) => {
    //       if (await db.CasinoCategory.findOne({ where: { id: subCategory.subCategoryId } })) {
    //         subCategory.bonusId = bonus.id
    //         return subCategory
    //       }
    //       return null
    //     }))
    //     if (participationGames.includes(null)) throw new AppError(Errors.GAME_SUB_CATEGORY_NOT_FOUND)

    //     let userGroups = await db.Group.findAll({ where: { id: userGroup }, attributes: ['id'] })
    //     userGroups = userGroups.map(group => {
    //       return {
    //         bonusId: bonus.id,
    //         groupId: group.id
    //       }
    //     })
    //     if (userGroups.includes(null)) throw new AppError(Errors.GROUP_NOT_FOUND)

    //     await db.BonusCurrency.bulkCreate(currencyDetails, { transaction })
    //     await db.BonusParticipationGames.bulkCreate(participationGames, { transaction })
    //     await db.BonusUserGroup.bulkCreate(userGroups, { transaction })
    //   }
    //   if (bonusType === BONUS_TYPE.CASHBACK) {
    //     if (!Object.values(CASHBACK_BONUS_TYPE).includes(this.args.type)) {
    //       throw new AppError(Errors.INVALID_CASH_BACK)
    //     }
    //     bonus = await db.Bonus.create({
    //       promotionTitle: this.args.promotionTitle,
    //       termCondition: this.args.termCondition,
    //       description: this.args.description,
    //       validFrom: this.args.validFrom,
    //       validTo: this.args.validTo,
    //       daysToClear: this.args.daysToClear,
    //       bonusType: this.args.bonusType,
    //       type: this.args.type,
    //       forfeitThreshold: this.args.forfeitThreshold,
    //       isDisplayOnBonus: this.args.isDisplayOnBonus || false,
    //       userCanCancel: this.args.userCanCancel || false,
    //       visibleInPromotions: this.args.visibleInPromotions || false,
    //       excludeUserIds: this.args.excludeUserIds || []
    //     }, { transaction })

    //     const currencyDetails = await Promise.all(this.args.currencyDetails.map(async (currency) => {
    //       if (await db.Currency.findOne({ where: { currencyId: currency.currencyId } })) {
    //         currency.bonusId = bonus.id
    //         return currency
    //       }
    //       return null
    //     }))
    //     if (currencyDetails.includes(null)) throw new AppError(Errors.CURRENCY_NOT_FOUND)

    //     const participationGames = await Promise.all(this.args.participationGames.map(async (subCategory) => {
    //       if (await db.CasinoCategory.findOne({ where: { id: subCategory.subCategoryId } })) {
    //         subCategory.bonusId = bonus.id
    //         return subCategory
    //       }
    //       return null
    //     }))
    //     if (participationGames.includes(null)) throw new AppError(Errors.GAME_SUB_CATEGORY_NOT_FOUND)

    //     let userGroups = await db.Group.findAll({ where: { id: userGroup }, attributes: ['id'] })
    //     userGroups = userGroups.map(group => {
    //       return {
    //         bonusId: bonus.id,
    //         groupId: group.id
    //       }
    //     })
    //     if (userGroups.includes(null)) throw new AppError(Errors.GROUP_NOT_FOUND)

    //     await db.BonusCurrency.bulkCreate(currencyDetails, { transaction })
    //     await db.BonusParticipationGames.bulkCreate(participationGames, { transaction })
    //     await db.BonusUserGroup.bulkCreate(userGroups, { transaction })
    //   }

    //   if (bonusType === BONUS_TYPE.FREESPINS) {
    //     bonus = await db.Bonus.create({
    //       promotionTitle: this.args.promotionTitle,
    //       termCondition: this.args.termCondition,
    //       description: this.args.description,
    //       validFrom: this.args.validFrom,
    //       validTo: this.args.validTo,
    //       daysToClear: this.args.daysToClear,
    //       bonusType: this.args.bonusType,
    //       type: this.args.type,
    //       isDisplayOnBonus: this.args.isDisplayOnBonus || false,
    //       userCanCancel: this.args.userCanCancel || false,
    //       visibleInPromotions: this.args.visibleInPromotions || false,
    //     }, { transaction })

    //     const currentTimeInSeconds = Math.round(Date.now() / 1000);
    //     const casinoProvider = await db.CasinoProvider.findOne({
    //       where: { id: this.args.casinoProviderId },
    //       attributes: ['id', 'name']
    //     })
    //     if (!casinoProvider) throw new AppError(Errors.CASINO_PROVIDER_NOT_FOUND)
    //     await db.FreespinBonus.create({
    //       bonusId: bonus.id,
    //       //currencyId: 8, // USD CURRENCY
    //       gameIds: this.args.gameIds,
    //       freespinQuantity: this.args.freeSpinsQty,
    //       bonusCode: bonusCode || uuid(),
    //       betValue: this.args.betValue,
    //       providerId: this.args.casinoProviderId
    //     }, { transaction })
    //   }

    //   if (bonusImage) {
    //     const { documentUrl: Location, fileName } = await uploadHuaweiImage(bonusImage)
    //     bonus.imageUrl = fileName
    //     await bonus.save({ transaction })
    //   }
    //   return { bonus, message: SUCCESS_MSG.CREATE_SUCCESS }
    // } catch (error) {
    //   console.log(error)
    //   this.addError('InternalServerErrorType', error)
    // }
  }
}
