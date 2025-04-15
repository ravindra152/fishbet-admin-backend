import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { TRANSACTION_STATUS } from '@src/utils/constant'
import { TransactionHandlerHandler } from './transactionHandler'

export class ManageWalletHandler extends BaseHandler {
  async run() {
    const transaction = this.dbTransaction
    let { userId, amount, authenticatedAdminId, purpose, currencyCode } = this.args

    const userDetails = await db.User.findOne({
      attributes: ['userId', 'username'],
      where: { userId },
      transaction
    })
    if (!userDetails) throw new AppError(Errors.USER_NOT_EXISTS)

    const data = await TransactionHandlerHandler.execute({
      adminId: authenticatedAdminId, userId, amount, currencyCode,
      status: TRANSACTION_STATUS.SUCCESS,
      purpose: purpose,
    }, this.context)

    // WalletEmitter.emitUserWalletBalance({ data: data.ledger }, userDetails.userId)
    return { success: true }
  }
}
