import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne } from '@src/services/helper/crud'

const schema = {
  type: 'object',
  required: ['withdrawAmount', 'id', 'name', 'transactionId', 'transaction', 'email', 'paymentProvider', 'paymentAggregator']
}



export class CreateWithdrawRequestHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    let { id, withdrawAmount, name, transactionId, transaction, email, paymentProvider, otherAttributes, paymentAggregator } = this.args
    withdrawAmount = Math.abs(withdrawAmount.toFixed(2))

    const userWallet = await getOne({ model: db.Wallet, data: { userId: id } })

    if (!userWallet) return { err_type: 'BadData', err: 'Wallet not exists', success: false }
    if ((userWallet.amount - userWallet.nonCashAmount) < withdrawAmount) return { err_type: 'BadData', err: 'Insufficient balance', success: false }

    const withdrawRequest = await db.WithdrawRequest.create(
      {
        userId: id,
        name,
        email,
        amount: withdrawAmount,
        paymentProvider,
        paymentAggregator,
        transactionId,
        ...otherAttributes
      },
      { transaction }
    )

    return { err: null, success: true, withdrawRequest }
  }
}
