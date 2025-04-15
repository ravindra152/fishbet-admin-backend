import config from '@src/configs/app.config'

export const SUCCESS_MSG = {
  METHOD: 'Healthcheck',
  REDIS_SUCCESS: 'PONG',
  HEALTHCHECK_SUCCESS: 'OK',
  EMAIL_SUCCESS: 'Email sent.',
  PASSWORD_RESET: 'Password updated',
  GET_SUCCESS: 'Record get successfully',
  BONUS_ADDED: 'Bonus added successfully',
  BONUS_ISSUE: 'Bonus issued successfully',
  IMAGE_SUCCESS: 'Image deleted from gallery',
  CREATE_SUCCESS: 'Record created successfully',
  DELETE_SUCCESS: 'Record deleted successfully',
  UPDATE_SUCCESS: 'Record updated successfully',
  CANCEL_SUCCESS: 'Bonus cancelled successfully',
  DEPOSIT_SUCCESS: 'Amount deposited successfully',
  STATUS_UPDATED: 'Status has been updated successfully',
  RESET_PASSWORD_EMAIL: 'Reset password email is valid for ' + config.get('jwt.resetPasswordExpiry')
}
