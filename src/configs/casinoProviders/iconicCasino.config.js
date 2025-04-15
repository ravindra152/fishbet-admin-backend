// const { Logger } = require('@src/libs/logger')
const config = require('../app.config')

export const iconic21CasinoConfig = {
   secret: config.get('iconic21Casino.secret'),
   url: config.get('iconic21Casino.baseUrl'),
   casino: config.get('iconic21Casino.casino')
}
