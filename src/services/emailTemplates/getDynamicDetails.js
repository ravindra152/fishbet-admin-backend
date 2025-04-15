
import { BaseHandler } from '@src/libs/logicBase'
import { setEmailKeyDescription } from '@src/services/helper/email'
import { EMAIL_DYNAMIC_OPTIONS, EMAIL_TEMPLATES_KEYS, EMAIL_TEMPLATE_TYPES } from '@src/utils/constant'

export class GetEmailDynamicDetails extends BaseHandler {
  async run () {
    return { emailTypes: EMAIL_TEMPLATE_TYPES, dynamicKeys: EMAIL_TEMPLATES_KEYS, keyDescription: setEmailKeyDescription(EMAIL_DYNAMIC_OPTIONS) }
  }
}
