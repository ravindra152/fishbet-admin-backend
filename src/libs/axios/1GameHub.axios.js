import config from '@src/configs/app.config'
import { Logger } from '@src/libs/logger'
import { ONE_GAME_HUB_REQUEST_ACTIONS } from '@src/utils/constants/casino.constants'
import axios from 'axios'


export class GameHube1CasinoAxios {
  constructor() {
    this.casinoAxios = axios.create({
      baseURL: config.get('gsoft.baseUrl'),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  /**
   * Retrieves GSoft login token.
   * @returns {Promise<String>} JWT token.
   */
  /**
   * Retrieves detailed casino games data.
   * If token is not provided, automatically fetches one.
   * @param {string} [token] - Optional JWT token.
   * @returns {Promise<Object>} Casino games data.
   */

  async getCasinoGames() {
    try {
      // We can retrieve any configuration, like the secret key if needed
      const secretKey = config.get('gameHub1.secretToken')
      // Make the API request to the new endpoint
      const baseUrl = config.get('gameHub1.baseUrl');

      console.log("GameHub Base URL:", config.get('gameHub1.baseUrl'));
      console.log("GameHub Secret Token:", config.get('gameHub1.secretToken'));

      console.log("secretKey:", secretKey);
      console.log("baseUrl:", baseUrl);



      // Make the API request to the correct endpoint
      const { data } = await axios.get(baseUrl, {
        params: {
          action: ONE_GAME_HUB_REQUEST_ACTIONS.AVAILABLE_GAMES,
          secret: secretKey,
        },
      });
      // Check for successful response
      //if (data.status !== 200) throw new Error('Failed to fetch casino games');

      // Return the data from the response
      return data.response;
    } catch (error) {
      // Log the error with detailed information
      Logger.error('Error fetching casino games:'+ONE_GAME_HUB_REQUEST_ACTIONS.AVAILABLE_GAMES+"---->"+config.get('gameHub1.secretToken'), { message: error.message });

      // Throw an appropriate custom error
      throw new Error('ServiceUnavailableErrorType');
    }
  }

}
