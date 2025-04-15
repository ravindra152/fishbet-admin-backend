import config from '@src/configs/app.config'
import db from '@src/db/models'
import { getAll, getOne } from '@src/services/helper/crud'
import { internationalNumberFormatter } from '@src/services/helper/report'
import axios from 'axios'
import bcrypt from 'bcrypt'
import CryptoJS from 'crypto-js'
import encode from 'crypto-js/enc-hex'
import ObsClient from 'esdk-obs-nodejs'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import md5 from 'md5'
import { Op, Sequelize } from 'sequelize'
import sharp from 'sharp'
import { Readable } from 'stream'
import { v4 as uuid } from 'uuid'
import { BONUS_TYPE, OK, REPORT_TIME_PERIOD_FILTER, TRANSACTION_STATUS, TRANSACTION_TYPE, UPLOAD_FILE_SIZE } from './constant'
import exp from 'constants'
import { dayjs } from '@src/libs/dayjs'

export const comparePassword = async (password, userPassword) => {
  if (!password) return false
  const result = await bcrypt.compare(Buffer.from(password, 'base64').toString('ascii'),
    userPassword)

  return result
}

export const signAccessToken = async ({ name, email, id, role, roleId }) => {
  const payload = { email, id, name, role, roleId }

  const jwtToken = jwt.sign(payload,
    config.get('jwt.loginTokenSecret'),
    { expiresIn: config.get('jwt.loginTokenExpiry') }
  )

  return jwtToken
}

export const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)

  return (bcrypt.hashSync(Buffer.from(password, 'base64').toString('ascii'), salt))
}

export const filterByNameEmail = (query, search, model) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  let innerQuery

  if (model === 'User') innerQuery = { username: { [Op.iLike]: `%${search}%` } }

  query = {
    ...query,
    [Op.or]: [
      Sequelize.where(Sequelize.fn('concat', Sequelize.col(`${model}.first_name`), ' ', Sequelize.col(`${model}.last_name`)), {
        [Op.iLike]: `%${search}%`
      }),
      { email: { [Op.iLike]: `%${search}%` } }, innerQuery]
  }

  return query
}

export const filterByTitleSlugContent = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } },
    { slug: { [Op.iLike]: `%${search}%` } },
    { content: { [Op.iLike]: `%${search}%` } }]
  }

  return query
}

export const filterByName = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }]
  }
  return query
}

export const filterByUserName = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ username: { [Op.iLike]: `%${search}%` } }]
  }
  return query
}

export const filterByRule = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ rules: { [Op.iLike]: `%${search}%` } }]
  }
  return query
}
export const filterByWord = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ word: { [Op.iLike]: `%${search}%` } }]
  }
  return query
}

export const filterByMessage = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ message: { [Op.iLike]: `%${search}%` } }]
  }
  return query

}
export const filterByDescription = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ description: { [Op.iLike]: `%${search}%` } }]
  }
  return query

}


export const filterByEmailName = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } },
    { email: { [Op.iLike]: `%${search}%` } }]
  }
  return query
}

export const filterByDate = (query, startDate = null, endDate = null, modelName, dob = false) => {
  endDate = endDate || Date.now()
  let column = 'updated_at'
  if (dob) column = 'date_of_birth'

  if (startDate) {
    query = {
      ...query,
      [Op.and]: [
        Sequelize.where(Sequelize.fn('date', Sequelize.col(`${modelName}.${column}`)), '>=', new Date(startDate)),
        Sequelize.where(Sequelize.fn('date', Sequelize.col(`${modelName}.${column}`)), '<=', new Date(endDate))
      ]
    }
  } else {
    query = {
      ...query,
      [Op.or]: [
        Sequelize.where(Sequelize.fn('date', Sequelize.col(`${modelName}.${column}`)), '<=', new Date(endDate))
      ]
    }
  }

  return query
}

export const filterByDateCreatedAt = (query, startDate = null, endDate = null, modelName) => {
  endDate = endDate || Date.now()

  if (startDate) {
    query = {
      ...query,
      [Op.and]: [
        Sequelize.where(Sequelize.fn('date', Sequelize.col(`${modelName}.created_at`)), '>=', new Date(startDate)),
        Sequelize.where(Sequelize.fn('date', Sequelize.col(`${modelName}.created_at`)), '<=', new Date(endDate))
      ]
    }
  } else {
    query = {
      ...query,
      [Op.or]: [
        Sequelize.where(Sequelize.fn('date', Sequelize.col(`${modelName}.created_at`)), '<=', new Date(endDate))
      ]
    }
  }

  return query
}

export const pageValidation = (pageNo, limit, maxSize = 200) => {
  const pageAsNumber = Number.parseInt(pageNo)
  const sizeAsNumber = Number.parseInt(limit)
  let page = 1
  let size = 15

  if ((Number.isNaN(pageAsNumber) || pageAsNumber < 0) ||
    (Number.isNaN(sizeAsNumber) || sizeAsNumber < 0 || sizeAsNumber > maxSize)) {
    return { page, size }
  }

  size = sizeAsNumber
  page = pageAsNumber

  return { page, size }
}

function LightenDarkenColor(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '')
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  lum = lum || 0

  // convert to decimal and change luminosity
  let rgb = '#'
  let c
  let i

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
    rgb += ('00' + c).substr(c.length)
  }

  return rgb
}

const lightColor = (color, value) => {
  for (let i = 0; i <= 1; i = i + 0.3) {
    const colorVariation = i.toFixed(1)
    const newColor = LightenDarkenColor(color, colorVariation)
    value[`light_${colorVariation * 100}`] = newColor
  }

  return value
}

const darkColor = (color, value) => {
  for (let i = 0; i <= 1; i = i + 0.3) {
    const colorVariation = i.toFixed(1)
    const newColor = LightenDarkenColor(color, (colorVariation * -1))
    value[`dark_${colorVariation * 100}`] = newColor
  }

  return value
}

export const themeAttributes = (mode, primaryColor, secondaryColor) => {
  mode = mode.toLowerCase()

  let primary = { main: primaryColor }
  primary = { ...primary, ...darkColor(primaryColor, primary) }
  primary = { ...primary, ...lightColor(secondaryColor, primary) }

  let secondary = { main: secondaryColor }
  secondary = { ...secondary, ...darkColor(secondaryColor, secondary) }
  secondary = { ...secondary, ...lightColor(secondaryColor, secondary) }

  return { palette: { mode, primary, secondary } }
}

export const validateFile = (res, file) => {
  if (file && file.size > UPLOAD_FILE_SIZE) {
    return 'File size too large'
  }

  if (file && file.mimetype) {
    const fileType = file.mimetype.split('/')[1]
    const supportedFileType = ['png', 'jpg', 'jpeg', 'tiff', 'svg+xml']

    if (!supportedFileType.includes(fileType)) {
      return 'File type not supported'
    }
  }

  return OK
}

export const uploadLogo = (logo, filename, key = undefined) => {
  filename = filename.split(' ').join('')

  const bucketParams = {
    Bucket: config.get('aws.bucket'),
    Key: filename,
    Body: logo.buffer,
    ACL: 'public-read',
    ContentType: logo.mimetype
  }

  if (key) {
    const deleteParams = {
      Bucket: config.get('aws.bucket'),
      Key: key
    }
    s3Client().deleteObject(deleteParams).promise()
  }

  const logoS3 = s3Client().upload(bucketParams).promise()
  return logoS3
}

export const getKey = (fileName) => {
  let key = fileName
  if (fileName.includes('amazonaws.com/')) {
    key = fileName.split('amazonaws.com/')[1]
  }

  return key
}

export const dimensionCheck = async (image, height, width) => {
  const size = await sharp(image.buffer).metadata()
  if (height !== size.height && width !== size.width) {
    return false
  }
  return OK
}

export const removeItems = (array, itemsToRemove) => {
  return array.filter(v => {
    return !itemsToRemove.includes(v)
  })
}

export const encodeCredential = (key) => {
  return CryptoJS.AES.encrypt(key, config.get('credentialEncryptionKey')).toString()
}

export const decodeCredential = (data, object = false) => {
  if (!object) return CryptoJS.AES.decrypt(data, config.get('credentialEncryptionKey')).toString(CryptoJS.enc.Utf8)

  const credentials = []

  data.forEach((credential) => {
    credential.value = CryptoJS.AES.decrypt(credential.value, config.get('credentialEncryptionKey')).toString(CryptoJS.enc.Utf8)
    credentials.push(credential)
  })

  return credentials
}

export const filterByCommisionGroupName = (query, search) => {
  if (search) {
    search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
    query = {
      ...query,
      groupName: { [Op.iLike]: `%${search}%` }
    }
  }
  return query
}

export const filterByNameDomain = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } },
    { domain: { [Op.iLike]: `%${search}%` } }]
  }
  return query
}

export const getPrimaryCurrencyAmount = async ({ currencyCode, amount, bonus, transaction }) => {
  let conversionRate
  const primaryCurrency = await getOne({ model: db.Currency, data: { isPrimary: true }, transaction })

  const sourceExchangeRate = await getOne({
    model: db.Currency,
    data: { code: currencyCode },
    attributes: ['exchangeRate'],
    transaction
  })

  if (bonus) conversionRate = parseFloat(sourceExchangeRate.exchangeRate) / primaryCurrency.exchangeRate
  else conversionRate = parseFloat(primaryCurrency.exchangeRate) / sourceExchangeRate.exchangeRate

  amount = Math.abs((amount * conversionRate).toFixed(2))
  return { amount, conversionRate }
}

export const topPlayerResponse = (data) => {
  const response = []
  data.forEach(object => {
    const newData = {}
    Object.keys(object).forEach(key => {
      newData[key.split('.')[key.split('.').length - 1]] = object[key]
      if (key.split('.')[key.split('.').length - 1] === 'amount' || key.split('.')[key.split('.').length - 1] === 'depositAmount') {
        newData[key.split('.')[key.split('.').length - 1]] = internationalNumberFormatter(object[key])
      }
    })
    response.push(newData)
  })
  return response
}

export const getOtherCurrenciesAmount = async ({ amount, primary, currencyCode }) => {
  const sourceExchangeRate = await getOne({
    model: db.Currency,
    data: { code: currencyCode },
    attributes: ['exchangeRate'],
    raw: true
  })

  if (primary) {
    const primaryCurrency = await getOne({ model: db.Currency, data: { isPrimary: true }, raw: true })
    const conversionRate = parseFloat(sourceExchangeRate.exchangeRate) / primaryCurrency.exchangeRate
    amount = Math.abs((amount * conversionRate).toFixed(2))
    return { amount, conversionRate }
  }

  const targetCurrencies = await getAll({
    model: db.Currency,
    raw: true
  })

  const amountInOtherCurrencies = {}

  targetCurrencies.forEach(currency => {
    const conversionRate = parseFloat(sourceExchangeRate.exchangeRate) / currency.exchangeRate
    amountInOtherCurrencies[currency.code] = Math.abs((amount * conversionRate).toFixed(2))
  })

  return amountInOtherCurrencies
}

export const setLoyaltySequence = (levels) => {
  const returnList = []
  levels.forEach(level => {
    returnList.push({
      level: level.level,
      startPoint: level.startPoint,
      endPoint: level.endPoint,
      cashback_multiplier: level.cashback_multiplier
    })
  })
  return returnList
}

export const getGameAggregatorAndProvider = async ({ game }) => {
  const gameData = await db.MasterCasinoGame.findOne({
    where: { identifier: game },
    attributes: [],
    include: [{
      model: db.MasterCasinoProvider,
      attributes: ['name', 'masterCasinoProviderId'],
      include: [{
        model: db.MasterGameAggregator,
        attributes: ['name']
      }]
    }],
    raw: true
  })
  return { aggregator: gameData['MasterCasinoProvider.MasterGameAggregator.name'], provider: gameData['MasterCasinoProvider.name'], providerId: gameData['MasterCasinoProvider.masterCasinoProviderId'] }
}

export const filterByNameEmailGroup = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [Sequelize.where(Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')), {
      [Op.iLike]: `%${search}%`
    }),
    { email: { [Op.iLike]: `%${search}%` } },
    { group: { [Op.iLike]: `%${search}%` } }]

  }
  return query
}

export const getLiabilityQuery = () => {
  let returnQuery

  const upperQuery = `
  SELECT ROUND(cast(sum(wallet.amount) as numeric),2) as liability, my_user.currency_code as "currencyCode" from public.users as my_user
  JOIN public.wallets as wallet on wallet.owner_id = my_user.user_id AND wallet.owner_type = 'user'
  `

  const lowerQuery = `
  GROUP BY my_user.currency_code
  `

  let middleQuery
  if (middleQuery) returnQuery = upperQuery + middleQuery + lowerQuery
  else returnQuery = upperQuery + lowerQuery

  return returnQuery
}

export const removeByAttr = (arr, attr, value) => {
  let index = arr.length
  while (index--) {
    if (arr[index] && arr[index][attr] === value) {
      arr.splice(index, 1)
    }
  }
  return arr
}

export const removeLogo = (key) => {
  const deleteParams = {
    Bucket: config.get('aws.bucket'),
    Key: key
  }

  s3Client().deleteObject(deleteParams).promise()
}

export const getAllPortalUserIds = async (email, days) => {
  const userIds = []

  const accounts = await getAll({
    model: db.User,
    data: { email },
    attributes: ['userId', 'currencyCode'],
    raw: true
  })

  for (const user of accounts) {
    userIds.push(user.userId)
  }

  return userIds
}

export const getDetails = async ({ currency, country }) => {
  let currencyId, countryName

  if (currency) {
    const details = await getOne({ model: db.Currency, data: { code: currency }, attributes: ['currencyId'] })
    currencyId = details.currencyId
  }

  if (country) {
    const details = await getOne({ model: db.Country, data: { code: country }, attributes: ['name'] })
    countryName = details.name
  }

  return { currencyId, countryName }
}

export const getUserDetails = async ({ userId, transaction = null }) => {
  const userDetails = await getOne({
    model: db.User,
    data: { userId },
    transaction,
    attributes: ['email', 'userId', 'level', 'affiliateStatus'],
    include: [
      { model: db.Wallet, as: 'userWallet' },
      {
        model: db.UserDetails,
        as: 'userDetails',
        attributes: ['documentLabels', 'requestedDocuments']
      }
    ]
  })

  return userDetails
}

export const secureData = ({ data, key }) => {
  return CryptoJS.HmacMD5(data, key).toString(encode)
}

export const filterByLanguageName = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ languageName: { [Op.iLike]: `%${search}%` } }]
  }
  return query
}

export const getDomain = (req) => {
  return req.headers?.origin
}

export const filterByAffiliateName = (query, affiliateName) => {
  affiliateName = affiliateName.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [
      { username: { [Op.iLike]: `%${affiliateName}%` } }]
  }

  return query
}

export const convertInCamelCase = (data) => {
  return _.mapKeys(data, (value, key) => _.camelCase(key))
}

export const filterByTitleCommentEmail = (query, search) => {
  search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } },
    { comment: { [Op.iLike]: `%${search}%` } },
    { commentedBy: { [Op.iLike]: `%${search}%` } }]
  }
  return query
}

export const livePaymentStatus = async ({ userId, userUuid, transactionId }) => {
  try {
    const paymentStatusURL = `${config.get('app.userBackendUrl')}/api/user/live-payment-status`
    const payload = { userId, transactionId, userUuid }
    const token = secureData({ data: payload, key: config.get('microService.accessToken') })

    const response = await axios.post(paymentStatusURL, payload, {
      headers: { 'MICRO-SERVICE-REQUEST-SIGN': token }
    })

    if (response.data.success) return true
    return false
  } catch {
    return false
  }
}

export const updateData = async () => {
  const allGames = await db.MasterCasinoGame.findAll({ attributes: ['moreDetails', 'masterCasinoGameId'] })

  for (const record of allGames) {
    const jsonString = record.moreDetails
    const parsedJson = JSON.parse(jsonString)

    record.moreDetails = parsedJson
    await record.save()
  }
}

export const uploadHuaweiImage = async file => {
  const endpoint = config.get('storageService.url')
  const bucketName = config.get('storageService.bucket')

  const obsClient = new ObsClient({
    access_key_id: config.get('storageService.accessKey'),
    secret_access_key: config.get('storageService.secretKey'),
    server: endpoint,
    signature: 'obs'
  })

  if (!file) {
    return { error: 'No file provided' }
  }

  const objectKey = file.originalname
  const fileName = new Date().getTime() + '_' + objectKey.replace(/ /g, '_')
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: Readable.from(file.buffer),
    ContentType: file.mimetype,
    ACL: obsClient.enums.AclPublicRead
  }

  try {
    await obsClient.putObject(params)
    const documentUrl = `${endpoint}/${bucketName}/${fileName}`
    return {
      documentUrl,
      fileName,
      bucketName,
      status: 1
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const convertArrayToObject = arr => {
  const resultObject = {}

  arr.forEach(obj => {
    const { name, ...rest } = obj

    if (!resultObject[name]) { resultObject[name] = {} }

    Object.assign(resultObject[name], rest)
  })

  return resultObject
}

export const deleteImage = async (key) => {
  const newObsClient = new ObsClient({
    access_key_id: config.get('storageService.accessKey'),
    secret_access_key: config.get('storageService.secretKey'),
    server: config.get('storageService.url')
  })
  const res = await newObsClient.deleteObject({
    Bucket: config.get('storageService.bucket'),
    Key: key
  })
  return res
}

export const addDepositBonus = async (userId, depositCount, addAmount, otherData) => {
  try {
    if (depositCount <= 5) {
      const depositBonus = await db.Bonus.findOne({
        where: { bonusType: BONUS_TYPE.DEPOSIT, isActive: true }
      })
      if (depositBonus) {
        if (depositBonus.dataValues.quantity === null || depositBonus.dataValues.quantity > 0) {
          if (depositBonus.dataValues.validFrom <= new Date() && depositBonus.dataValues.validTo >= new Date()) {
            const currency = await db.Currency.findOne({
              where: { code: 'IDR' }
            })
            const userWallet = await db.Wallet.findOne({
              where: {
                owner_id: userId,
                currencyId: currency.dataValues.currencyId
              },
              include: {
                model: db.Currency,
                as: 'currency',
                attributes: ['code']
              }
            })
            const depositPercentage = depositBonus.dataValues.currency.IDR[depositCount]
            if (depositPercentage) {
              const addDepositAmount = (addAmount * depositPercentage) / 100
              await userWallet.set({ amount: userWallet.amount + addDepositAmount, nonCashAmount: userWallet.nonCashAmount + addDepositAmount }).save()

              const transactionDetails = {
                targetId: userId,
                id: userWallet.id,
                amount: addDepositAmount,
                currencyCode: userWallet.currency.code,
                beforeBalance: userWallet.amount,
                paymentProvider: 'Offline',
                transactionId: uuid(),
                amountType: 0,
                transactionType: TRANSACTION_TYPE.BONUS,
                status: TRANSACTION_STATUS.SUCCESS
              }
              await db.TransactionBanking.create({ ...transactionDetails })
              await db.User.update({ other: { ...otherData, depositBonusCount: depositCount + 1 } }, { where: { userId } })
            } else console.log('Deposit percentage not found', depositPercentage)
          }
        }
      }
    }
    return true
  } catch (error) {
    console.log(error)
    this.addError('addDepositBonusError', error)
  }
}

// Func to create hash for PP
export const calculateHash = (parameters, secretKey) => {
  delete parameters.hash

  const sortedParameters = Object.keys(parameters)
    .sort()
    .map(key => `${key}=${parameters[key]}`)
    .join('&')

  const dataToHash = `${sortedParameters}${secretKey}`
  console.log('dataToHash==', dataToHash)
  const hash = md5(dataToHash)

  return hash
}

export const addDaysInSeconds = (currentTimeInSeconds, days) => {
  const secondsInADay = 86400
  return currentTimeInSeconds + (days * secondsInADay)
}

export function dateOptionsFilter(dateOptions) {
  const today = dayjs().endOf('day')
  const startOfToday = today.startOf('day')
  let fromDate, toDate

  switch (dateOptions) {
    case REPORT_TIME_PERIOD_FILTER.TODAY:
      fromDate = startOfToday.format()
      toDate = today.format()
      break

    case REPORT_TIME_PERIOD_FILTER.YESTERDAY:
      fromDate = startOfToday.subtract(1, 'day')
      toDate = fromDate.endOf('day').format()
      fromDate = fromDate.format()
      break

    case REPORT_TIME_PERIOD_FILTER.LAST_7_DAYS:
      fromDate = startOfToday.subtract(7, 'days').format()
      toDate = today.format()
      break

    case REPORT_TIME_PERIOD_FILTER.LAST_30_DAYS:
      fromDate = startOfToday.subtract(30, 'days').format()
      toDate = today.format()
      break

    case REPORT_TIME_PERIOD_FILTER.LAST_90_DAYS:
      fromDate = startOfToday.subtract(90, 'days').format()
      toDate = today.format()
      break

    case REPORT_TIME_PERIOD_FILTER.WEEK_TO_DATE:
      fromDate = today.startOf('week').format()
      toDate = today.format()
      break

    case REPORT_TIME_PERIOD_FILTER.MONTH_TO_DATE:
      fromDate = today.startOf('month').format()
      toDate = today.format()
      break

    case REPORT_TIME_PERIOD_FILTER.YEAR_TO_DATE:
      fromDate = today.startOf('year').format()
      toDate = today.format()
      break

    case REPORT_TIME_PERIOD_FILTER.PREVIOUS_MONTH:
      fromDate = today.subtract(1, 'month').startOf('month').format()
      toDate = dayjs(fromDate).endOf('month').format()
      break

    case REPORT_TIME_PERIOD_FILTER.PREVIOUS_YEAR:
      fromDate = today.subtract(1, 'year').startOf('year').format()
      toDate = dayjs(fromDate).endOf('year').format()
      break

    // case REPORT_TIME_PERIOD_FILTER.CUSTOM:
    //   if (!fromDate) throw Error('fromDate required')
    //   fromDate = dayjs(fromDate).utc().format()
    //   toDate = toDate ? dayjs(toDate).utc().format() : dayjs().format()
    //   break

    default:
      fromDate = startOfToday.format()
      toDate = today.format()
      break
  }

  return { fromDate, toDate }
}
