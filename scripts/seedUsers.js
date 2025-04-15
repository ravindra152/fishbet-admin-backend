import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import db from '../src/db/models'

const PASSWORD = 'Player@123'

export const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)

  return (bcrypt.hashSync(Buffer.from(password, 'base64').toString('ascii'), salt))
}

export async function generateUsers (count) {
  const data = []
  const currencies = await db.Currency.findAll({
    where: { isActive: true },
    attributes: ['currencyId']
  }).map((obj) => { return obj.currencyId })
  for (let i = 0; i < count; i++) {
    data.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: encryptPassword(PASSWORD),
      dateOfBirth: faker.date.birthdate(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: '',
      phoneCode: '',
      gender: faker.helpers.arrayElement(['Male', 'Female']),
      countryCode: '91',
      locale: 'EN',
      city: '',
      zipCode: '',
      address: '',
      isEmailVerified: true,
      level: '',
      preferredLanguage: '',
      userWallets: currencies.map(currencyId => ({
        currencyId: currencyId,
        amount: 0,
        nonCashAmount: 0
      })),
      userDetails: {
        disableReason: 'NO'
      }
    })
  }
  console.log(data)
}
