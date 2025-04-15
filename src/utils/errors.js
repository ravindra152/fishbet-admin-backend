import { StatusCodes } from 'http-status-codes'

export const ERRORS = {
  BAD_DATA: 'badData',
  BAD_REQUEST: 'badRequest',
  INTERNAL: 'internal',
  SERVICE_FAILED: 'service failed',
  CACHE_FAILED: 'cache failed'
}

export const APP_ERROR_CODES = {
  EMAIL_NOT_REGISTERED: 'This email is not registered',
  INCORRECT_PASSWORD: 'This password is incorrect',
  ADMIN_NOT_FOUND: 'Admin not found',
  AFFILIATE_NOT_FOUND: 'Affiliate not found',
  INVALID_TOKEN: 'Access token is invalid',
  INACTIVE_ADMIN: 'Cannot login, current user is in-active'
}

export const ERROR_MSG = {
  SERVER_ERROR: 'Something went wrong',
  NOT_FOUND: 'not found',
  NOT_EXISTS: 'does not exists',
  ID_REQUIRED: 'ID required',
  NOT_ALLOWED: 'Action not allowed',
  TRANSACTION_DENIED: 'Receiver not in hierarchy, transaction denied',
  SENDGRID_ERROR: 'Unable to send email.',
  SENDGRID_CREDENTIALS: 'Sendgrid credentials not found',
  IMAGE_ERROR: 'Unable to delete image from gallery',
  TRANSACTION_FAILED: 'Transaction failed',
  SESSION_ERROR: 'Invalid session or session expired'
}

export const ERROR_CODE = {
  TRANSACTION_FAILED: 101,
  BAD_REQUEST: 400
}

export const SocketResponseValidationErrorType = {
  name: 'SocketResponseValidationError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: false,
  description: 'Response validation of socket failed please refer json schema of response',
  errorCode: 3004
}

export const InternalServerErrorType = {
  name: 'InternalServerError',
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  isOperational: true,
  description: 'Internal Server Error',
  errorCode: 3005
}

export const InvalidSocketArgumentErrorType = {
  name: 'InvalidSocketArgumentError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Please provide, proper arguments eventName, [payloadObject], and [callback]',
  errorCode: 3006
}
