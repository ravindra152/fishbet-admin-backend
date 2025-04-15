import { BaseHandler } from '@src/libs/logicBase'
import { setEmailKeyDescription } from '@src/services/helper/email'
import { CMS_DYNAMIC_OPTIONS, CMS_ALLOWED_KEYS } from '@src/utils/constant'

export class GetCmsDynamicKeys extends BaseHandler {
  async run () {
    return { dynamicKeys: CMS_ALLOWED_KEYS, keyDescription: setEmailKeyDescription(CMS_DYNAMIC_OPTIONS) }
  }
}
