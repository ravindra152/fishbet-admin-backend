import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'

export class UpdateSiteInformationHandler extends BaseHandler {
  async run() {
    const { name, url, supportEmail, maintenance, logo, lang } = this.args

  console.log("logo>>>>" ,logo )
    let languages = lang
    let value
    const siteInfo = await db.GlobalSetting.findOne({ where: { key: 'SITE_INFORMATION' } })
    console.log("siteInfo>>>>" ,siteInfo)
    value = siteInfo.value

    if (name) value = { ...value, name }
    if (url) value = { ...value, url }
    if (supportEmail) value = { ...value, supportEmail }
    if (maintenance) value = { ...value, maintenance: JSON.parse(maintenance) }

    if (logo) {
      console.log("++++++++" , logo)
      const data = await uploadFile(logo.buffer, {
        name: logo.originalname,
        mimetype: logo.mimetype,
        filePathInS3Bucket: S3_FILE_PREFIX.siteLogo
      })
      console.log(data.location, "=========================")
      value = { ...value, logo: data.location }
    }

    if (lang && value.languages) {
      const language = JSON.parse(lang)
      languages = { ...value.languages, ...language }
      value = { ...value, languages }
    }

    siteInfo.value = value
    await siteInfo.save()

    return { siteInfo, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
