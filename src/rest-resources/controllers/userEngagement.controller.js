import { sendResponse } from '@src/helpers/response.helpers'
import { AddVipTierHandler, GetSpinWheelListHandler, UpdateSpinWheelHandler } from '@src/services/userEngagement'
import { GetVipTiersHandler, UpdateVipTierHandler, CreateVipTierHandler } from '@src/services/vipTier'

export default class UserEngagementController {

  // Spin a Wheel
  static async getSpinWheelList(req, res, next) {
    try {
      const data = await GetSpinWheelListHandler.execute(req.query, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateSpinWheel(req, res, next) {
    try {
      const data = await UpdateSpinWheelHandler.execute({ ...req.body, ...req.query }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }


  // VIP tiers 
  static async addVipTier(req, res, next) {
    try {
      const data = await CreateVipTierHandler.execute({ ...req.body, icon: req.file }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getVipTiers(req, res, next) {
    try {
      const data = await GetVipTiersHandler.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }


  static async updateVipTier(req, res, next) {
    try {
      const data = await UpdateVipTierHandler.execute({ ...req.body, icon: req.file }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

}
