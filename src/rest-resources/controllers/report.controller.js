import { sendResponse } from '@src/helpers/response.helpers'
import { GetApplicationStatsHandler, GetCasinoTransactions, GetDateWiseUserDetails, GetDemoGraphHandler, GetKPIReportHandler, GetKPISummaryHandler, GetPaymentProviderDetails, GetProviderBetDetails, GetTopTenHandler, GetTransactions, GetUserReport } from '@src/services/report'
import { GetGameReportHandler } from '@src/services/report/gameReport.handler'

export default class ReportController {
  // static async getDemographicReport(req, res, next) {
  //   try {
  //     const data = await GetDemoGraphHandler.execute({ ...req.query, ...req.body })

  //     if (result.csv) {
  //       res.header('Content-Type', 'text/csv')
  //       res.attachment(result.fileName)
  //       return res.send(result.csvData)
  //     }
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async getStatsReport(req, res, next) {
    try {
      const data = await GetApplicationStatsHandler.execute({ ...req.query, ...req.body })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getTopTen(req, res, next) {
    try {
      const data = await GetTopTenHandler.execute({ ...req.query, ...req.body })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  // static async getKPIReport(req, res, next) {
  //   try {
  //     const data = await GetKPISummaryHandler.execute({ ...req.query, ...req.body })

  //     if (result.csv) {
  //       res.header('Content-Type', 'text/csv')
  //       res.attachment(result.fileName)
  //       return res.send(result.csvData)
  //     }
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // static async getKPIProviderReport(req, res, next) {
  //   try {
  //     const data = await GetKPIReportHandler.execute({ ...req.query, ...req.body })

  //     if (result.csv) {
  //       res.header('Content-Type', 'text/csv')
  //       res.attachment(result.fileName)
  //       return res.send(result.csvData)
  //     }
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async getGameReport(req, res, next) {
    try {
      const data = await GetGameReportHandler.execute({ ...req.query, ...req.body })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  // static async getProviderBetDetails(req, res, next) {
  //   try {
  //     const data = await GetProviderBetDetails.execute({ ...req.query })
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // static async getDateWiseUserDetails(req, res, next) {
  //   try {
  //     const data = await GetDateWiseUserDetails.execute({ ...req.query })
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // static async getPaymentProviderDetails(req, res, next) {
  //   try {
  //     const data = await GetPaymentProviderDetails.execute({ ...req.query })
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async getTransactions(req, res, next) {
    try {
      const data = await GetTransactions.execute({ ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getCasinoTransactions(req, res, next) {
    try {
      const data = await GetCasinoTransactions.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  // static async getUserReport(req, res, next) {
  //   try {
  //     const data = await GetUserReport.execute({ ...req.query })
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
