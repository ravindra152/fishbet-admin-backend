// import { de } from '@faker-js/faker/.'
import config from '@src/configs/app.config'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { JWT_TOKEN_TYPES } from '@src/utils/constant'
import jwt from 'jsonwebtoken'

export function isAdminAuthenticated(module, permissionLevel) {
  return function (req, res, next) {
    try {
      const accessToken = req.headers.authorization?.split('Bearer ')[1]
      // Extract the token from the "Bearer" scheme
      if (!accessToken) next(new AppError(Errors.UN_AUTHORIZE))

      // Verify the token
      const decodedToken = jwt.verify(accessToken, config.get('jwt.loginTokenSecret'))
      if (decodedToken.type !== JWT_TOKEN_TYPES.LOGIN) next(new AppError(Errors.UN_AUTHORIZE))

      // Check permissions if module and permission level are provided
      if (
        module &&
        permissionLevel &&
        (!decodedToken.permission || !decodedToken.permission[module]?.includes(permissionLevel))
      ) {
        next(new AppError(Errors.PERMISSION_DENIED))
      }
      // Attach user details to the request object
      req.body.user = decodedToken
      req.body.id = decodedToken.userId
      req.body.authenticatedAdminId = decodedToken.userId;

      next()
    } catch (error) {
      // Handle token verification errors
      console.log(error);
      next(new AppError(Errors.UN_AUTHORIZE))
    }
  }
}
