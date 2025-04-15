import sgMail from '@sendgrid/mail'
import config from '@src/configs/app.config'
import db from '@src/db/models'
import { getOne } from '@src/services/helper/crud'
import { decodeCredential } from '@src/utils/common'
import { EMAIL_DYNAMIC_OPTIONS, EMAIL_TEMPLATE_PRIMARY_STATUS, EMAIL_TEMPLATE_TYPES } from '@src/utils/constant'
import { ERROR_MSG } from '@src/utils/errors'
import { SUCCESS_MSG } from '@src/utils/success'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import encode from 'crypto-js/enc-hex'
import getSymbolFromCurrency from 'currency-symbol-map'
import { Parser } from 'json2csv'
import mailjet from 'node-mailjet'

// const emailConfig = {
//   apiKey: config.get('mailGun.apiKey'),
//   domain: config.get('mailGun.domain')
// }

import formData from 'form-data'
import Mailgun from 'mailgun.js'

export const sendMail = async ({ user, credentials, subject, successMsg, dynamicEmail, senderName }) => {
  sgMail.setApiKey(credentials.apiKey)

  const msg = {
    to: {
      Email: user.email,
      Name: user.username
    },
    from: {
      Email: credentials.apiEmail,
      Name: senderName
    },
    subject,
    html: dynamicEmail
  }

  await sgMail.send(msg)
  return { success: true, message: successMsg }
}

export const sendMailRaw = async ({ email, credentials, dataValues, templateCode, successMsg }) => {
  if (Object.keys(credentials).length !== 2) return { success: false, message: ERROR_MSG.SENDGRID_CREDENTIALS }

  sgMail.setApiKey(credentials.apiKey)

  const msg = {
    to: email,
    from: credentials.apiEmail,
    subject: dataValues?.subject || 'Default Subject',
    text: dataValues?.subject || 'Default Subject',
    html: templateCode
  }

  await sgMail.send(msg)
  return { success: true, message: successMsg }
}

export const sendDynamicMail = async ({ user, credentials, subject, successMsg, dynamicEmail, senderName }) => {
  const sendEmailObj = {
    from: {
      Email: config.get('email.senderEmail'),
      Name: senderName || 'GS Casino'
    },
    To: [
      {
        Email: user.email,
        Name: user?.username || user?.adminUsername
      }
    ],
    Subject: subject || 'Test Email',
    HTMLPart: dynamicEmail
  }

  const mailjetEmail = mailjet.apiConnect(config.get('email.mailjetApiKey'), config.get('email.mailjetSecretKey'))

  const request = await mailjetEmail
    .post('send', { version: 'v3.1' })
    .request({ Messages: [sendEmailObj] })

  if (request.response.status === 200) return { success: true, code: request.response.status, message: successMsg }
  else return { success: false, code: request.response.status }
}
export const sendDynamicEmail = async ({ recieverEmail, subject, text, dynamicEmail, successMsg }) => {
  const API_KEY = config.get('mailGun.apiKey')
  const DOMAIN = config.get('mailGun.domain')
  const senderEmail = config.get('mailGun.senderEmail')

  const mailgun = new Mailgun(formData)
  const client = mailgun.client({ username: 'api', key: API_KEY })

  const messageData = {
    from: senderEmail,
    to: recieverEmail,
    subject: subject,
    text: text || 'Testing some Mailgun awesomeness...',
    html: dynamicEmail
  }

  const res = await client.messages.create(DOMAIN, messageData)
  return { success: successMsg, message: res }
}

export const getSendGridCredentials = async () => {
  const credentials = {}

  const superadminCredentials = await db.GlobalSetting.findAll({
    attributes: ['key', 'value'],
    where: { key: ['SENDGRID'] },
    raw: true
  })
  superadminCredentials.forEach(credential => {
    if (credential.value.SENDGRID_API_KEY) credentials.apiKey = decodeCredential(credential.value.SENDGRID_API_KEY)
    if (credential.value.SENDGRID_EMAIL) credentials.apiEmail = decodeCredential(credential.value.SENDGRID_EMAIL)
  })

  return credentials
}

export const convertToCsv = ({ fields, data }) => {
  const json2csv = new Parser({ fields })
  const csv = json2csv.parse(data)
  return csv
}

export const getCsvFileName = ({ file, userName }) => {
  let fileName = `${file}_${new Date().toISOString().substring(0, 10)}`
  if (userName) fileName = fileName + '_' + userName

  fileName = fileName + '.csv'
  return fileName
}

export const getXlsFileName = () => {
  let fileName = `Language_Sheet_${new Date().toISOString().substring(0, 10)}`
  fileName = fileName + '.xls'

  return fileName
}

export const createEmailTemplateData = (data) => {
  if (data.length === 0) return {}
  const returnObject = {}

  data.forEach(template => {
    if (!returnObject[EMAIL_TEMPLATE_TYPES.INT_TO_VALUE[template?.type]]) returnObject[EMAIL_TEMPLATE_TYPES.INT_TO_VALUE[template?.type]] = []
    returnObject[EMAIL_TEMPLATE_TYPES.INT_TO_VALUE[template?.type]].push(template)
  })

  return returnObject
}

export const insertDynamicDataInTemplate = ({ template, dynamicData }) => {
  let returnEmail = template

  Object.keys(dynamicData).forEach(dynamicKey => {
    const pattern = new RegExp(`{{{ *${dynamicKey} *}}}`, 'g')
    returnEmail = returnEmail.replaceAll(pattern, dynamicData[dynamicKey])
  })

  return returnEmail
}

export const getEmailDynamicKeys = () => {
  const returnList = []
  EMAIL_DYNAMIC_OPTIONS.forEach(option => {
    returnList.push(option.key)
  })
  return returnList
}

export const getDynamicData = async ({ userId, currentDataList }) => {
  const siteDetail = (await getOne({
    model: db.GlobalSetting,
    data: { key: 'SITE_INFORMATION' },
    attributes: ['value'],
    raw: true
  })).value

  const userDetails = await getOne({
    model: db.User,
    data: { userId },
    include: [
      { model: db.Wallet, as: 'userWallet' }
    ]
  })

  const dynamicData = {
    siteName: siteDetail.name,
    siteLogo: `${config.get('storageHandler.imageUrl')}/${siteDetail.logo}`,
    siteUrl: siteDetail.url,
    playerEmail: userDetails.email,
    playerFullName: userDetails.username,
    playerFirstName: userDetails.firstName || userDetails.username,
    playerLastName: userDetails.lastName || '',
    userName: userDetails.username,
    // walletAmountTotal: parseFloat((userDetails.userWallet.amount + userDetails.userWallet.nonCashAmount).toFixed(2)),
    // walletAmountBonus: parseFloat(userDetails.userWallet.nonCashAmount.toFixed(2)),
    // walletAmountReal: parseFloat(userDetails.userWallet.amount.toFixed(2)),
    siteLoginUrl: `${siteDetail.url}/login`,
    sendSupportRequestRoute: `${siteDetail.url}/support-mail`,
    playerCurrencySymbol: getSymbolFromCurrency(userDetails.currencyCode),
    subject: '-',
    reason: '-',
    link: '-',
    withdrawAmount: '-',
    depositAmount: '-',
    transactionId: '-',
    supportEmailAddress: '-',
    kycLabels: '-',
    newPassword: '-',
    currentYear: (new Date()).getFullYear()
  }

  return { ...dynamicData, ...currentDataList }
}

export const createEmailWithDynamicValues = async ({ emailType, userId, serviceData, language }) => {
  let dynamicData = { ...serviceData }
  let templateDetails

  templateDetails = await db.EmailTemplate.findOne({
    where: { type: emailType, isPrimary: EMAIL_TEMPLATE_PRIMARY_STATUS.PRIMARY },
    raw: true
  })

  if (!templateDetails) {
    templateDetails = await db.EmailTemplate.findOne({
      where: { isDefault: true, type: emailType },
      raw: true
    })
  }

  dynamicData = {
    ...await getDynamicData({ userId, dataList: templateDetails.dynamicData, currentDataList: dynamicData })
  }

  const emailData = insertDynamicDataInTemplate({ template: templateDetails.templateCode[language] || templateDetails.templateCode.EN, dynamicData })

  return emailData
}

export const secureData = ({ data, key }) => {
  return CryptoJS.HmacMD5(data, key).toString(encode)
}

export const liveUpdateWallet = async ({ userId, userUuid, cash, nonCash, wagering, wageredAmount, level, loyaltyPoints, amountToWager, wageringStatus }) => {
  const updateWalletURL = `${config.get('app.userBackendUrl')}/api/user/live-update-wallet`
  const payload = { userId, userUuid, cash, nonCash, wagering, wageredAmount, level, loyaltyPoints, wageringStatus, amountToWager }
  const token = secureData({ data: payload, key: config.get('microHandler.accessToken') })

  const response = await axios.post(updateWalletURL, payload, {
    headers: { 'MICRO-SERVICE-REQUEST-SIGN': token }
  })

  if (response.data.success) return true
  return false
}
export const setEmailKeyDescription = (EmailKeysList) => {
  const returnObject = {}

  EmailKeysList.forEach((dynamicKey) => {
    returnObject[dynamicKey.key] = dynamicKey.description
  })

  return returnObject
}

export const sendEmail = async ({ user, emailTemplate, data, message }) => {
  const dynamicEmail = await createEmailWithDynamicValues({
    language: user.locale || 'EN',
    emailType: EMAIL_TEMPLATE_TYPES.VALUE_T0_INT[emailTemplate],
    userId: user.userId,
    serviceData: { ...data }
  })

  const emailSent = await sendDynamicEmail({
    recieverEmail: user.email,
    subject: data.subject,
    text: 'mailGun testing...',
    successMsg: message || SUCCESS_MSG.EMAIL_SUCCESS,
    dynamicEmail
  })

  return emailSent

  // return false
}





export async function sendEmailByMailjet({ user, data, emailTemplate, senderEmail, senderName, recieverEmail }) {
  try {
    const Mailjet = new mailjet({
      apiKey: config.get('email.mailjetApiKey'),
      apiSecret: config.get('email.mailjetSecretKey'),
      options: {
        timeout: 5000
      }
    })

    const response = await Mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: senderEmail,
            Name: senderName
          },
          To: [{
            Email: (user?.email || recieverEmail),
            Name: (user?.username || 'demo user')
          }],
          Subject: (data?.subject || 'Default Subject'),
          HTMLPart: emailTemplate,
          TextPart: (emailTemplate || " testing jet mail"),
        }
      ]
    })
    return response.response.status === 200
  } catch (error) {
    return error
  }
}




export const sendMailjetEmail = async ({ user, emailTemplate, data, message, recieverEmail }) => {

  // const dynamicEmail = await createEmailWithDynamicValues({
  //   language: user.locale || 'EN',
  //   emailType: EMAIL_TEMPLATE_TYPES.VALUE_T0_INT[emailTemplate],
  //   userId: user.userId,
  //   serviceData: { ...data }
  // })
  // recieverEmail: testEmail,
  // user: userObj,
  // emailTemplate:emailBodyRaw 

  const emailSent = await sendEmailByMailjet({
    user,
    data,
    emailTemplate: emailTemplate,
    recieverEmail: recieverEmail,
    senderName: config.get('email.senderName'),
    senderEmail: config.get('email.senderEmail'),
  })

  return emailSent
}

