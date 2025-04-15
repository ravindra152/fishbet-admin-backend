import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { updateEntity } from '@src/services/helper/crud'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    sms: { type: 'number', enum: [0, 2] },
    email: { type: 'number', enum: [0, 2] },
    phone: { type: 'number', enum: [0, 2] },
    gender: { type: 'number', enum: [0, 2] },
    address: { type: 'number', enum: [0, 2] },
    password: { type: 'number', enum: [0, 2] },
    lastName: { type: 'number', enum: [0, 2] },
    username: { type: 'number', enum: [0, 2] },
    firstName: { type: 'number', enum: [0, 2] },
    newsLetter: { type: 'number', enum: [0, 2] },
    dateOfBirth: { type: 'number', enum: [0, 2] },
    countryCode: { type: 'number', enum: [0, 2] },
    currencyCode: { type: 'number', enum: [0, 2] },
    confirmPassword: { type: 'number', enum: [0, 2] },
    preferredLanguage: { type: 'number', enum: [0, 2] }
  },
  required: ['email', 'password', 'firstName', 'lastName', 'dateOfBirth', 'address', 'phone', 'gender', 'username',
    'countryCode', 'preferredLanguage', 'newsLetter', 'currencyCode', 'sms', 'confirmPassword']
}



export class UpdateGlobalRegistrationHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const {
      email, password, confirmPassword, username, firstName, lastName, dateOfBirth, address,
      phone, gender, preferredLanguage, countryCode, newsLetter, currencyCode, sms
    } = this.args

    const updatedValues = {
      email,
      password,
      confirmPassword,
      username,
      firstName,
      lastName,
      dateOfBirth,
      address,
      phone,
      gender,
      preferredLanguage,
      countryCode,
      newsLetter,
      currencyCode,
      sms
    }

    const updateGlobalRegistration = await updateEntity({
      model: db.GlobalSetting,
      values: { key: 'GLOBAL_REGISTRATION' },
      data: { value: updatedValues }
    })

    return { updateGlobalRegistration, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
