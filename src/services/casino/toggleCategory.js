import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'


export class ToggleCasinoCategoryHandler extends BaseHandler {
    async run() {
        const { casinoCategoryId } = this.args
        const transaction = this.context.sequelizeTransaction

        try {
            const casinoCategory = await db.CasinoCategory.findOne({
                where: { id: casinoCategoryId },
                transaction
            })
            casinoCategory.isActive = !casinoCategory.isActive
            await casinoCategory.save({ transaction })
            return { success: true }
        }
        catch (error) {
            return this.handleError(error)
        }
    }
}
