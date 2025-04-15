import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { pageValidation } from '@src/utils/common'
import { Op, Sequelize } from 'sequelize'

export class GetNotificationsHandler extends BaseHandler {

    async run() {
        const { limit, pageNo, isActive, search } = this.args

        const { page, size } = pageValidation(pageNo, limit)
        let query = {}

        if (search) {

            query[`title`] = search
        }

        const notifications = await db.Notification.findAndCountAll({
            where: { ...query },
            limit: size,
            offset: ((page - 1) * size),
            order: [['createdAt', 'DESC']]
        })

        return { notifications }
    }
}