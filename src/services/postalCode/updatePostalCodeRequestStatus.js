import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import db from '@src/db/models'
import { POSTAL_CODE_STATUS } from '@src/utils/constants/public.constants'
import { SUCCESS_MSG } from '@src/utils/success'
import { serverDayjs } from '@src/libs/dayjs'
import { TransactionHandlerHandler } from '@src/services/wallet'
import { WITHDRAWAL_STATUS, LEDGER_TRANSACTION_TYPES, COINS, TRANSACTION_PURPOSE, LEDGER_DIRECTIONS } from '@src/utils/constants/public.constants'


export class UpdatePostalCodeRequestStatusHandler extends BaseHandler {
    async run() {
        const { postalCodeId, status } = this.args

        const transaction = this.context.sequelizeTransaction

        if (![POSTAL_CODE_STATUS.APPROVED, POSTAL_CODE_STATUS.REJECTED].includes(status)) {
            throw new AppError(Errors.INVALID_STATUS)
        }
        const postalCode = await db.PostalCode.findOne({
            where: { id: postalCodeId },
            transaction,
        })

        if (!postalCode) {
            throw new AppError(Errors.POSTAL_CODE_NOT_FOUND)
        }

        if (postalCode.status !== POSTAL_CODE_STATUS.PENDING) {
            throw new AppError(Errors.INVALID_STATUS_TRANSITION)
        }

        const gcCoinValue = postalCode.gcCoin
        const scCoinValue = postalCode.scCoin

        postalCode.status = status
        postalCode.updatedAt = serverDayjs()
        await postalCode.save({ transaction })

        if (status === POSTAL_CODE_STATUS.APPROVED) {
            await TransactionHandlerHandler.execute({
                userId: postalCode.userId,
                amount: gcCoinValue,
                currencyCode: COINS.GOLD_COIN,
                purpose: TRANSACTION_PURPOSE.POSTAL_CODE,
            }, this.context)

            await TransactionHandlerHandler.execute({
                userId: postalCode.userId,
                amount: scCoinValue,
                currencyCode: COINS.SWEEP_COIN.BONUS_SWEEP_COIN,
                purpose: TRANSACTION_PURPOSE.POSTAL_CODE,
            }, this.context)
        }

        return {
            postalCode,
            message: SUCCESS_MSG.UPDATE_SUCCESS,
            gcCoin: gcCoinValue,
            scCoin: scCoinValue,
        }
    }

}