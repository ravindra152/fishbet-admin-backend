import { sendResponse } from '@src/helpers/response.helpers'
import { GetWithdrawalLimitsService, PopulateDummyDataHandler, UpdateWithdrawalLimitsService } from '@src/services/Settings'
import { GetCurrenciesHandler } from '@src/services/Settings/currencies/getCurrencies'

export default class SettingsController {

  static async getWithdrawalLimits(req, res, next) {
    try {
      const data = await GetWithdrawalLimitsService.execute({ ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateWithdrawalLimits(req, res, next) {
    try {
      const data = await UpdateWithdrawalLimitsService.execute({ ...req.query, ...req.body }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async populateData(req, res, next) {
    try {
      const data = await PopulateDummyDataHandler.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  //currency/coins List
  static async getCurrencies (req, res, next) {
    try {
      const data = await GetCurrenciesHandler.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
}
