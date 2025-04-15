import { sendResponse } from '@src/helpers/response.helpers';
import {
  CreateAdminRoleHandler, GetAllAdminRolesHandler, GetAdminRoleHandler, DeleteAdminRoleHandler, UpdateAdminRoleHandler
} from '@src/services/adminRoles';

export default class AdminRoleController {
  static async createAdminRole(req, res, next) {
    try {
      const data = await CreateAdminRoleHandler.execute(req.body, req.context);
      sendResponse({ req, res, next }, data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllAdminRoles(req, res, next) {
    try {
      const data = await GetAllAdminRolesHandler.execute(req.query, req.context);
      sendResponse({ req, res, next }, data);
    } catch (error) {
      next(error);
    }
  }

  static async getAdminRole(req, res, next) {
    try {
      const data = await GetAdminRoleHandler.execute(req.query);
      sendResponse({ req, res, next }, data);
    } catch (error) {
      next(error);
    }
  }

  static async updateAdminRole(req, res, next) {
    try {
      const data = await UpdateAdminRoleHandler.execute(req.body, req.context);
      sendResponse({ req, res, next }, data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteAdminRole(req, res, next) {
    try {
      const data = await DeleteAdminRoleHandler.execute(req.query);
      sendResponse({ req, res, next }, data);
    } catch (error) {
      next(error);
    }
  }
}
