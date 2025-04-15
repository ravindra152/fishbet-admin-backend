import config from '@src/configs/app.config';
import { AppError } from '@src/errors/app.error';
import jwt from 'jsonwebtoken';

/**
 * Generates an access token for the provided user and token type.
 * 
 * @param {Object} user - The user object containing user details.
 * @param {string} tokenType - The type of token (e.g., 'login', 'refresh').
 * @returns {Promise<string>} - The generated JWT access token.
 */
export const createAccessToken = async (user, tokenType) => {
  try {
    // Extract JWT configuration
    const tokenExpiry = config.get('jwt.loginTokenExpiry');
    const tokenSecret = config.get('jwt.loginTokenSecret');
    // Construct the token payload
    const payload = {
      userId: user.adminUserId,
      username: user.email,
      type: tokenType,
      permission: user.permission,
    };

    // Generate the access token
    const accessToken = jwt.sign(payload, tokenSecret, { expiresIn: tokenExpiry });

    // If Redis or any caching mechanism is used, uncomment the following lines to store the token:
    // await client.set(
    //   `${user.userId}:${tokenType}`,
    //   accessToken,
    //   'EX',
    //   tokenExpiry
    // );

    return accessToken;
  } catch (error) {
    console.error('Error creating access token:', error.message);
    throw new AppError('Failed to create access token.');
  }
};
