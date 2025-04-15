import { StatusCodes } from 'http-status-codes'

export const Errors = {
  TODO_NOT_FOUND: {
    name: 'TODO_NOT_FOUND',
    message: 'TODO item not found',
    explanation: 'The requested TODO item could not be found in the database.',
    code: 1001,
    httpStatusCode: StatusCodes.NOT_FOUND
  },
  PROVIDER_NOT_FOUND: {
    name: 'provider_not_found',
    message: 'provider not found',
    explanation: 'The requested TODO item could not be found in the database.',
    code: 1001,
    httpStatusCode: StatusCodes.NOT_FOUND
  },
  ADMIN_ROLE_EXISTS: {
    name: 'AdminRoleExists',
    message: 'Either level Role or name Role Already Exists',
    explanation: 'The response data structure does not match the expected schema.',
    code: 1002,
    httpStatusCode: StatusCodes.BAD_REQUEST
  },
  GAME_CATEGORY_EXISTS: {
    name: 'game_category_exists',
    message: 'game category name Already Exists',
    explanation: 'The response data structure does not match the expected schema.',
    code: 1002,
    httpStatusCode: StatusCodes.BAD_REQUEST
  },
  CMS_EXISTS: {
    name: 'cms_exists',
    message: 'cms slug name Already Exists',
    explanation: 'The response data structure does not match the expected schema.',
    code: 1002,
    httpStatusCode: StatusCodes.BAD_REQUEST
  },
  REQUEST_VALIDATION_ERROR: {
    name: 'RequestValidationError',
    message: 'Request Validation Error',
    explanation: 'The response data structure does not match the expected schema.',
    code: 1002,
    httpStatusCode: StatusCodes.BAD_REQUEST
  },
  INVALID_POSTAL_CODE_BODY: {
    name: 'INVALID POSTAL CODE BODY',
    message: 'Required fields gcCoin, scCoin, and postalCodeValidTill are missing or invalid.',
    explanation: 'All of the following fields are required: gcCoin, scCoin, and postalCodeValidTill. Please ensure that all fields are provided and valid.',
    code: 3003,
    httpStatusCode: 400
  },
  // errorConstants.js
  INVALID_STATUS: {
    name: 'INVALID_STATUS',
    message: 'Invalid status value provided',
    explanation: 'The status must be either APPROVED or REJECTED.',
    code: 1001,
    httpStatusCode: 400,
  },
  POSTAL_CODE_NOT_FOUND: {
    name: 'POSTAL_CODE_NOT_FOUND',
    message: 'Postal code request not found',
    explanation: 'No postal code request exists with the provided ID.',
    code: 1002,
    httpStatusCode: 404,
  },
  INVALID_STATUS_TRANSITION: {
    name: 'INVALID_STATUS_TRANSITION',
    message: 'Invalid status transition',
    explanation: 'The postal code request can only be approved or rejected if it is in PENDING status.',
    code: 1003,
    httpStatusCode: 400,
  },
  INVALID_EXPIRY_TIME: {
    name: 'INVALID_EXPIRY_TIME',
    message: 'Request Validation Error',
    explanation: 'invalid expiry time date time must be greater than current time',
    code: 1002,
    httpStatusCode: StatusCodes.BAD_REQUEST
  },
  NO_FIELDS_TO_UPDATE: {
    name: 'NO_FIELDS_TO_UPDATE',
    message: 'Request Validation Error',
    explanation: 'invalid request body no field is found to update',
    code: 1002,
    httpStatusCode: StatusCodes.BAD_REQUEST
  },
  DUPLICATE_CODE: {
    name: 'DUPLICATE_CODE',
    message: 'duplicate bonus drop code',
    explanation: 'A DropBonus with this code already exists.',
    code: 1002,
    httpStatusCode: StatusCodes.BAD_REQUEST
  },
  RESPONSE_VALIDATION_ERROR: {
    name: 'ResponseValidationError',
    message: 'Response Validation Error',
    explanation: 'Please ensure all required parameters are provided and formatted correctly.',
    code: 1003,
    httpStatusCode: StatusCodes.INTERNAL_SERVER_ERROR
  },
  BONUS_UPDATE_FAILED: {
    name: 'BONUS_UPDATE_FAILED',
    message: 'Response Validation Error',
    explanation: 'Please ensure all required parameters are provided and formatted correctly.',
    code: 1003,
    httpStatusCode: StatusCodes.INTERNAL_SERVER_ERROR
  },
  INTERNAL_ERROR: {
    name: 'InternalServerError',
    message: 'Internal Server Error',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 1004,
    httpStatusCode: StatusCodes.INTERNAL_SERVER_ERROR
  },
  REQUEST_INPUT_VALIDATION_ERROR: {
    name: 'RequestInputValidationError',
    message: 'Please check the request data',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3001,
    httpStatusCode: 400
  },
  RESPONSE_INPUT_VALIDATION_ERROR: {
    name: 'ResponseInputValidationError',
    message: 'Response validation failed please refer json schema of response',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3002,
    httpStatusCode: 400
  },
  INSUFFICIENT_FUNDS: {
    name: 'InsufficientFundError',
    message: 'User does not have enough balance',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3002,
    httpStatusCode: 400
  },
  INVALID_DIRECTION: {
    name: 'INVALID DIRECTIONS',
    message: 'User does not have enough balance',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3002,
    httpStatusCode: 400
  },
  INVALID_BANNER_TYPE: {
    name: 'INVALID BANNER TYPE',
    message: 'banner type is invalid',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3002,
    httpStatusCode: 400
  },
  WALLET_NOT_FOUND: {
    name: 'WalletNotFoudError',
    message: 'Invalid wallet Id',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3002,
    httpStatusCode: 400
  },
  INTERNAL_SERVER_ERROR: {
    name: 'InternalServerError',
    message: 'Internal Server Error',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3003,
    httpStatusCode: 500
  },
  INVALID_TOKEN: {
    name: 'InvalidToken',
    message: 'Either reset password token not passed or it is expired',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3025,
    httpStatusCode: 401
  },
  USER_NOT_EXISTS: {
    name: 'UserNotExists',
    message: 'User does not exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3005,
    httpStatusCode: 400
  },
  SOMETHING_WENT_WRONG: {
    name: 'SomethingWentWrong',
    message: 'Something Went Wrong',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3006,
    httpStatusCode: 403
  },
  ADMIN_ALREADY_EXISTS: {
    name: 'AdminAlreadyExists',
    message: 'Admin already exists with this email',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3007,
    httpStatusCode: 400
  },
  AFFILIATES_NOT_FOUND: {
    name: 'AffiliatesNotFound',
    message: 'Affiliates not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3008,
    httpStatusCode: 400
  },
  TRANSACTION_NOT_FOUND: {
    name: 'TransactionNotFound',
    message: 'Transaction not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3009,
    httpStatusCode: 400
  },
  COUNTRY_NOT_FOUND: {
    name: 'CountryNotFound',
    message: 'Country not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3010,
    httpStatusCode: 400
  },
  TENANT_GAME_CATEGORY_NOT_FOUND: {
    name: 'TenantGameCategoryNotFound',
    message: 'Tenant Game Category not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3011,
    httpStatusCode: 400
  },
  CATEGORY_GAME_NOT_FOUND: {
    name: 'CategoryGameNotFound',
    message: 'Category Games not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3013,
    httpStatusCode: 400
  },
  TENANT_NOT_FOUND: {
    name: 'TenantNotFound',
    message: 'Tenant not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 1,
    httpStatusCode: 400
  },
  TENANT_REGISTRATION_NOT_FOUND: {
    name: 'TenantRegistrationNotFound',
    message: 'Tenant Registration fields not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3015,
    httpStatusCode: 400
  },
  CMS_NOT_FOUND: {
    name: 'CmsNotFound',
    message: 'Cms not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 1,
    httpStatusCode: 400
  },
  BONUS_NOT_FOUND: {
    name: 'BonusNotFound',
    message: 'Bonus not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3017,
    httpStatusCode: 400
  },
  UN_AUTHORIZE: {
    name: 'UnAuthorize',
    message: 'Unauthorized ',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3018,
    httpStatusCode: 403
  },
  ADMIN_IN_ACTIVE: {
    name: 'AdminInActive',
    message: 'Admin Inactive',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3043,
    httpStatusCode: 403
  },
  USER_NAME_EXISTS: {
    name: 'UserNameExists',
    message: 'Username already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3020,
    httpStatusCode: 400
  },
  USER_ALREADY_EXISTS: {
    name: 'UserAlreadyExists',
    message: 'User already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3021,
    httpStatusCode: 400
  },
  CURRENCY_NOT_FOUND: {
    name: 'CurrencyNotFound',
    message: 'Currency not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3022,
    httpStatusCode: 400
  },
  INVALID_COIN_TYPE: {
    name: 'INVALID_COIN_TYPE',
    message: 'invalid coin type',
    explanation: 'invalid coin type please check again coin type must be GC or BSC',
    code: 3022,
    httpStatusCode: 400
  },
  LANGUAGE_NOT_FOUND: {
    name: 'LanguageNotFound',
    message: 'Language not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 1,
    httpStatusCode: 400
  },
  GAME_NOT_FOUND: {
    name: 'GameNotFound',
    message: 'Game not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3024,
    httpStatusCode: 400
  },
  EMAIL_ALREADY_EXISTS: {
    name: 'EmailAlreadyExists',
    message: 'Email already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3026,
    httpStatusCode: 400
  },
  LIMITS_ERROR: {
    name: 'LimitsError',
    message: 'Days for take a break can be in range 1 to 30',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3027,
    httpStatusCode: 400
  },
  SESSION_TIME_LIMIT: {
    name: 'SessionTimeLimit',
    message: 'Session Time can be set between 1 to 24',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3028,
    httpStatusCode: 400
  },
  DOCUMENT_LABELS_NOT_FOUND: {
    name: 'DocumentLabelsNotFound',
    message: 'Document Labels not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3029,
    httpStatusCode: 400
  },
  USER_DOCUMENTS_NOT_FOUND: {
    name: 'UserDocumentsNotFound',
    message: 'User document not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3030,
    httpStatusCode: 400
  },
  GAME_EXISTS: {
    name: 'GameExists',
    message: 'Game already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3031,
    httpStatusCode: 400
  },
  CASINO_TRANSACTIONS_NOT_FOUND: {
    name: 'CasinoTransactionsNotFound',
    message: 'Casino transactions not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3032,
    httpStatusCode: 400
  },
  BONUS_AVAIL_ERROR: {
    name: 'BonusAvailError',
    message: 'Bonus cannot be activated, try again later',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3033,
    httpStatusCode: 400
  },
  TRANSACTION_HANDLER_ERROR: {
    name: 'TransactionHandlerError',
    message: 'Transaction handler error ',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3034,
    httpStatusCode: 400
  },
  CASHBACK_LAPSED_ERROR: {
    name: 'CashbackLapsedError',
    message: 'Player does not have enough losses to get cashback',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3035,
    httpStatusCode: 400
  },
  BONUS_ALREADY_ISSUE_ERROR: {
    name: 'BonusAlreadyIssueError',
    message: 'Same Bonus cannot be issued again.',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3036,
    httpStatusCode: 400
  },
  USER_BONUS_ERROR: {
    name: 'UserBonusError',
    message: 'Action cannot be performed, bonus is claimed by user itself.',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3037,
    httpStatusCode: 400
  },
  BONUS_DELETE_ERROR: {
    name: 'BonusDeleteError',
    message: 'Bonus is being used by user or issuer is different, Bonus cannot be deleted',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3038,
    httpStatusCode: 400
  },
  WITHDRAW_REQUEST_NOT_FOUND: {
    name: 'WithdrawRequestNotFound',
    message: 'Withdrawal request not found.',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3039,
    httpStatusCode: 400
  },
  TENANT_REGISTRATION_NOT_EXISTS: {
    name: 'TenantRegistrationNotExists',
    message: 'Tenant Registration not exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3030,
    httpStatusCode: 400
  },
  CREDENTIALS_NOT_FOUND: {
    name: 'CredentialsNotFound',
    message: 'Credentials Not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3041,
    httpStatusCode: 400
  },
  ADMIN_NOT_FOUND: {
    name: 'AdminNotFound',
    message: 'Admin not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3044,
    httpStatusCode: 400
  },
  ID_REQUIRED: {
    name: 'IdRequired',
    message: 'Id required',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3045,
    httpStatusCode: 400
  },
  CANNOT_CREATE_ADMIN: {
    name: 'CannotCreateAdmin',
    message: 'Cannot Create Admin User',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3046,
    httpStatusCode: 400
  },
  PERMISSION_DENIED: {
    name: 'PermissionDenied',
    message: 'Permission Denied',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3047,
    httpStatusCode: 406
  },
  ROLE_NOT_FOUND: {
    name: 'RoleNotFound',
    message: 'Role Not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3048,
    httpStatusCode: 400
  },
  GROUP_NOT_FOUND: {
    name: 'GroupNotFound',
    message: 'Group Not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3049,
    httpStatusCode: 400
  },
  ACTION_NOT_ALLOWED: {
    name: 'ActionNotAllowed',
    message: 'Action not allowed',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3050,
    httpStatusCode: 403
  },
  LABEL_ALREADY_EXISTS: {
    name: 'LabelAlreadyExists',
    message: 'Label already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3051,
    httpStatusCode: 400
  },
  GLOBAL_REGISTRATION_NOT_FOUND: {
    name: 'GlobalRegistrationNotFound',
    message: 'Global Registration fields not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3052,
    httpStatusCode: 400
  },
  LOYALTY_LEVEL_NOT_FOUND: {
    name: 'LoyaltyLevelNotFound',
    message: 'Loyalty Level Settings Not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3053,
    httpStatusCode: 400
  },
  CASINO_PROVIDER_NOT_FOUND: {
    name: 'CasinoProviderNotFound',
    message: 'Casino provider Not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3054,
    httpStatusCode: 400
  },
  AGGREGATOR_NOT_FOUND: {
    name: 'AggregatorNotFound',
    message: 'Aggregator Not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3055,
    httpStatusCode: 400
  },
  STATUS_UPDATE_FAILED: {
    name: 'StatusUpdateFailed',
    message: 'Status update failed',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3056,
    httpStatusCode: 400
  },
  REASON_REQUIRED: {
    name: 'ReasonRequired',
    message: 'Reason is required to mark user in-active',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3057,
    httpStatusCode: 400
  },
  TOGGLE_CASE_INVALID: {
    name: 'ToggleCaseInvalid',
    message: 'Toggle case value is invalid',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3058,
    httpStatusCode: 400
  },
  DOMAIN_EXISTS: {
    name: 'DomainExists',
    message: 'Domain already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3059,
    httpStatusCode: 400
  },
  TENANT_EXISTS: {
    name: 'TenantExists',
    message: 'Tenant already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3060,
    httpStatusCode: 400
  },
  CREDENTIAL_KEY_NOT_FOUND: {
    name: 'CredentialKeyNotFound',
    message: 'Credential key not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3061,
    httpStatusCode: 400
  },
  TENANT_CREDENTIAL_EXISTS: {
    name: 'TenantCredentialExists',
    message: 'Tenant credential already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3062,
    httpStatusCode: 400
  },
  TENANT_CREDENTIALS_NOT_FOUND: {
    name: 'TenantCredentialsNotFound',
    message: 'Tenant credentials not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3063,
    httpStatusCode: 400
  },
  TENANT_CONFIGURATION_NOT_FOUND: {
    name: 'TenantConfigurationNotFound',
    message: 'Tenant configuration not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3064,
    httpStatusCode: 400
  },
  ALLOWED_CONFIGURATION_ERROR: {
    name: 'AllowedConfigurationError',
    message: 'Currency and language should be as per allowed configuration',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3066,
    httpStatusCode: 400
  },
  INTERNAL_USER_ERROR: {
    name: 'InternalUserError',
    message: 'This user is already Internal User',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3067,
    httpStatusCode: 400
  },
  DAILY_LIMIT_ERROR: {
    name: 'DailyLimitError',
    message: 'Daily limit should be less than weekly and monthly limit',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3068,
    httpStatusCode: 400
  },
  WEEKLY_LIMIT_ERROR: {
    name: 'WeeklyLimitError',
    message: 'Weekly limit should be greater than daily limit and less than monthly limit',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3069,
    httpStatusCode: 400
  },
  MONTHLY_LIMIT_ERROR: {
    name: 'MonthlyLimitError',
    message: 'Monthly limit should be greater than daily limit and weekly limit',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3070,
    httpStatusCode: 400
  },
  REMOVE_MONEY_ERROR: {
    name: 'RemoveMoneyError',
    message: 'Remove money amount is more than wallet balance',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3071,
    httpStatusCode: 400
  },
  IMAGE_NOT_FOUND: {
    name: 'ImageNotFound',
    message: 'Image not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3072,
    httpStatusCode: 400
  },
  VIP_TIER_LEVEL_ALREADY_EXISTS: {
    name: 'VipTierLevelAlreadyExists',
    message: `A VIP Tier with level already exists.`,
    explanation: 'Please choose a different level for the new VIP tier.',
    code: 3080,
    httpStatusCode: 400
  },
  FILE_NOT_FOUND: {
    name: 'FILE_NOT_FOUND',
    message: 'file not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3072,
    httpStatusCode: 400
  },
  REWARDS_NOT_FOUND: {
    name: 'RwardsNotFound',
    message: 'Rewards not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3072,
    httpStatusCode: 400
  },
  MULTIPLE_REWARDS_NOT_ALLOWED: {
    name: 'MULTIPLE_REWARDS_NOT_ALLOWED',
    message: 'multiple rewards not allowed',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3072,
    httpStatusCode: 400
  },
  BANNER_NOT_FOUND: {
    name: 'BannerNotFound',
    message: 'Banner not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3072,
    httpStatusCode: 400
  },
  BANNER_KEY_NOT_FOUND: {
    name: 'BannerKeyNotFound',
    message: 'Banner key not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3073,
    httpStatusCode: 400
  },
  KEY_NOT_FOUND: {
    name: 'KeyNotFound',
    message: 'Key not found for currency',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3074,
    httpStatusCode: 400
  },
  DAYS_REQUIRED: {
    name: 'DaysRequired',
    message: 'Days to clear required and should be less than 30 for freespins',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3075,
    httpStatusCode: 400
  },
  WAGERING_TYPE_INVALID: {
    name: 'WageringTypeInvalid',
    message: 'Invalid wagering type selected',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3076,
    httpStatusCode: 400
  },
  WAGERING_TEMPLATE_NOT_FOUND: {
    name: 'WageringTemplateNotFound',
    message: 'Wagering template not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3077,
    httpStatusCode: 400
  },
  INVALID_QUANTITY: {
    name: 'InvalidQuantity',
    message: 'Spins quantity must be less than 100',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3078,
    httpStatusCode: 400
  },
  APPLIED_BONUS_NOT_FOUND: {
    name: 'AppliedBonusNotFound',
    message: 'Applied bonus not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3079,
    httpStatusCode: 400
  },
  SPINS_REQUIRED: {
    name: 'SpinsRequired',
    message: 'Free spins quantity required',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3080,
    httpStatusCode: 400
  },
  GAMES_REQUIRED: {
    name: 'GamesRequired',
    message: 'Games required',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3081,
    httpStatusCode: 400
  },
  TIME_PERIOD_REQUIRED: {
    name: 'TimePeriodRequired',
    message: 'Time period required',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3082,
    httpStatusCode: 400
  },
  USER_BONUS_NOT_FOUND: {
    name: 'UserBonusNotFound',
    message: 'User bonus not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3083,
    httpStatusCode: 400
  },
  AGGREGATOR_EXISTS: {
    name: 'AggregatorExists',
    message: 'Casino aggregator already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3084,
    httpStatusCode: 400
  },
  GAME_SUB_CATEGORY_NOT_FOUND: {
    name: 'GameSubCategoryNotFound',
    message: 'Game Sub Category not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3085,
    httpStatusCode: 400
  },
  GAME_CATEGORY_NOT_FOUND: {
    name: 'GameCategoryNotFound',
    message: 'Game Category not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3086,
    httpStatusCode: 400
  },
  CASINO_PROVIDER_ALREADY_EXISTS: {
    name: 'CasinoProviderAlreadyExists',
    message: 'Casino provider already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3087,
    httpStatusCode: 400
  },
  GAME_CATEGORY_ALREADY_EXISTS: {
    name: 'GameCategoryAlreadyExists',
    message: 'Game Category already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3088,
    httpStatusCode: 400
  },
  GAME_SUB_CATEGORY_ALREADY_EXISTS: {
    name: 'GameSubCategoryAlreadyExists',
    message: 'Game Sub Category already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3089,
    httpStatusCode: 400
  },
  NAME_ALREADY_EXISTS: {
    name: 'NameAlreadyExists',
    message: 'Name already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3090,
    httpStatusCode: 400
  },
  CMS_ALREADY_EXISTS: {
    name: 'CmsAlreadyExists',
    message: 'Cms with this slug already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3091,
    httpStatusCode: 400
  },
  ITEMS_NOT_FOUND: {
    name: 'ItemsNotFound',
    message: 'Restricted items not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3092,
    httpStatusCode: 400
  },
  CURRENCY_ALREADY_EXISTS: {
    name: 'CurrencyAlreadyExists',
    message: 'Currency already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3093,
    httpStatusCode: 400
  },
  EMAIL_TEMPLATE_ALREADY_EXISTS: {
    name: 'EmailTemplateAlreadyExists',
    message: 'Email template for this label already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3094,
    httpStatusCode: 400
  },
  EMAIL_TEMPLATE_NOT_FOUND: {
    name: 'EmailTemplateNotFound',
    message: 'Email template not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3095,
    httpStatusCode: 400
  },
  PRIMARY_EMAIL: {
    name: 'PrimaryEmail',
    message: 'Cannot delete primary email',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3096,
    httpStatusCode: 400
  },
  PRIMARY_TEMPLATE: {
    name: 'PrimaryTemplate',
    message: 'Select other primary template',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3097,
    httpStatusCode: 400
  },
  CUSTOM_DATE_REQUIRED: {
    name: 'CustomDateRequired',
    message: 'Custom date options required dates',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3098,
    httpStatusCode: 400
  },
  ORDER_REQUIRED: {
    name: 'OrderRequired',
    message: 'Send order for all sub categories',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3100,
    httpStatusCode: 400
  },
  USER_DATA_UPDATED: {
    name: 'UserDataUpdated',
    message: 'User data already updated at my affiliate',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3101,
    httpStatusCode: 400
  },
  TOKEN_DECODE: {
    name: 'TokenDecode',
    message: 'Unable to decode Affiliate Token',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3102,
    httpStatusCode: 400
  },
  AFFILIATES_ERROR: {
    name: 'AffiliatesError',
    message: 'Unable to send user details to my affiliates',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3103,
    httpStatusCode: 400
  },
  PAYMENT_PROVIDER_NOT_FOUND_ERROR: {
    name: 'PaymentProviderNotFoundError',
    message: 'Payment Provider not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3104,
    httpStatusCode: 400
  },
  INVALID_FILE: {
    name: 'InvalidFile',
    message: 'Invalid File .',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3105,
    httpStatusCode: 400
  },
  DEPOSIT_CASHBACK_BONUS: {
    name: 'DepositCashbackBonus',
    message: 'Cannot issue Deposit Cashback bonus',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3106,
    httpStatusCode: 400
  },
  INVALID_BONUS_ERROR: {
    name: 'InvalidBonusError',
    message: 'Amount can be issued only in Deposit Bonus.',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3107,
    httpStatusCode: 400
  },
  AMOUNT_REQUIRED: {
    name: 'AmountRequired',
    message: 'Bonus amount required',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3108,
    httpStatusCode: 400
  },
  MERCHANT_NOT_FOUND: {
    name: 'MerchantNotFound',
    message: 'Merchant not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3109,
    httpStatusCode: 400
  },
  SEGMENTS_NOT_FOUND: {
    name: 'SegmentsNotFound',
    message: 'Segments not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3110,
    httpStatusCode: 400
  },
  USER_COUNTRY_BLOCKED: {
    name: 'UserCountryBlocked',
    message: 'This bonus is blocked for players country',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3111,
    httpStatusCode: 400
  },
  BALANCE_BONUS_CLAIMED: {
    name: 'BalanceBonusClaimed',
    message: 'Balance Bonus applying this bonus is claimed by user.',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3112,
    httpStatusCode: 400
  },
  COMMENT_NOT_FOUND: {
    name: 'CommentNotFound',
    message: 'Comment not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3113,
    httpStatusCode: 400
  },
  EMAIL_ALREADY_VERIFIED: {
    name: 'EmailAlreadyVerified',
    message: 'Email already verified',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3114,
    httpStatusCode: 400
  },
  EXTERNAL_API_ERROR: {
    name: 'ExternalApiError',
    message: 'External api response error',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3115,
    httpStatusCode: 400
  },
  FIELD_NAME_REQUIRED: {
    name: 'FieldNameRequired',
    message: 'Field names required to delete',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3116,
    httpStatusCode: 400
  },
  AMOUNT_FIELD_DELETE_ERROR: {
    name: 'AmountFieldDeleteError',
    message: 'Amount field cannot be deleted',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3117,
    httpStatusCode: 400
  },
  PAYMENT_PROVIDER_ALREADY_EXISTS: {
    name: 'PaymentProviderAlreadyExists',
    message: 'Payment provider for this aggregator and group already exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3118,
    httpStatusCode: 400
  },
  SAME_PASSWORD_ERROR: {
    name: 'SamePasswordError',
    message: 'New Password cannot be same as previous password',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3119,
    httpStatusCode: 400
  },
  WRONG_PASSWORD_ERROR: {
    name: 'WrongPasswordError',
    message: 'Current password wrong',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3120,
    httpStatusCode: 400
  },
  EMAIL_NOT_VERIFIED: {
    name: 'EmailNotVerified',
    message: 'Email Not Verified',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3121,
    httpStatusCode: 400
  },
  REVIEW_NOT_FOUND: {
    name: 'ReviewNotFound',
    message: 'Review not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3122,
    httpStatusCode: 400
  },
  SPORTS_BETTING_TRANSACTIONS_NOT_FOUND: {
    name: 'SportsBettingTransactionsNotFound',
    message: 'Sports Betting transactions not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 33123,
    httpStatusCode: 400
  },
  JOINING_AMOUNT_NOT_FOUND: {
    name: 'JoiningAmountNotFound',
    message: 'Joining Amount not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3124,
    httpStatusCode: 400
  },
  ACTIVE_BONUS_EXISTS: {
    name: 'ActiveBonusExists',
    message: 'Active Bonus already exists.',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3125,
    httpStatusCode: 400
  },
  NOT_FOUND_CASINO_GAME: {
    name: 'NotFoundCasinoGame',
    message: 'Not Found CasinoGame.',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3126,
    httpStatusCode: 400
  },
  PROMOTION_SLUG_ALREADY_EXISTS: {
    name: 'PromotionSlugAlreadyExists',
    message: 'Promotion slug already exists.',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3126,
    httpStatusCode: 400
  },
  PROMOTION_NOT_EXISTS: {
    name: 'PromotionNotExists',
    message: 'Promotion not exists.',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3126,
    httpStatusCode: 400
  },
  PREVIOUS_LEVEL_NOT_UPDATED: {
    name: 'PreviousLevelNotUpdated',
    message: 'Please update previous level ',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3128,
    httpStatusCode: 400
  },
  GROUP_ALREADY_EXISTS: {
    name: 'GroupAlreadyExistsErrorType',
    message: 'Group Already Exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3129,
    httpStatusCode: 400
  },
  COMMISION_GROUP_ALREADY_EXISTS: {
    name: 'CommisionGroupAlreadyExists',
    message: 'Affiliates Commision Group Already Exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3132,
    httpStatusCode: 400
  },
  COMMISION_GROUP_NOT_EXISTS: {
    name: 'CommisionGroupNotExists',
    message: 'Affiliates Commision Group Not Exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3133,
    httpStatusCode: 400
  },
  UPLINE_USER_ALREADY_EXISTS: {
    name: 'UplineUserAlreadyExists',
    message: 'Upline User Already Exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3133,
    httpStatusCode: 400
  },
  PACKAGE_ALREADY_EXISTS: {
    name: 'PackageAlreadyExists',
    message: 'Package already exists with the same label',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3026,
    httpStatusCode: 400
  },
  PACKAGE_NOT_EXISTS: {
    name: 'PackageNotExists',
    message: 'Package does not exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3005,
    httpStatusCode: 400
  },
  PACKAGE_NOT_FOUND: {
    name: 'PackageNotFound',
    message: 'Package not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3095,
    httpStatusCode: 400
  },
  PACKAGE_AMOUNT_ERROR: {
    name: 'PackageMinimumAmountError',
    message: 'Amount must be between given range',
    explanation: 'Please adjust the amount within the valid range. Please provide a valid amount.',
    code: 3096,
    httpStatusCode: 400
  },
  PACKAGE_SC_COIN_ERROR: {
    name: 'PackageSCCoinError',
    message: `SC Coin must be between given range`,
    explanation: 'Please adjust the SC Coin amount within the valid range.',
    code: 3097,
    httpStatusCode: 400
  },
  PACKAGE_DISCOUNT_AMOUNT_ERROR: {
    name: 'PackageDiscountAmountError',
    message: `Discount Amount must be between given range`,
    explanation: 'Please adjust the discount amount within the valid range.',
    code: 3099,
    httpStatusCode: 400
  },
  PACKAGE_GC_COIN_ERROR: {
    name: 'PackageGCCoinError',
    message: `GC Coin must be between given range`,
    explanation: 'Please adjust the GC Coin amount within the valid range.',
    code: 3098,
    httpStatusCode: 400
  },
  ADMIN_ROLE_NOT_FOUND: {
    name: 'AdminRoleNotFound',
    message: 'Admin role not found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3095,
    httpStatusCode: 400
  },
  ADMIN_ROLE_NOT_EXISTS: {
    name: 'AdminRoleNotExists',
    message: 'Admin role does not exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3005,
    httpStatusCode: 400
  },
  VIP_TIER_ALREADY_EXISTS: {
    name: 'VipTierAlreadyExists',
    message: 'Vip Tier already exists for the same level or same name',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3026,
    httpStatusCode: 400
  },
  VIP_TIER_NOT_EXISTS: {
    name: 'VipTierNotExists',
    message: 'Vip Tier does not exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3005,
    httpStatusCode: 400
  },
  VIP_TIERS_NOT_EXISTS: {
    name: 'VipTiersNotExists',
    message: 'Vip Tiers does not exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3005,
    httpStatusCode: 400
  },
  MAX_LIMIT_LESS_THAN_MIN_LIMIT: {
    name: 'MaxDepositLimitLessThanMinDepositLimit',
    message: 'Max deposit limit can not be less than Min deposit limit',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3005,
    httpStatusCode: 400
  },
  MIN_LIMIT_GREATER_THAN_MAX_LIMIT: {
    name: 'MinDepositLimitGreaterThanMaxDepositLimit',
    message: 'Min deposit limit can not be greater than Max deposit limit',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3005,
    httpStatusCode: 400
  },
  INVALID_WHEEL_DIVISION_ID: {
    name: 'InvalidWheelDivisionId',
    message: 'Invalid WheelDivisionId .',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3105,
    httpStatusCode: 400
  },
  USER_LIMITS_DOES_NOT_EXISTS: {
    name: 'UserLimtsDoesNotExists',
    message: 'User Limits does not exists',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3005,
    httpStatusCode: 400
  },
  FAUCET_SETTINGS_DOES_NOT_EXISTS: {
    name: 'FaucetSettingsDoesNotExists',
    message: 'Faucet settings does not exists',
    explanation: 'Settings for Faucet does not exists in global settings',
    code: 3005,
    httpStatusCode: 400
  },
  WITHDRAWAL_LIMITS_SETTINGS_DOES_NOT_EXISTS: {
    name: 'WithdrawalLimitsSettingsDoesNotExists',
    message: 'Withdrawal limits settings does not exists',
    explanation: 'Settings for Withdrawal Limits does not exists in global settings',
    code: 3005,
    httpStatusCode: 400
  },
  INVALID_TICKET_ID: {
    name: 'InvalidTicketId',
    message: 'TicketId is invlid',
    explanation: 'There is no ticket present for the given ticketId.',
    code: 3131,
    httpStatusCode: 400
  },
  INVALID_TICKET_STATUS: {
    name: 'InvalidTicketStatus',
    message: 'Ticket status is invlid',
    explanation: 'The given ticket status is invalid',
    code: 3132,
    httpStatusCode: 400
  },
  NO_TICKETS_FOUND: {
    name: 'NoTicketsFound',
    message: 'No Tickets Found',
    explanation: 'No tickets present for the given search values',
    code: 3133,
    httpStatusCode: 400
  },
  GLOBAL_GROUP_EXIST: {
    name: 'GlobalGroupExist',
    message: 'Global Group Exist',
    explanation: 'Global group already exist',
    code: 3134,
    httpStatusCode: 400
  },
  GROUP_NAME_ALREADY_EXIST: {
    name: 'GroupNameExist',
    message: 'Global Name Exist',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3135,
    httpStatusCode: 400
  },
  CHAT_GROUP_NOT_FOUND: {
    name: 'ChatGroupNotFound',
    message: 'Chat Group Not Found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3136,
    httpStatusCode: 400
  },
  CHAT_RAIN_ALREADY_ACTIVE: {
    name: 'ChatRainAlreadyActive',
    message: 'Chat Rain Already Active',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3137,
    httpStatusCode: 400
  },
  CHAT_RAIN_NOT_FOUND: {
    name: 'ChatRainNotFound',
    message: 'Chat Rain Not Found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3138,
    httpStatusCode: 400
  },
  CHAT_RULE_NOT_FOUND: {
    name: 'ChatRuleNotFound',
    message: 'Chat Rule Not Found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3139,
    httpStatusCode: 400
  },
  OFFENSIVE_WORD_EXIST: {
    name: 'OffensiveWordExist',
    message: 'Offensive word already exist',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3140,
    httpStatusCode: 400
  },
  OFFENSIVE_WORD_NOT_FOUND: {
    name: 'OffensiveWordNotFound',
    message: 'Offensive Word Not Found',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    code: 3141,
    httpStatusCode: 400
  },
  ERROR_WITH_PAYMENT_GATEWAY: {
    name: 'ErrorWithPaymentGateway',
    message: 'Some error with payment gateway',
    explanation: 'Some error with payment gateway.',
    code: 3142,
    httpStatusCode: 400
  }
}
