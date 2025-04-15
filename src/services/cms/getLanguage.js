import db from '@src/db/models'
import { getAll } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class GetLanguagesHandler extends BaseHandler {
  async run () {
    let allowedLanguage

    const siteLanguages = await getAll({
      model: db.GlobalSetting,
      data: { key: 'SITE_INFORMATION' },
      attributes: ['value']

    })
    siteLanguages.forEach((language) => { allowedLanguage = language.value.languages })

    return { allowedLanguage, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
