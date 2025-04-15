import db from "@src/db/models";
import { AppError } from "@src/errors/app.error";
import { Errors } from "@src/errors/errorCodes";
import { BaseHandler } from "@src/libs/logicBase";
import { SUCCESS_MSG } from "@src/utils/success";

export default class DeleteOffensiveWordService extends BaseHandler {
    async run() {
        const transaction = this.context.sequelizeTransaction
        const { id } = this.args
        const checkWord = await db.OffensiveWord.findByPk(id)
        if (!checkWord) throw new AppError(Errors.OFFENSIVE_WORD_NOT_FOUND)
        await db.OffensiveWord.destroy({ where: { id } }, { transaction })
        return { message: SUCCESS_MSG.DELETE_SUCCESS }
    }
}