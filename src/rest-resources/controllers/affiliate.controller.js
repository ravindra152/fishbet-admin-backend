import { sendResponse } from '@src/helpers/response.helpers'
import { GetReferredUsersHandler } from '@src/services/affiliate'

export default class AffiliateController {
  static async getReferredUsers(req, res, next) {
    try {
      const data = await GetReferredUsersHandler.execute({ ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
}
