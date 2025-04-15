import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'


export class ToggleCasinoAggregator extends BaseHandler {
    async run() {
        const { casinoAggregatorId } = this.args
        const transaction = this.context.sequelizeTransaction

        try {
            const casinoAggregator = await db.CasinoAggregator.findOne({
                where: { id: casinoAggregatorId },
                transaction
            })
            casinoAggregator.isActive = !casinoAggregator.isActive
            await casinoAggregator.save({ transaction })
            return { success: true }
        }
        catch (error) {
            return this.handleError(error)
        }
    }
}
