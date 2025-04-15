import { OK } from '@src/utils/constant'
import { validateFile } from '@src/utils/common'
import { Errors } from '@src/errors/errorCodes'
import { sendResponse } from '@src/helpers/response.helpers'
import {
  CreateEmailTemplateHandler, GetAllEmailTemplateHandler, GetEmailTemplateHandler,
  UpdateEmailTemplateHandler, MarkEmailPrimaryHandler, DeleteEmailTemplateHandler,
  TestEmailTemplateHandler, GetGalleryHandler, UploadImageGalleryHandler, DeleteImageFromGalleryHandler, GetEmailDynamicDetails, DeleteEmailTemplateLanguageHandler
} from '@src/services/emailTemplates'

export default class EmailTemplateController {
  static async createEmailTemplate (req, res, next) {
    try {
      const data = await CreateEmailTemplateHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getAllEmailTemplate (req, res, next) {
    try {
      const data = await GetAllEmailTemplateHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getEmailTemplateById (req, res, next) {
    try {
      const data = await GetEmailTemplateHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateEmailTemplate (req, res, next) {
    try {
      const data = await UpdateEmailTemplateHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async markEmailPrimary (req, res, next) {
    try {
      const data = await MarkEmailPrimaryHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async deleteEmailTemplate (req, res, next) {
    try {
      const data = await DeleteEmailTemplateHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async deleteEmailTemplateLanguage (req, res, next) {
    try {
      const data = await DeleteEmailTemplateLanguageHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async testEmailTemplate (req, res, next) {
    try {
      const data = await TestEmailTemplateHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getGallery (req, res, next) {
    try {
      const data = await GetGalleryHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async uploadImageGallery (req, res, next) {
    try {
      const data = await UploadImageGalleryHandler.execute({ ...req.body, image: req.file }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async deleteImage (req, res, next) {
    try {
      const data = await DeleteImageFromGalleryHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getEmailDynamicData (req, res, next) {
    try {
      const data = await GetEmailDynamicDetails.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
}
