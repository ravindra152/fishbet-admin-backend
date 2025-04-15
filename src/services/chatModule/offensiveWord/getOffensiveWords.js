import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { filterByDateCreatedAt, filterByWord, pageValidation } from "@src/utils/common";
import { SUCCESS_MSG } from "@src/utils/success";
import _ from "lodash";

export default class GetOffensiveWordsService extends BaseHandler {
    async run() {
        const { pageNo, limit, search, startDate, endDate } = this.args
        let query = {}
        const { page, size } = pageValidation(pageNo, limit)
        if (search) query = filterByWord(query, search)
        if (startDate || endDate) query = filterByDateCreatedAt(query, startDate, endDate, 'OffensiveWord')
        const filterCondition = _.omitBy(query, _.isNil)
        const offensiveWords = await db.OffensiveWord.findAndCountAll({
            where: filterCondition,
            order: [['id', 'desc']],
            limit: size,
            offset: ((page - 1) * size)
        })
        return { offensiveWords: offensiveWords.rows, page, totalPages: Math.ceil(offensiveWords.count / size), message: SUCCESS_MSG.GET_SUCCESS }
    }
}
