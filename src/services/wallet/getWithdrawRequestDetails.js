import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'

export class GetWithdrawRequestDetailsHandler extends BaseHandler {
  async run() {
    const { withdrawalId } = this.args

    // Fetch the transaction ledger details related to the withdrawal
    const ledgerEntries = await db.TransactionLedger.findAll({
      where: { transactionId: withdrawalId },
      include: [
        {
          model: db.WithdrawalRequest,
          as: 'withdrawalLedger',
        },
        {
          model: db.Wallet,
        },
      ],
    })

    if (!ledgerEntries || ledgerEntries.length === 0) {
      throw new AppError(Errors.WITHDRAW_REQUEST_NOT_FOUND)
    }

    return {
      success: true,
      ledgerEntries,
    }
  }
}
