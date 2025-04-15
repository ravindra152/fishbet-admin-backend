import { sendResponse } from '@src/helpers/response.helpers'
import { GetTransactionBankingDetail, GetTransactionUsersHandler, GetWalletHandler, ManageWalletHandler,RejectWithdrawRequestHandler, AcceptWithdrawRequestHandler , GetWithdrawRequestsHandler, GetWithdrawRequestDetailsHandler} from '@src/services/wallet'

export default class WalletController {


  // static async getTransactionUsers(req, res, next) {
  //   try {
  //     const data = await GetTransactionUsersHandler.execute({ ...req.body, ...req.query })
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async acceptWithdrawRequest(req, res, next) {
    try {
      const data = await AcceptWithdrawRequestHandler.execute( {...req.body, ...req.query}, req.context )
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async rejectWithdrawRequest(req, res, next) {
    try {
      const data = await RejectWithdrawRequestHandler.execute( {...req.body, ...req.query}, req.context )
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getWithdrawRequestDetails(req, res, next) {
    try {
      const data = await GetWithdrawRequestDetailsHandler.execute( {...req.body, ...req.query} )
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }


  static async getAllWithdrawRequest(req, res, next) {
    try {
      const data = await GetWithdrawRequestsHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }


}
