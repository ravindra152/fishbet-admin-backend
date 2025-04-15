import db from '@src/db/models'
import { getAll } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { getXlsFileName } from '@src/services/helper/email'
import { SUCCESS_MSG } from '@src/utils/success'
import { createLanguageSupportKeysCsv } from '@src/services/helper/csv'
import { LANGUAGE_SUPPORT_KEYS } from '@src/utils/constant'

const schema = {
  type: 'object',
  properties: {
    userType: { type: 'string' },
    language: { type: ['string', 'null'] },
    csvDownload: { type: ['string', 'null'] }
  },
  required: ['userType']
}



export class GetLanguageSupportHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { language, csvDownload } = this.args
    let query, attributes

    if (language) query = { ...query, language }

    if (csvDownload) {
      attributes = { exclude: ['multiLanguageSupportId', 'createdAt', 'updatedAt'] }
    }

    const languageData = await getAll({ model: db.MultiLanguageSupport, data: query, attributes, raw: true })

    if (csvDownload && languageData.length !== 0) {
      const xlsx = require('node-xlsx')
      const { fields, data } = createLanguageSupportKeysCsv(languageData)
      const csvData = xlsx.build([{ name: getXlsFileName(), data: [fields, ...data] }])

      return { csv: true, csvData, fileName: getXlsFileName() }
    }

    return { languageData, languageKeys: LANGUAGE_SUPPORT_KEYS, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
