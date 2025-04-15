import { sendResponse } from '@src/helpers/response.helpers'
import {
  CreatePackageHandler,
  DeletePackageHandler,
  GetAllPackagesHandler, GetPackageHandler,
  UpdatePackageHandler
} from '@src/services/package'



export default class PackageController {
  static async createPackage(req, res, next) {
    try {
      const data = await CreatePackageHandler.execute({ ...req.body, imageUrl: req.file }, req.context)
      sendResponse({ req, res, next }, data)

    } catch (error) {
      next(error)
    }
  }

  static async getAllPackages(req, res, next) {
    try {
      const data = await GetAllPackagesHandler.execute(req.query, req.context);
      sendResponse({ req, res, next }, data);
    } catch (error) {
      next(error);
    }
  }

  static async getPackage(req, res, next) {
    try {
      const data = await GetPackageHandler.execute(req.query);
      sendResponse({ req, res, next }, data);
    } catch (error) {
      next(error);
    }
  }

  static async updatePackage(req, res, next) {
    try {
      const data = await UpdatePackageHandler.execute({ ...req.body, imageUrl: req.file }, req.context);
      sendResponse({ req, res, next }, data);
    } catch (error) {
      next(error);
    }
  }


  static async deletePackage(req, res, next) {
    try {
      const data = await DeletePackageHandler.execute({ ...req.query, ...req.body });
      sendResponse({ req, res, next }, data);
    } catch (error) {
      next(error);
    }
  }
  
}
