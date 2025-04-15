import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { GLOBAL_SETTING } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'

export class CreatePostalCodeHandler extends BaseHandler {

    async run() {
        const { gcCoin, scCoin, postalCodeValidTill } = this.args
        const transaction = this.context.sequelizeTransaction

        if (gcCoin === undefined || scCoin === undefined || postalCodeValidTill === undefined) {
            throw new AppError(Errors.INVALID_POSTAL_CODE_BODY)
        }
        const postalCodeData = {
            gcCoin,
            scCoin,
            postalCodeValidTill
        }
        let postalCodeSetting = await db.GlobalSetting.findOne({
            where: { key: GLOBAL_SETTING.POSTAL_CODE },
            transaction
        })

        let response;

        if (postalCodeSetting) {
            postalCodeSetting.value = postalCodeData //JSON.stringify(postalCodeData)
            response = await postalCodeSetting.save({ transaction })
        } else {
            response = await db.GlobalSetting.create({
                key: GLOBAL_SETTING.POSTAL_CODE,
                value: postalCodeData // JSON.stringify(postalCodeData)
            }, { transaction })
        }

        return { message: SUCCESS_MSG.UPDATE_SUCCESS }
    }
}