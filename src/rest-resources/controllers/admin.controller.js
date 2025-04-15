import { sendResponse } from '@src/helpers/response.helpers'
import {
  ChangePasswordHandler,
  CreateAdminUserHandler,
  ForgetPasswordHandler,
  GetAdminChildren,
  GetAdminRolesHandler,
  GetAdminUserDetailsHandler, GetAdminUsersHandler, GetAllAdminGroupHandler,
  GetSiteInformationHandler,
  UpdateAdminProfile,
  UpdateAdminUserHandler,
  UpdateProfileDetail,
  UpdateSiteInformationHandler,
  VerifyForgetPasswordHandler
} from '@src/services/adminUsers'
import { AdminLoginHandler } from '@src/services/adminUsers/adminLogin'
import { ToggleAdminUserHandler } from '@src/services/adminUsers/toggleAdminUser'
import {
  CreateBannerDownloadHandler,
  CreateBannerHandler,
  CreatePromotionsHandler,
  DeleteBannerHandler,
  DeletePromotionsHandler,
  GetBannerDownloadHandler,
  GetBannerHandler,
  GetBannerKeys,
  GetPromotionsHandler,
  UpdateBannerPageHandler,
  UpdatePromotionsHandler
} from '@src/services/banner'
import { CreateNotificationHandler, GetNotificationsHandler } from '@src/services/notification'
import { GetTransactions } from '@src/services/report'
import { CreateVipTierHandler, GetVipTiersHandler, UpdateVipTierHandler } from '@src/services/vipTier'
import { getDomain, validateFile } from '@src/utils/common'
import { OK } from '@src/utils/constant'; // adminBaseUrl

export default class AdminController {
  static async adminLogin(req, res, next) {
    try {
      const data = await AdminLoginHandler.execute({ ...req.body })
      console.log("data>>" ,data )
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }


  static async updateProfile(req, res, next) {
    try {
      const data = await UpdateProfileDetail.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateSiteInfo(req, res, next) {
    try {
      const data = await UpdateSiteInformationHandler.execute({ ...req.body, logo: req.file }, req.context)
      console.log("data>>>>>" , data)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getSiteInfo(req, res, next) {
    try {
      const data = await GetSiteInformationHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getAdminChilds(req, res, next) {
    try {
      const data = await GetAdminChildren.execute({ ...req.query, ...req.body })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const data = await ToggleAdminUserHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  // static async getGlobalRegistration(req, res, next) {
  //   try {
  //     const data = await GetGlobalRegistrationHandler.execute(req.query)
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // static async updateGlobalRegistration(req, res, next) {
  //   try {
  //     const data = await UpdateGlobalRegistrationHandler.execute(req.body)
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // static async getDocumentLabel(req, res, next) {
  //   try {
  //     const data = await GetDocumentLabelHandler.execute(req.query)
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // static async updateDocumentLabel(req, res, next) {
  //   try {
  //     const data = await UpdateDocumentLabelHandler.execute(req.body)
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // static async createDocumentLabel(req, res, next) {
  //   try {
  //     const data = await CreateDocumentLabelHandler.execute(req.body)
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // static async getLoyaltyLevel(req, res, next) {
  //   try {
  //     const data = await GetLoyaltyLevelHandler.execute({ ...req.body, ...req.query })
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // static async updateLoyaltyLevel(req, res, next) {
  //   try {
  //     const data = await UpdateLoyaltyLevelHandler.execute(req.body)
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async createBanner(req, res, next) {
    try {

      const images = {
        web: req.files["web"] ? req.files["web"][0] : null,
        mobile: req.files["mobile"] ? req.files["mobile"][0] : null,
      };

      const data = await CreateBannerHandler.execute({ ...req.body, images }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getBanner(req, res, next) {
    try {
      const data = await GetBannerHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async deleteBanner(req, res, next) {
    try {
      const data = await DeleteBannerHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateBanner(req, res, next) {
    try {

      const images = {
        web: req.files["web"] ? req.files["web"][0] : null,
        mobile: req.files["mobile"] ? req.files["mobile"][0] : null,
      };

      const fileCheckResponse = validateFile(res, req.file)
      if (fileCheckResponse !== OK) {
        return next(InvaildFileErrorType)
      }

      const data = await UpdateBannerPageHandler.execute({ ...req.body, images }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getBannerKeys(req, res, next) {
    try {
      const data = await GetBannerKeys.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }


  static async createBannerDownload(req, res, next) {
    try {
      const data = await CreateBannerDownloadHandler.execute({ ...req.body, zipFile: req.file }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getBannerDownload(req, res, next) {
    try {
      const data = await GetBannerDownloadHandler.execute({ ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async createPromotions(req, res, next) {
    try {

      const images = {
        web: req.files["web"] ? req.files["web"][0] : null,
        mobile: req.files["mobile"] ? req.files["mobile"][0] : null,
      };

      const data = await CreatePromotionsHandler.execute({ ...req.body, images }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getPromotions(req, res, next) {
    try {
      const data = await GetPromotionsHandler.execute({ ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async deletePromotions(req, res, next) {
    try {
      const data = await DeletePromotionsHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updatePromotions(req, res, next) {
    try {
      const images = {
        web: req.files["web"] ? req.files["web"][0] : null,
        mobile: req.files["mobile"] ? req.files["mobile"][0] : null,
      };
      const data = await UpdatePromotionsHandler.execute({ ...req.body, images }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async forgetPassword(req, res, next) {
    try {
      const data = await ForgetPasswordHandler.execute({ ...req.body, ...req.query, origin: getDomain(req) })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async verifyForgetPassword(req, res, next) {
    try {
      const data = await VerifyForgetPasswordHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async changePassword(req, res, next) {
    try {
      const data = await ChangePasswordHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  // static async restrictedContent(req, res, next) {
  //   try {
  //     const data = await UpdateRestrictedContentHandler.execute(req.body)

  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async createAdminUser(req, res, next) {
    try {
      const data = await CreateAdminUserHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getAdminRoles(req, res, next) {
    try {
      const data = await GetAdminRolesHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateAdminUser(req, res, next) {
    try {
      const data = await UpdateAdminUserHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateAdminProfile(req, res, next) {
    try {
      const data = await UpdateAdminProfile.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getAdminUserDetails(req, res, next) {
    try {
      const data = await GetAdminUserDetailsHandler.execute({ ...req.query, ...req.body })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getAdminUsers(req, res, next) {
    try {
      const data = await GetAdminUsersHandler.execute({ ...req.query, ...req.body })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  // static async updateLimits(req, res, next) {
  //   try {
  //     const data = await UpdateLimitsHandler.execute(req.body, req.context)
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async getAllGroup(req, res, next) {
    try {
      const data = await GetAllAdminGroupHandler.execute()
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getTransactions(req, res, next) {
    try {
      const data = await GetTransactions.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async createVipTier(req, res, next) {
    try {
      const data = await CreateVipTierHandler.execute({ ...req.body, icon: req.file }, req.context)
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
  static async getVipTier(req, res, next) {
    try {
      const data = await GetVipTiersHandler.execute({ ...req.body, ...req.query }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
}
