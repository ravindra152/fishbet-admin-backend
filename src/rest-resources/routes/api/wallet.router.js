import WalletController from '@src/rest-resources/controllers/wallet.controller';
import { isAdminAuthenticated } from '@src/rest-resources/middlewares';
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware';
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware';
import express from 'express';
import { APPLICATION_MODULES, PERMISSION_LEVELS } from '@src/utils/constants/staffManagement.constants';
import { acceptWithdrawRequestSchema } from '@src/json-schemas/wallet/acceptWithdrawRequest';
import { rejectWithdrawRequestSchema } from '@src/json-schemas/wallet/rejectWithdrawRequest';
//import { gettWithdrawRequestDetailsSchema } from '@src/json-schemas/wallet/getWithdrawRequestDetails';
import { getAllWithdrawRequestSchema } from '@src/json-schemas/wallet/getAllWithdrawRequest.schema';

const args = { mergeParams: true };
const walletRouter = express.Router(args);

// Ensure that the controller methods are defined correctly
walletRouter.route('/accept-withdraw-request')
  .post(contextMiddleware(true), requestValidationMiddleware(acceptWithdrawRequestSchema), WalletController.acceptWithdrawRequest);
// .post(contextMiddleware(true), isAdminAuthenticated(APPLICATION_MODULES.REPORTS, PERMISSION_LEVELS.Create), requestValidationMiddleware(acceptWithdrawRequestSchema), WalletController.acceptWithdrawRequest);

walletRouter.route('/reject-withdraw-request')
  .post(contextMiddleware(true), isAdminAuthenticated(), requestValidationMiddleware(rejectWithdrawRequestSchema), WalletController.rejectWithdrawRequest);

walletRouter.route('/withdraw-request-details')
  .get(contextMiddleware(false), isAdminAuthenticated(APPLICATION_MODULES.REPORTS, PERMISSION_LEVELS.Read), requestValidationMiddleware({}), WalletController.getWithdrawRequestDetails);

walletRouter.route('/all-withdraw-request')
  .get(contextMiddleware(false), requestValidationMiddleware(getAllWithdrawRequestSchema), WalletController.getAllWithdrawRequest)

export { walletRouter };
