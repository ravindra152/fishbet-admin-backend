import { BaseHandler } from '@src/libs/logicBase'
import { BANNER_KEYS } from '@src/utils/constant'

export class GetBannerKeys extends BaseHandler {
  async run () {
    return { bannerKey: BANNER_KEYS }
  }
}
