import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { updateEntity, getOne } from '@src/services/helper/crud'
import { sendEmail } from '@src/services/helper/email'
import { TOGGLE_CASE, EMAIL_SUBJECTS, EMAIL_TEMPLATE_TYPES } from '@src/utils/constant'
import { BONUS_STATUS } from '@src/libs/constants'

// const schema = {
//   type: 'object',
//   required: ['id', 'user', 'code', 'status']
// }

// 

export class UpdateStatusHandler extends BaseHandler {
  // get constraints () {
  //   return constraints
  // }

  async checkExist ({ model, data, include = undefined }) {
    const checkExist = await getOne({ model, data, include })
    if (!checkExist) return false
    return true
  }

  async run () {
    const {
      code, status, adminId, id, userType, bonusId, affiliateId, userId, cmsPageId, gameSubCategoryId,
      gameCategoryId, categoryGameId, casinoGameId, casinoProviderId, gameAggregatorId, reason, description,
      paymentProviderId, countryId, currencyId, sportCountryId, sportId
    } = this.args

    let model, values, response
    let data = { isActive: status }


      switch (code) {
        case TOGGLE_CASE.ADMIN : {
          if (!adminId) throw new AppError(Errors.ID_REQUIRED)
          if (!await this.checkExist({ model: db.AdminUser, data: { adminUserId: adminId } })) {
            throw new AppError(Errors.ADMIN_NOT_FOUND)
          }

          model = db.AdminUser
          values = { adminUserId: adminId }
          break
        }

        case TOGGLE_CASE.USER: {
          if (!userId) throw new AppError(Errors.ID_REQUIRED)
          if (!reason && !status) throw new AppError(Errors.REASON_REQUIRED)
          const query = { userId }
          const disableUser = await getOne({
            model: db.User,
            data: { userId },
            attributes: ['userId', 'email', 'currencyCode', 'locale', 'username']
          })
          if (!disableUser) throw new AppError(Errors.USER_NOT_EXISTS)

          let emailTemplate, emailData
          if (status) {
            data = {
              ...data,
              disabledAt: null,
              disabledByType: null,
              disabledById: null,
              disableReason: null,
              defaultDisableReason: null
            }

            emailTemplate = EMAIL_TEMPLATE_TYPES.ACTIVE_USER
            emailData = { subject: EMAIL_SUBJECTS[disableUser.locale].userActivate || EMAIL_SUBJECTS.EN.userActivate }
          } else {
            data = {
              ...data,
              disabledAt: new Date(),
              disabledByType: userType,
              disabledById: id,
              disableReason: description,
              defaultDisableReason: reason
            }

            emailTemplate = EMAIL_TEMPLATE_TYPES.IN_ACTIVE_USER
            emailData = { subject: EMAIL_SUBJECTS[disableUser.locale].userDeactivate || EMAIL_SUBJECTS.EN.userDeactivate, reason }
          }

          const emailSent = await sendEmail({ user: disableUser, emailTemplate, data: emailData })
          if (emailSent) response = { ...response, emailSent }

          model = db.User
          values = query

          break
        }

        case TOGGLE_CASE.CMS: {
          if (!cmsPageId) throw new AppError(Errors.ID_REQUIRED)
          const cmsDetail = await getOne({ model: db.CmsPage, data: { cmsPageId } })
          if (!cmsDetail) throw new AppError(Errors.CMS_NOT_FOUND)
          model = db.CmsPage
          values = { cmsPageId }
          break
        }

        case TOGGLE_CASE.CASINO_CATEGORY: {
          if (!gameCategoryId) throw new AppError(Errors.ID_REQUIRED)
          if (!await this.checkExist({ model: db.CasinoCategory, data: { id: gameCategoryId } })) {
            throw new AppError(Errors.TENANT_GAME_CATEGORY_NOT_FOUND)
          }

          model = db.CasinoCategory
          values = { id: gameCategoryId }
          await updateEntity({ model: db.CasinoCategory, values, data })

          break
        }

        case TOGGLE_CASE.CASINO_SUB_CATEGORY: {
          if (!gameSubCategoryId) throw new AppError(Errors.ID_REQUIRED)
          if (!await this.checkExist({ model: db.CasinoCategory, data: { id: gameSubCategoryId } })) {
            throw new AppError(Errors.TENANT_GAME_SUB_CATEGORY_NOT_FOUND)
          }

          model = db.CasinoCategory
          values = { id: gameSubCategoryId }
          break
        }

        case TOGGLE_CASE.SPORTS: {
          if (!sportId) throw new AppError(Errors.ID_REQUIRED)
          if (!await this.checkExist({ model: db.Sport, data: { sportId } })) {
            throw new AppError(Errors.SPORT_NOT_FOUND)
          }

          model = db.Sport
          values = { sportId }
          break
        }

        case TOGGLE_CASE.SPORTCONTRY: {
          if (!sportCountryId) throw new AppError(Errors.ID_REQUIRED)
          if (!await this.checkExist({ model: db.MasterSportCountry, data: { countryId: sportCountryId } })) {
            throw new AppError(Errors.SPORT_CONTRY_NOT_FOUND)
          }

          model = db.MasterSportCountry
          values = { countryId: sportCountryId }
          break
        }

        case TOGGLE_CASE.CATEGORY_GAME: {
          if (!categoryGameId) throw new AppError(Errors.ID_REQUIRED)
          if (!gameSubCategoryId) throw new AppError(Errors.ID_REQUIRED)
          if (!await this.checkExist({ model: db.CasinoCategory, data: { id: gameSubCategoryId } })) {
            throw new AppError(Errors.GAME_SUB_CATEGORY_NOT_FOUND)
          }
          if (!await this.checkExist({ model: db.CategoryGame, data: { id: categoryGameId, casinoCategoryId: gameSubCategoryId } })) {
            throw new AppError(Errors.CATEGORY_GAME_NOT_FOUND)
          }

          model = db.CategoryGame
          values = { id: categoryGameId, casinoCategoryId: gameSubCategoryId }
          break
        }

        case TOGGLE_CASE.CASINO_GAME: {
          if (!casinoGameId) throw new AppError(Errors.ID_REQUIRED)
          if (!await this.checkExist({ model: db.CasinoGame, data: { casinoGameId: casinoGameId } })) {
            throw new AppError(Errors.GAME_NOT_FOUND)
          }

          model = db.CasinoGame
          values = { casinoGameId: casinoGameId }
          break
        }

        case TOGGLE_CASE.CASINO_PROVIDER: {
          if (!casinoProviderId) throw new AppError(Errors.ID_REQUIRED)
          if (!await this.checkExist({ model: db.CasinoProvider, data: { id: casinoProviderId } })) {
            throw new AppError(Errors.CASINO_PROVIDER_NOT_FOUND)
          }

          model = db.CasinoProvider
          values = { id: casinoProviderId }
          break
        }

        case TOGGLE_CASE.AGGREGATOR: {
          if (!gameAggregatorId) throw new AppError(Errors.ID_REQUIRED)
          if (!await this.checkExist({ model: db.CasinoAggregator, data: { id: gameAggregatorId } })) {
            throw new AppError(Errors.AGGREGATOR_NOT_FOUND)
          }

          values = { id: gameAggregatorId }
          model = db.CasinoAggregator

          await updateEntity({ model: db.CasinoProvider, values, data })
          break
        }

        case TOGGLE_CASE.BONUS: {
          if (!bonusId) throw new AppError(Errors.ID_REQUIRED)

          if (!await this.checkExist({ model: db.Bonus, data: { id: bonusId } })) {
            throw new AppError(Errors.BONUS_NOT_FOUND)
          }

          model = db.Bonus
          data = { status: status }
          values = { id: bonusId }
          break
        }

        case TOGGLE_CASE.COUNTRY: {
          if (!countryId) throw new AppError(Errors.ID_REQUIRED)

          const query = { countryId }

          if (!await this.checkExist({ model: db.Country, data: query })) {
            throw new AppError(Errors.COUNTRY_NOT_FOUND)
          }

          model = db.Country
          values = query
          data = { status }
          console.log(data)
          console.log(values)
          break
        }

        case TOGGLE_CASE.PAYMENT_PROVIDER: {
          if (!paymentProviderId) throw new AppError(Errors.ID_REQUIRED)
          if (!await this.checkExist({ model: db.PaymentProvider, data: { paymentProviderId } })) {
            throw new AppError(Errors.PAYMENT_PROVIDER_NOT_FOUND)
          }

          model = db.PaymentProvider
          values = { paymentProviderId }
          break
        }

        case TOGGLE_CASE.CURRENCY: {
          if (!currencyId) throw new AppError(Errors.ID_REQUIRED)
          if (!await this.checkExist({ model: db.Currency, data: { currencyId } })) {
            throw new AppError(Errors.CURRENCY_NOT_FOUND)
          }

          model = db.Currency
          values = { currencyId }
          break
        }

        default: {
          throw new AppError(Errors.TOGGLE_CASE_INVALID)
        }
      }

      const updatedValue = await updateEntity({ model, values, data })

      return { updatedValue: { updatedValue, ...response }, message: SUCCESS_MSG.STATUS_UPDATED }

  }
}
