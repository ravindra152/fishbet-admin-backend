import { createDropBonusSchema } from '@src/json-schemas/bonus/createDropBonus.schema'
import { deleteBonusScheam } from '@src/json-schemas/bonus/deleteBonus.schema'
import { getAllBunusSchema } from '@src/json-schemas/bonus/getAllBonus.schema'
import { getBonusDetailsSchema } from '@src/json-schemas/bonus/getBonusDetails.schema'
import { getDropBonusSchema, } from '@src/json-schemas/bonus/getDropBonus.schema'
import { getUserBonusSchema } from '@src/json-schemas/bonus/getUserBonus.schema'
import { addPostalCodeSchema } from '@src/json-schemas/bonus/postalCode/addPostalCode'
import { getPostalCodeListSchema } from '@src/json-schemas/bonus/postalCode/getPostalCodeList'
import { updatePostalCodeRequestSchema } from '@src/json-schemas/bonus/postalCode/updatePostalCodeRequestStatus'
import { updateBonusSchema } from '@src/json-schemas/bonus/updateBonus.schema'
import { updateDropBonusSchema } from '@src/json-schemas/bonus/updateDropBonus.schema'
import BonusController from '@src/rest-resources/controllers/bonus.controller'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { uploadSingle } from '@src/rest-resources/middlewares/multer'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'

import express from 'express'

const args = { mergeParams: true }
const bonusRouter = express.Router(args)


bonusRouter.route('/detail').get(contextMiddleware(false), requestValidationMiddleware(getBonusDetailsSchema), isAdminAuthenticated(), BonusController.getBonusDetail)
bonusRouter.route('/user-bonus').get(contextMiddleware(false), requestValidationMiddleware(getUserBonusSchema), isAdminAuthenticated(), BonusController.getUserBonus)

bonusRouter.route('/drop-bonus').post(contextMiddleware(true), requestValidationMiddleware(createDropBonusSchema), isAdminAuthenticated(), BonusController.createDropBonus)
bonusRouter.route('/drop-bonus').get(contextMiddleware(false), requestValidationMiddleware(getDropBonusSchema), isAdminAuthenticated(), BonusController.getDropBonus)
bonusRouter.route('/drop-bonus').put(contextMiddleware(true), requestValidationMiddleware(updateDropBonusSchema), isAdminAuthenticated(), BonusController.updateDropBonus)
bonusRouter.route('/toggle').put(contextMiddleware(true), requestValidationMiddleware({}), isAdminAuthenticated(), BonusController.toggleBonus)

bonusRouter.route('/')
  .get(contextMiddleware(false), requestValidationMiddleware(getAllBunusSchema), BonusController.getAllBonus)
  .post(contextMiddleware(true), uploadSingle('bonusImage'), requestValidationMiddleware(updateBonusSchema), isAdminAuthenticated(), BonusController.updateBonus)
  .delete(contextMiddleware(true), requestValidationMiddleware(deleteBonusScheam), isAdminAuthenticated(), BonusController.deleteBonus)

bonusRouter.route('/faucet')
  .get(contextMiddleware(false), requestValidationMiddleware({}), isAdminAuthenticated(), BonusController.getFaucet)
  .put(contextMiddleware(true), requestValidationMiddleware({}), isAdminAuthenticated(), BonusController.setFaucet)

// postal code add data in global setting
// get postal code data from global setting // banner down load feature
// update request status
// get request list
// transaction handler need to add
// status is need to add or not because in bonus drop we are not adding status
// in databse need to add TRANSACTION_PURPOSE enum for postal_code added 
// how postal code will generate ( frontend will take time stamp(milliseconds) + userId combination)

bonusRouter.route('/postal-code')
  .post(contextMiddleware(true), isAdminAuthenticated(), requestValidationMiddleware(addPostalCodeSchema), BonusController.addPostalCode)
  .get(contextMiddleware(false), isAdminAuthenticated(), BonusController.getPostalCode)
bonusRouter.route('/postal-code/claim-request')
  .put(contextMiddleware(true), isAdminAuthenticated(), requestValidationMiddleware(updatePostalCodeRequestSchema), BonusController.updatePostalCodeRequestStatus)
  .get(contextMiddleware(false), isAdminAuthenticated(), requestValidationMiddleware(getPostalCodeListSchema), BonusController.getPostalCodeRequestList)

export { bonusRouter }
