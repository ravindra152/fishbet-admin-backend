import { BaseHandler } from '@src/libs/logicBase'
import { insertDynamicDataInTemplate, sendDynamicEmail, sendDynamicMail, sendMailjetEmail } from '@src/services/helper/email' // getSendGridCredentials, sendMail
import ajv from '@src/libs/ajv'

const schema = {
  type: 'object',
  properties: {
    testEmail: { type: ['string', 'null'] },
    templateCode: { type: ['string', 'null'] },
    dynamicData: { type: 'object' }
  },
  required: ['templateCode', 'testEmail', 'dynamicData']
}


export class TestEmailTemplateHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { templateCode, testEmail, dynamicData } = this.args

    const emailBodyRaw = insertDynamicDataInTemplate({ template: Buffer.from(templateCode, 'BASE64').toString('utf8'), dynamicData })

    // const emailSent = await sendDynamicEmail({
    //   // user: { email: testEmail, username: 'Test Username' },
    //   recieverEmail: testEmail,
    //   subject: 'Default Subject',
    //   text: 'mailGun testing...',
    //   dynamicEmail: emailBodyRaw
    // })

    const emailSent = await sendMailjetEmail({
      recieverEmail: testEmail,
      // user: userObj,
      emailTemplate: emailBodyRaw, // EMAIL_TEMPLATE_TYPES.EMAIL_VERIFICATION,
      // data: {
      //   link: `OTP: ${otp}`,
      //   subject: EMAIL_SUBJECTS[userObj.locale]?.verification || EMAIL_SUBJECTS.EN.verification,
      //   body: `${EMAIL_TEMPLATE_TYPES.OTP_VERIFICATION}: ${otp}`
      // },
      // message: SUCCESS_MSG.EMAIL_SENT
    })
    return { emailSent }
  }
}
