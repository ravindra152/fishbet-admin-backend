import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { COINS, LEDGER_DIRECTIONS, LEDGER_TRANSACTION_TYPES, TRANSACTION_PURPOSE, WITHDRAWAL_STATUS, TRANSACTION_STATUS } from '@src/utils/constants/public.constants'
import { SUCCESS_MSG } from '@src/utils/success'
import { CreateLedgerHandlerHandler } from './createLedgerHandler'
import { dayjs } from '@src/libs/dayjs'


export class RejectWithdrawRequestHandler extends BaseHandler {
  async run() {
    const { withdrawalId, id, reason } = this.args
    const transaction = this.dbTransaction


    const withdrawalRequest = await db.WithdrawalRequest.findOne({
      where: { id: withdrawalId, status: WITHDRAWAL_STATUS.PENDING },
      transaction,
    })

    if (!withdrawalRequest) throw new AppError(Errors.WITHDRAW_REQUEST_NOT_FOUND)

    // Update the withdrawal request status to REJECTED
    withdrawalRequest.status = WITHDRAWAL_STATUS.CANCELLED
    withdrawalRequest.confirmedAt = dayjs()


    withdrawalRequest.comment = reason || 'No reason provided'
    await db.Transaction.update({ status: TRANSACTION_STATUS.REJECTED }, {
      where:
        { withdrawalId: withdrawalRequest.id, userId: withdrawalRequest.userId },
      transaction
    })
    await withdrawalRequest.save({ transaction })

    // Use Transaction Ledger Handler
    const ledgerEntry = await CreateLedgerHandlerHandler.execute({
      transactionId: withdrawalRequest.id,
      transactionType: LEDGER_TRANSACTION_TYPES.WITHDRAW,
      userId: withdrawalRequest.userId,
      direction: LEDGER_DIRECTIONS[TRANSACTION_PURPOSE.REDEEM_REFUND],
      amount: withdrawalRequest.amount,
      currencyCode: COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN,
    }, this.context)



    return {
      success: true,
      withdrawalRequest,
      message: SUCCESS_MSG.CREATE_SUCCESS
    }

  }
}
