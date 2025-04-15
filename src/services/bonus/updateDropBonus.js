import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { serverDayjs } from '@src/libs/dayjs'

export class UpdateDropBonusHandler extends BaseHandler {

    async run() {
        const { bonusId, coin, isActive, totalClaimsAllowed, expiryTime } = this.args
        const transaction = this.context.sequelizeTransaction
        const bonus = await db.DropBonus.findOne({
            where: { id: bonusId },
            transaction
        })

        if (!bonus) {
            throw new AppError(Errors.BONUS_NOT_FOUND)
        }

        const updateFields = {}

        if (expiryTime) {
            const expiryTimeTrimmed = expiryTime.trim()
            const expiryDate = serverDayjs(expiryTimeTrimmed)

            if (!expiryDate.isValid()) {
                throw new AppError(Errors.INVALID_EXPIRY_TIME)
            }

            const currentUTCDate = serverDayjs() // current UTC date
            if (expiryDate.isBefore(currentUTCDate)) {
                throw new AppError(Errors.INVALID_EXPIRY_TIME)
            }

            updateFields.expiryTime = expiryDate.toISOString()
        }
        if (coin) {
            // if (typeof coin !== 'number' || coin <= 0) {
            //     throw new AppError(Errors.INVALID_COIN_VALUE)
            // }
            updateFields.coin = Number(coin)
        }
        if (totalClaimsAllowed) {
            // if (typeof totalClaimsAllowed !== 'number' || totalClaimsAllowed < 0) {
            //     throw new AppError(Errors.INVALID_TOTAL_CLAIMS_ALLOWED)
            // }
            updateFields.totalClaimsAllowed = Number(totalClaimsAllowed)
        }
        if (isActive == false || isActive == true) {
            // if (typeof isActive !== 'boolean') {
            //     throw new AppError(Errors.INVALID_ACTIVE_STATUS)
            // }
            updateFields.isActive = isActive
        }
        const result = await db.DropBonus.update(updateFields, {
            where: { id: bonusId },
            transaction
        })

        if (result[0] === 0) {
            throw new AppError(Errors.BONUS_UPDATE_FAILED)
        }

        return {
            success: true,
            message: SUCCESS_MSG.UPDATE_SUCCESS,
        }
    }
}
