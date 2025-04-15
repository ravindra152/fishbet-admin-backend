import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne } from '@src/services/helper/crud'

export class GetGlobalRegistrationHandler extends BaseHandler {
  async run() {
    const { mobile = 0 } = this.args

    const globalRegistration = mobile === 0
      ? await getOne({ model: db.GlobalSetting, data: { key: 'GLOBAL_REGISTRATION' } })
      : await getOne({ model: db.GlobalSetting, data: { key: 'MOBILE_REGISTRATION' } })

    if (!globalRegistration) throw new AppError(Errors.GLOBAL_REGISTRATION_NOT_FOUND)

    return { ...(globalRegistration.value), disable: "STRICTLY_REQUIRED_REGISTRATION_FIELDS" }
  }
}
