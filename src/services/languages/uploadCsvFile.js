import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { checkKeysExists, checkLanguageExistsInDb, filterFileData, insertIntoDb } from '@src/services/helper/language'

const schema = {
  type: 'object',
  properties: {
    userType: { type: 'string' },
    languageCsv: { type: 'object' }
  },
  required: ['userType', 'languageCsv']
}



export class LoadLanguagesCsvHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { languageCsv } = this.args

    if (typeof (languageCsv) === 'object' && languageCsv.mimetype === 'application/vnd.ms-excel') {
      const xlsx = require('node-xlsx')
      const data = xlsx.parse(languageCsv.buffer)[0].data

      // To check Language in excel sheet matches language allowed to sadmin
      const { error, success } = await checkLanguageExistsInDb(data[0])
      if (!success) throw new AppError(Errors.LANGUAGE_NOT_FOUND)

      // To check language support keys present in excel sheet matches allowed keys
      const keyExists = await checkKeysExists(data)
      if (!keyExists.success) throw new AppError(Errors.KEY_NOT_FOUND)

      // To convert data in format of database storage
      const filteredData = await filterFileData(data)

      await insertIntoDb(filteredData)

      return { success: true }
    } else {
      throw new AppError(Errors.INTERNAL_ERROR)
    }
  }
}
