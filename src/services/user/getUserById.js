import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne } from '@src/services/helper/crud'
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'
import { Op } from 'sequelize'

const schema = {
  type: 'object',
  properties: {
    user: { type: 'object' },
    userId: { type: 'string' }
  },
  required: ['userId', 'user']
}


export class GetUserByIdHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { userId } = this.args
    const query = { userId }
    const userDetail = await getOne({ model: db.User, data: { userId } })
    if (!userDetail) throw new AppError(Errors.USER_NOT_EXISTS)

    const getUser = await getOne({
      model: db.User,
      data: query,
      attributes: { exclude: ['password'] },
      include: [
        {
          model: db.Wallet,
          as: 'userWallet',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: db.UserDetails,
          as: 'userDetails',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: db.UserBonus,
          as: 'bonus',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: db.Limit,
          as: 'userLimits',
          required: false
        }
      ]
    })

    if (!getUser) throw new AppError(Errors.USER_NOT_EXISTS);

    const transactionSummary = await db.Transaction.findAll({
      where: { userId },
      attributes: [
        [
          db.sequelize.fn(
            'COALESCE',
            db.sequelize.fn(
              'SUM',
              db.sequelize.literal(
                `CASE WHEN "Transaction"."purpose" = 'purchase' THEN "bankingLedger"."amount" ELSE 0 END`
              )
            ),
            0
          ),
          'totalPurchase'
        ],
        [
          db.sequelize.fn(
            'COALESCE',
            db.sequelize.fn(
              'SUM',
              db.sequelize.literal(
                `CASE WHEN "Transaction"."purpose" = 'redeem' THEN "bankingLedger"."amount" ELSE 0 END`
              )
            ),
            0
          ),
          'totalRedeemed'
        ]
      ],
      include: [
        {
          model: db.TransactionLedger,
          as: 'bankingLedger',
          required: false,
          attributes: []
        }
      ],
      group: ['Transaction.user_id'],
      raw: true
    });

    const { totalPurchase = 0, totalRedeemed = 0 } = transactionSummary[0] || {};

    getUser.setDataValue('totalScPurchase', totalPurchase);
    getUser.setDataValue('totalScRedeemed', totalRedeemed);

    return {
      getUser,
      message: SUCCESS_MSG.GET_SUCCESS
    };
  }
}
