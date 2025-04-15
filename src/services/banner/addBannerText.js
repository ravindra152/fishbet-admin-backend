import db from '@src/db/models'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'


export class AddBannerTextHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { userId, data } = this.args

    if (!data.en && !data.EN) return { success: false, message: 'Data should contain text for English (EN) language.' }
    const userData = await getOne({
      model: db.User,
      data: { userId },
      attributes: ['userId'],
      include: [
        {
          model: db.UserDetails,
          as: 'userDetails',
          attributes: ['bannerText', 'id']
        }
      ]
    })

    if (userData) {
      const formattedData = Object.keys(data).reduce((obj, key) => {
        const keyName = key.toUpperCase()
        obj[keyName] = data[key]
        return obj
      }, {})

      await userData.userDetails.set({ bannerText: formattedData }).save()
    }
    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
