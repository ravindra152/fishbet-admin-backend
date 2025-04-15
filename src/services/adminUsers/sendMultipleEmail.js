import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { getAll } from '@src/services/helper/crud'
import { EMAIL_SUBJECTS, EMAIL_TEMPLATE_TYPES, SUBJECT_TYPE } from '@src/utils/constant'
import { sendEmail } from '@src/services/helper/email'
import jwt from 'jsonwebtoken'
import config from '@src/configs/app.config'

const schema = {
  type: 'object',
  properties: {
    userIds: { type: 'array' },
    templateType: {
      type: 'string'
    }
  },
  required: ['userIds', 'templateType']
}



export class SendMultipleEmailHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { userIds, templateType } = this.args

    const userExists = await getAll({
      model: db.User,
      data: { userId: { [db.Sequelize.Op.in]: userIds } },
      attributes: ['userId', 'email', 'locale', 'isEmailVerified', 'uniqueId', 'username']
    })

    if (!userExists || !userExists.length) throw new AppError(Errors.USER_NOT_EXISTS)
    if (!EMAIL_TEMPLATE_TYPES[templateType]) throw new AppError(Errors.EMAIL_TEMPLATE_NOT_FOUND)

    const origin = config.get('app.siteUrl')

    userExists.map(async (user) => {
      if (templateType === 'EMAIL_VERIFICATION') {
        const emailToken = jwt.sign({ userId: userExists.uniqueId }, config.get('jwt.emailTokenKey'), { expiresIn: config.get('jwt.emailTokenExpiry') })

        const mailSent = await sendEmail({
          user: user,
          emailTemplate: EMAIL_TEMPLATE_TYPES[templateType],
          data: {
            link: `${origin}/verify-email?emailToken=${emailToken}`,
            subject: (user.locale) ? EMAIL_SUBJECTS[user.locale][SUBJECT_TYPE.templateType] || EMAIL_SUBJECTS.EN[SUBJECT_TYPE[templateType]] : EMAIL_SUBJECTS.EN[SUBJECT_TYPE[templateType]]
          }
        })

        if (mailSent.message.status === 200) {
          await db.User.update({
            emailToken: emailToken
          }, {
            where: { userId: user.userId }
          })
        }
      } else if (templateType === 'RESET_PASSWORD') {
        const newPasswordKey = jwt.sign({
          userId: userExists.uniqueId
        }, config.get('jwt.resetPasswordKey'), { expiresIn: config.get('jwt.resetPasswordExpiry') })

        const mailSent = await sendEmail({
          user: user,
          emailTemplate: EMAIL_TEMPLATE_TYPES[templateType],
          data: {
            link: `${origin}/reset-password?newPasswordKey=${newPasswordKey}`,
            subject: (user.locale) ? EMAIL_SUBJECTS[user.locale][SUBJECT_TYPE.templateType] || EMAIL_SUBJECTS.EN[SUBJECT_TYPE[templateType]] : EMAIL_SUBJECTS.EN[SUBJECT_TYPE[templateType]]
          }
        })
        if (mailSent.message.status === 200) {
          await db.UserDetails.update({
            newPasswordKey, newPasswordRequested: new Date()
          }, {
            where: { userId: user.userId }
          })
        }
      } else {
        const mailSent = await sendEmail({
          user: user,
          emailTemplate: EMAIL_TEMPLATE_TYPES[templateType],
          data: { subject: (user.locale) ? EMAIL_SUBJECTS[user.locale][SUBJECT_TYPE.templateType] || EMAIL_SUBJECTS.EN[SUBJECT_TYPE[templateType]] : EMAIL_SUBJECTS.EN[SUBJECT_TYPE[templateType]] }
        })
      }
    })

    return { response: true, message: SUCCESS_MSG.EMAIL_SUCCESS }
  }
}
