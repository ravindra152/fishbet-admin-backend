import { iconic21CasinoConfig } from '@src/configs/casinoProviders/iconicCasino.config'
import axios from 'axios'
import crypto from 'crypto'
import Logger from '../logger'

export class IconicCasinoAxios {
   constructor() {
      this.casinoAxios = axios.create({
         baseURL: `https://lobby-service.stage.beter.live`,
         headers: { 'Content-Type': 'application/json' },
      })
   }

   /**
    * Generates a request signature for Iconic Casino API.
    * @param {string} secret - The secret key.
    * @param {Object} payload - The request payload.
    * @returns {string} The generated signature.
    */
   generateRequestSignature(secret, payload) {
      const concatenatedString = secret + JSON.stringify(payload)
      return crypto.createHash('sha256').update(concatenatedString).digest('hex')
   }

   /**
    * Sends a POST request with signature header.
    * @param {string} endpoint - API endpoint.
    * @param {Object} payload - Request payload.
    * @returns {Promise<Object>} API response data.
    */
   async postWithSignature(endpoint, payload) {
      try {
         const signature = this.generateRequestSignature(iconic21CasinoConfig.secret, payload)

         const response = await this.casinoAxios.post(endpoint, payload, {
            headers: {
               'X-REQUEST-SIGN': signature,
            },
         })

         if (response.status !== 200) {
            throw new Error(`Failed request: ${response.statusText}`)
         }

         return response.data
      } catch (error) {
         Logger.error('Error during IconicCasino API call:', { message: error.message })
         throw new Error('ServiceUnavailableErrorType')
      }
   }

   /**
    * Retrieves available tables from the Iconic Casino API.
    * @returns {Promise<Object>} Available tables data.
    */
   async getAvailableTables(languages, currencies, resolutions) {
      const payload = { casino: iconic21CasinoConfig.casino, languages, currencies, resolutions }
      return this.postWithSignature('/api/v2/tables/available', payload)
   }
}
