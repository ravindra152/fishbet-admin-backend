import { sendResponse } from '@src/helpers/response.helpers'
import {
  CreateDropBonusHandler,
  DeleteBonusHandler,
  GetAllBonusHandler,
  GetBonusDetailHandler,
  GetDropBonusesHandler,
  GetUserBonusHandler,
  UpdateBonusHandler,
  UpdateDropBonusHandler
} from '@src/services/bonus'
import { ToggleBonusHandler } from '@src/services/bonus/toggleBonus'
import { CreatePostalCodeHandler, GetPostalCodeHandler, GetPostalCodeRequestsHandler, UpdatePostalCodeRequestStatusHandler } from '@src/services/postalCode'
import { GetFaucetHandler, SetFaucetHandler } from '@src/services/userEngagement'

export default class BonusController {

  static async updateBonus(req, res, next) {
    try {
      const data = await UpdateBonusHandler.execute({ ...req.body, bonusImage: req.file }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
  static async createDropBonus(req, res, next) {
    try {
      const data = await CreateDropBonusHandler.execute({ ...req.body }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
  static async updateDropBonus(req, res, next) {
    try {
      const data = await UpdateDropBonusHandler.execute({ ...req.body }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
  static async toggleBonus(req, res, next) {
    try {
      const data = await ToggleBonusHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  // Bonus Drop
  static async getDropBonus(req, res, next) {
    try {
      const data = await GetDropBonusesHandler.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getUserBonus(req, res, next) {
    try {
      const data = await GetUserBonusHandler.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getAllBonus(req, res, next) {
    try {
      const data = await GetAllBonusHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getBonusDetail(req, res, next) {
    try {
      const data = await GetBonusDetailHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async deleteBonus(req, res, next) {
    try {
      const data = await DeleteBonusHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  // faucet Bonus
  static async setFaucet(req, res, next) {
    try {
      const data = await SetFaucetHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getFaucet(req, res, next) {
    try {
      const data = await GetFaucetHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  //Postal Code Bonus
  static async addPostalCode(req, res, next) {
    try {
      const data = await CreatePostalCodeHandler.execute({ ...req.body }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
  static async getPostalCode(req, res, next) {
    try {
      const data = await GetPostalCodeHandler.execute({ ...req.body }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
  static async updatePostalCodeRequestStatus(req, res, next) {
    try {
      const data = await UpdatePostalCodeRequestStatusHandler.execute({ ...req.body }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
  static async getPostalCodeRequestList(req, res, next) {
    try {
      const data = await GetPostalCodeRequestsHandler.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

}