import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { BONUS_AMOUNT_TYPE, BONUS_TYPE, USER_BONUS_STATUS_VALUES } from '@src/utils/constants/bonus.constants'

const schema = {
  type: 'object',
  properties: {
    userId: { type: 'number' },
    depositAmount: { type: 'number' },
    currencyId: { type: 'number' },
    transaction: { type: 'object' }
  },
  required: ['userId', 'transaction', 'depositAmount', 'currencyId']
}


export class DepositBonusHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { userId, depositAmount, transaction } = this.args

    const userDepositBonus = await db.UserBonus.findOne({
      where: {
        userId,
        bonusType: BONUS_TYPE.DEPOSIT,
        status: USER_BONUS_STATUS_VALUES.ACTIVE
      },
      include: {
        model: db.Bonus,
        as: 'Bonus',
        where: { isActive: true },
        attributes: ['wageringMultiplier'],
        include: {
          model: db.BonusCurrency,
          where: { currencyId: this.args.currencyId }
        }
      },
      attributes: ['id', 'bonusId', 'userId', 'bonusAmount', 'amountToWager', 'wageredAmount', 'currencyId']
    })
    if (!userDepositBonus) return
    const updateUserBonus = {}
    if (userDepositBonus.Bonus.BonusCurrencies[0].minDepositAmount < depositAmount) {
      if (userDepositBonus.Bonus.BonusCurrencies[0].amountType === BONUS_AMOUNT_TYPE.AMOUNT) {
        updateUserBonus.bonusAmount = userDepositBonus.Bonus.BonusCurrencies[0].percentOrAmount
      } else {
        updateUserBonus.bonusAmount = (depositAmount * userDepositBonus.Bonus.BonusCurrencies[0].percentOrAmount) / 100
      }
      if (updateUserBonus.bonusAmount > userDepositBonus.Bonus.BonusCurrencies[0].maxBonusClaimed) {
        updateUserBonus.bonusAmount = userDepositBonus.Bonus.BonusCurrencies[0].maxBonusClaimed
      }
      updateUserBonus.amountToWager = updateUserBonus.bonusAmount * userDepositBonus.Bonus.wageringMultiplier
      updateUserBonus.status = USER_BONUS_STATUS_VALUES.IN_PROCESS
      updateUserBonus.currencyId = this.args.currencyId
      await userDepositBonus.set(updateUserBonus).save({ transaction })
    }

    return { updateUserBonus }
  }
}
14
