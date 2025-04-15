import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class CreateNotificationHandler extends BaseHandler {
    get constraints() {
        return constraints
    }

    async run() {
        let { title, content } = this.args
        const transaction = this.context.sequelizeTransaction

        await db.Notification.update(
            { isActive: false },
            {
                where: { isActive: true },
                transaction,
            }
        )

        const notification = await db.Notification.create({
            title,
            content,
        }, { transaction })

        return { notification, message: SUCCESS_MSG.UPDATE_SUCCESS }
    }
}