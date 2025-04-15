import { Axios } from 'axios'
import config from '@src/configs/app.config'

export class UserBackendAxios extends Axios {
  constructor () {
    super({
      baseURL: `${config.get('app.userBackendUrl')}/api/v1`,
      auth: {
        username: config.get('basic.username'),
        password: config.get('basic.password')
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * Sends a promotion message.
   * @param {string} imageUrl - URL of the image to send.
   * @param {string} content - The content of the promotion message.
   * @returns {boolean} Success status.
   */
  static async sendPromotionMessage (imageUrl, content) {
    try {
      const userBackendAxios = new UserBackendAxios()
      console.log('---------------',content)
      const response = await userBackendAxios.post('/send-promotion', JSON.stringify({ image: imageUrl, content }))
      // const response = await userBackendAxios.post('/send-promotion', { image: imageUrl, content })
      console.log('---------------',response)
      const data = JSON.parse(response.data)

      if (response.status !== 200) throw data.errors

      return data?.data?.success || true
    } catch (error) {
      console.log(error)
      throw Error('ServiceUnavailableErrorType')
    }
  }
}
