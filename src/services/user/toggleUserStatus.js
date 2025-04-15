import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'

const schema = {
  type: 'object',
  properties: {
    userId: { type: 'string' }
  },
  required: ['userId', 'user']
}


export class ToggleUserStatusHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const userId = this.args.userId
    try {
      const user = await db.User.findOne({
        where: { userId },
      })
      user.isActive = !user.isActive
      await user.save()
      return { success: true }
    }
    catch (error) {
      return this.handleError(error)
    }
  }
}
