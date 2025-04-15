
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { getUserDetails } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'

export class AddTagsHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    let { userId, tags, customTag } = this.args

    if (typeof (tags) === 'string') tags = JSON.parse(tags)
    tags = [...new Set(tags)]

    const userDetails = await getUserDetails({ userId })

    await userDetails.set({ tags }).save()

    if (customTag) {
      const globalSetting = await db.GlobalSetting.findOne({ where: { key: 'TAGS' } })
      const tagsList = globalSetting.value
      let newValues = tags
      if (tagsList.value) newValues = [...new Set([...tagsList.value, ...tags])]
      globalSetting.value = JSON.stringify(newValues)
      await globalSetting.save()
    }

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
