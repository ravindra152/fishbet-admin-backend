import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne } from '@src/services/helper/crud'
import { sendEmail } from '@src/services/helper/email'
import { BONUS_TYPE, EMAIL_SUBJECTS, EMAIL_TEMPLATE_TYPES, TRANSACTION_STATUS, TRANSACTION_TYPE } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'
import { v4 as uuid } from 'uuid'

export class VerifyUserEmailHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { userId } = this.args
    const transaction = this.context.sequelizeTransaction

    const userDetails = await getOne({
      model: db.User,
      data: { userId },
      attributes: ['userId', 'email', 'isEmailVerified', 'currencyCode', 'locale', 'username', 'level', 'refParentId'],
      transaction
    })

    if (!userDetails) throw new AppError(Errors.USER_NOT_EXISTS)
    if (userDetails.isEmailVerified) throw new AppError(Errors.EMAIL_ALREADY_VERIFIED)

    await userDetails.set({ isEmailVerified: true, level: 1 }).save({ transaction })

    // Referral Ammount add
    if (userDetails.refParentId) {
      const referee = userDetails.refParentId
      const referrer = userId
      const referralAmount = await getOne({
        model: db.GlobalSetting,
        data: { key: 'REFERRAL_PERCENTAGE' },
        attributes: ['key', 'value'],
        transaction
      })
      const currency = await db.Currency.findOne({
        where: { code: referralAmount.value.currencyCode }
      })
      await addReferralAmountToUser(referee, referralAmount, currency.dataValues.currencyId)
    }

    await sendEmail({
      user: userDetails,
      emailTemplate: EMAIL_TEMPLATE_TYPES.EMAIL_VERIFICATION,
      data: { subject: EMAIL_SUBJECTS[userDetails.locale].verification || EMAIL_SUBJECTS.EN.verification }
    })

    async function addReferralAmountToUser(IdRef, referralAmount, currencyId) {
      let addAmount = referralAmount.value.amount
      const userWallet = await db.Wallet.findOne({
        where: { userId: IdRef, currencyId },
        include: {
          model: db.Currency,
          as: 'currency',
          attributes: ['code']
        }
      })
      addAmount = parseFloat(addAmount)
      await userWallet.set({ amount: userWallet.amount + addAmount }).save({ transaction })

      const transactionDetails = {
        targetId: IdRef,
        id: userWallet.id,
        amount: addAmount,
        currencyCode: userWallet.currency.code,
        beforeBalance: userWallet.amount,
        paymentProvider: 'Offline',
        transactionId: uuid(),
        amountType: 0,
        transactionType: TRANSACTION_TYPE.BONUS_REFERRAL,
        status: TRANSACTION_STATUS.SUCCESS
      }
      await db.TransactionBanking.create({ ...transactionDetails }, { transaction })
    }

    // Add joining Bonus
    const joiningBonus = await db.Bonus.findOne({
      where: { bonus_type: BONUS_TYPE.REFERRAL, isActive: true }
    })
    if (joiningBonus) {
      if (joiningBonus.dataValues.quantity === null || joiningBonus.dataValues.quantity > 0) {
        if (joiningBonus.dataValues.validFrom <= new Date() && joiningBonus.dataValues.validTo >= new Date()) {
          const currency = await db.Currency.findOne({
            where: { code: 'USD' }
          })
          const userWallet = await db.Wallet.findOne({
            where: {
              owner_id: userId,
              currencyId: currency.dataValues.currencyId
            },
            include: {
              model: db.Currency,
              as: 'currency',
              attributes: ['code']
            }
          })
          const addAmount = joiningBonus.dataValues.currency.USD.joiningAmount
          await userWallet.set({ amount: userWallet.amount + addAmount }).save({ transaction })

          const transactionDetails = {
            targetId: userId,
            id: userWallet.id,
            amount: addAmount,
            currencyCode: userWallet.currency.code,
            beforeBalance: userWallet.amount,
            paymentProvider: 'Offline',
            transactionId: uuid(),
            amountType: 0,
            transactionType: TRANSACTION_TYPE.BONUS,
            status: TRANSACTION_STATUS.SUCCESS
          }
          await db.TransactionBanking.create({ ...transactionDetails }, { transaction })
        }
      }
    }

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
