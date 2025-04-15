import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import db from '@src/db/models'
import { SUCCESS_MSG } from '@src/utils/success'
import { pageValidation } from '@src/utils/common'

export class GetPostalCodeRequestsHandler extends BaseHandler {
    async run() {
        const { userId, status, limit = 10, pageNo = 1 } = this.args
        const { page, size } = pageValidation(pageNo, limit)

        // Build the filter
        const filter = {}
        if (userId) filter.userId = userId
        if (status) filter.status = status

        const postalCodeRequests = await db.PostalCode.findAndCountAll({
            where: filter,
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['username', 'userId', 'firstName', 'profileImage'],
                },
            ],
            limit: size,
            offset: (page - 1) * size,
            order: [['createdAt', 'DESC']],
        })

        return {
            postalCodeRequests,
            message: SUCCESS_MSG.GET_SUCCESS,
        }
    }
}
