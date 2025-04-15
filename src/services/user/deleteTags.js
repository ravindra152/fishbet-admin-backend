import { BaseHandler } from '@src/libs/logicBase'
import { getUserDetails } from '@src/utils/common'
import { INTERNAL_USER_TAG } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'



export class DeleteTagsHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    let { userId, tags } = this.args

    if (typeof (tags) === 'string') tags = JSON.parse(tags)
    tags = new Set(tags)

    const userDetails = await getUserDetails({ userId })

    if (userDetails.tags && userDetails.tags.length) {
      const newTags = userDetails.tags.filter((tag) => {
        return !tags.has(tag)
      })

      if (userDetails.isInternalUser && !newTags.includes(INTERNAL_USER_TAG)) {
        newTags.push(INTERNAL_USER_TAG)
      }

      await userDetails.set({ tags: newTags }).save()
    }

    return { success: true, message: SUCCESS_MSG.DELETE_SUCCESS }
  }
}
