import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { AppError } from '@src/errors/app.error'
// import { GLOBAL_SETTING } from '@src/utils/constants/constants'
import { GLOBAL_SETTING } from "@src/utils/constant";


export class GetPostalCodeHandler extends BaseHandler {

    async run() {

        const postalCode = await db.GlobalSetting.findOne({
            where: { key: GLOBAL_SETTING.POSTAL_CODE }
        })
        if (!postalCode) {
            throw new AppError(Errors.POSTAL_CODE_NOT_FOUND)

        }

        return { postalCode: postalCode.value }
    }
}
