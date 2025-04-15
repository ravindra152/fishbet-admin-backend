import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { dayjs } from '@src/libs/dayjs'
import { BaseHandler } from '@src/libs/logicBase'
import { HandleNowPayRedeemService } from '@src/services/wallet'
import { NOWPAYMENT_WEBHOOK_REDEEM_STATUS, TRANSACTION_STATUS, WITHDRAWAL_STATUS } from '@src/utils/constants/public.constants'
import { SUCCESS_MSG } from '@src/utils/success'

export class AcceptWithdrawRequestHandler extends BaseHandler {
  async run() {
    const { withdrawalId, id } = this.args
    const transaction = this.dbTransaction
    let response
    let redeemTransaction = {}
    try {
      const withdrawalRequest = await db.WithdrawalRequest.findOne({
        where: { id: withdrawalId, status: WITHDRAWAL_STATUS.PENDING },
        transaction,
      })
      if (!withdrawalRequest) throw new AppError(Errors.WITHDRAW_REQUEST_NOT_FOUND)
      try {
        response = await HandleNowPayRedeemService.execute({ amount: withdrawalRequest.amount, currency: withdrawalRequest.currency, address: withdrawalRequest.withdrawalAddress })
      } catch (error) {
        console.log(" error  ", error)
        throw new AppError(Errors.ERROR_WITH_PAYMENT_GATEWAY)
      }
      const data = response.data?.withdrawals || []
      if (data.length) {
        for (const withdraws of data) {
          if (withdraws.status === NOWPAYMENT_WEBHOOK_REDEEM_STATUS.REJECTED || withdraws.status === NOWPAYMENT_WEBHOOK_REDEEM_STATUS.FAILED) {
            throw new AppError(Errors.PAYMENT_FAILED)
          }
          redeemTransaction.paymentProviderId = withdraws.id
          redeemTransaction.moreDetails = { ...withdraws }
        }
      }

      withdrawalRequest.status = WITHDRAWAL_STATUS.SUCCESS
      withdrawalRequest.approvedAt = dayjs()

      await db.Transaction.update({ status: TRANSACTION_STATUS.SUCCESS, ...redeemTransaction }, {
        where:
        {
          withdrawalId: withdrawalRequest.id,
          userId: withdrawalRequest.userId
        },
        transaction
      })
      await withdrawalRequest.save({ transaction })

      return {
        success: true,
        withdrawalRequest,
        message: SUCCESS_MSG.CREATE_SUCCESS
      }

    } catch (error) {
      throw new AppError(error);
    }
  }
}
