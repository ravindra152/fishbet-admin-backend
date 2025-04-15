import axios from 'axios'
import config from '@src/configs/app.config'
import Logger from '../logger'

export class GsoftCasinoAxios {
  constructor () {
    this.casinoAxios = axios.create({
      baseURL: config.get('gsoft.baseUrl'),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  /**
   * Retrieves GSoft login token.
   * @returns {Promise<String>} JWT token.
   */
  async getLoginToken () {
    const response = await this.casinoAxios.post('/1.0.0/login', {
      email: config.get('gsoft.email'),
      password: config.get('gsoft.password')
    })
    if (response.status !== 200) throw new Error('Login failed')
    return response.headers['jwt-auth']
  }

  /**
   * Retrieves detailed casino games data.
   * If token is not provided, automatically fetches one.
   * @param {string} [token] - Optional JWT token.
   * @returns {Promise<Object>} Casino games data.
   */
  async getCasinoGames () {
    try {
      const token = await this.getLoginToken()

      const response = await this.casinoAxios.get('/games/1.0.0/view/detailed', {
        headers: { 'jwt-auth': token }
      })

      if (response.status !== 200) throw new Error('Failed to fetch games')
      return response.data
    } catch (error) {
      Logger.error('Error fetching casino games:', { message: error.message })
      throw new Error('ServiceUnavailableErrorType')
    }
  }
}
