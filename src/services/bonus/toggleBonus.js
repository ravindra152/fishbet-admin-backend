import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { BONUS_STATUS, BONUS_TYPE } from '@src/utils/constants/bonus.constants'


export class ToggleBonusHandler extends BaseHandler {
    async run() {
        const { bonusId } = this.args
        const transaction = this.context.sequelizeTransaction
        const bonus = await db.Bonus.findOne({
            attributes: ['id','status'],
            where: { id: bonusId },
            transaction
        })
        if(!bonus)
            throw new AppError(Errors.BONUS_NOT_FOUND)
        bonus.status = bonus?.status===BONUS_STATUS.ACTIVE?BONUS_STATUS.INACTIVE:BONUS_STATUS.ACTIVE
        await bonus.save({ transaction })
        return { success: true }
    }
}
