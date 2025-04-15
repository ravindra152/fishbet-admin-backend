import { sendResponse } from '@src/helpers/response.helpers'
import { GetLanguageSupportHandler, GetLanguagesHandler, LoadLanguagesCsvHandler, UpdateLanguageSupportHandler } from '@src/services/languages'

export default class LanguageController {
  static async getLanguages (req, res, next) {
    try {
      const data = await GetLanguagesHandler.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getLanguageSupportKeys (req, res, next) {
    try {
      const data = await GetLanguageSupportHandler.execute({ ...req.query, ...req.body })

      if (result.csv) {
        res.header('Content-Type', 'text/csv')
        res.attachment(result.fileName)
        return res.send(result.csvData)
      }

      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async loadLanguageCsv (req, res, next) {
    try {
      const data = await LoadLanguagesCsvHandler.execute({ languageCsv: req.file, ...req.body })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateLanguageSupportKeys (req, res, next) {
    try {
      const data = await UpdateLanguageSupportHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
}
