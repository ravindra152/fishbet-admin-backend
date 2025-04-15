import { sendResponse } from '@src/helpers/response.helpers'
import { AddBannerTextHandler } from '@src/services/banner'
import {
  AddCommentHandler,
  AddTagsHandler,
  AssignGroupHandler,
  CancelDocumentRequestHandler,
  CreateGroupHandler,
  DeleteTagsHandler,
  GetAllCommentsPageHandler,
  GetCashbackDetailsHandler,
  GetDuplicateUsersHandler,
  GetGroupsHandler,
  GetTagsHandler,
  GetUserByIdHandler,
  GetUserDocumentHandler,
  GetUsersHandler,
  RequestDocumentHandler,
  ResetUserPasswordHandler,
  SetDisableUntilHandler,
  SetInternalUserHandler,
  UpdateAffiliatePercentage,
  UpdateCommentStatusHandler,
  updateGroupHandler,
  UpdatePasswordHandler,
  UpdateUserLevelHandler,
  UpdateUserHandler,
  VerifyUserDocumentHandler,
  VerifyUserEmailHandler
} from '@src/services/user'
import { ToggleUserStatusHandler } from '@src/services/user/toggleUserStatus'
import { UpdateSelfExclusionHandler } from '@src/services/user/updateSelfExclusion'
import { SetDailyLimitHandler, SetDepositLimitHandler, SetLossLimitHandler, SetTimeLimitHandler } from '@src/services/userLimit'
import { ManageWalletHandler } from '@src/services/wallet'


export default class UserController {
  static async getUsers(req, res, next) {
    try {
      const data = await GetUsersHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getUser(req, res, next) {
    try {
      const data = await GetUserByIdHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async toggleUserStatus(req, res, next) {
    try {
      const data = await ToggleUserStatusHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getDuplicateUsers(req, res, next) {
    try {
      const data = await GetDuplicateUsersHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getUserDocument(req, res, next) {
    try {
      const data = await GetUserDocumentHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async verifyUserDocument(req, res, next) {
    try {
      const data = await VerifyUserDocumentHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async requestDocument(req, res, next) {
    try {
      const data = await RequestDocumentHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async cancelDocumentRequest(req, res, next) {
    try {
      const data = await CancelDocumentRequestHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async addTags(req, res, next) {
    try {
      const data = await AddTagsHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getTags(req, res, next) {
    try {
      const data = await GetTagsHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async deleteTags(req, res, next) {
    try {
      const data = await DeleteTagsHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async setDisableUntil(req, res, next) {
    try {
      const data = await SetDisableUntilHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async setDailyLimit(req, res, next) {
    try {
      const data = await SetDailyLimitHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async setLossLimit(req, res, next) {
    try {
      const data = await SetLossLimitHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async setDepositLimit(req, res, next) {
    try {
      const data = await SetDepositLimitHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async setTimeLimit(req, res, next) {
    try {
      const data = await SetTimeLimitHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async setUserInternal(req, res, next) {
    try {
      const data = await SetInternalUserHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async addComment(req, res, next) {
    try {
      const data = await AddCommentHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getComments(req, res, next) {
    try {
      const data = await GetAllCommentsPageHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateCommentsStatus(req, res, next) {
    try {
      const data = await UpdateCommentStatusHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const data = await VerifyUserEmailHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updatePassword(req, res, next) {
    try {
      const data = await UpdatePasswordHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const data = await ResetUserPasswordHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async bannerText(req, res, next) {
    try {
      const data = await AddBannerTextHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateUser(req, res, next) {
    try {
      const data = await UpdateUserHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getUserCashback(req, res, next) {
    try {
      const data = await GetCashbackDetailsHandler.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateAffiliatePercentage(req, res, next) {
    try {
      const data = await UpdateAffiliatePercentage.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateUserLevel(req, res, next) {
    try {
      const data = await UpdateUserLevelHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async createGroup(req, res, next) {
    try {
      const data = await CreateGroupHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateGroup(req, res, next) {
    try {
      const data = await updateGroupHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getGroups(req, res, next) {
    try {
      const data = await GetGroupsHandler.execute(req.query, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async assignGroup(req, res, next) {
    try {
      const data = await AssignGroupHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async manageWallet(req, res, next) {
    try {
      const data = await ManageWalletHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateSelfExclusion(req, res, next) {
    try {
      const data = await UpdateSelfExclusionHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

}
