import { sendResponse } from '@src/helpers/response.helpers'
import {
  CreateCmsPageHandler, UpdateCmsPageHandler, GetAllCmsPageHandler, GetCmsPageHandler,
  GetCmsDynamicKeys, DeleteCmsLanguageHandler, GetLanguagesHandler,
  toggleCmsIsActiveHandler
} from '@src/services/cms'
import { CreateNotificationHandler, GetNotificationsHandler } from '@src/services/notification'

export default class CmsController {
  static async createCmsPage(req, res, next) {
    try {
      const data = await CreateCmsPageHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateCmsPage(req, res, next) {
    try {
      const data = await UpdateCmsPageHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getAllCmsPage(req, res, next) {
    try {
      const data = await GetAllCmsPageHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getCmsPage(req, res, next) {
    try {
      const data = await GetCmsPageHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getCmsDynamicData(req, res, next) {
    try {
      const data = await GetCmsDynamicKeys.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async deleteCmsPageLanguage(req, res, next) {
    try {
      const data = await DeleteCmsLanguageHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getLanguages(req, res, next) {
    try {
      const data = await GetLanguagesHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async toggleCms(req, res, next) {
    try {
      const data = await toggleCmsIsActiveHandler.execute({ ...req.body }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  //Notice management
  static async createNotification(req, res, next) {
    try {
      const data = await CreateNotificationHandler.execute({ ...req.body }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
  static async getNotification(req, res, next) {
    try {
      const data = await GetNotificationsHandler.execute({ ...req.body, ...req.query }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
}
