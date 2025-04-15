import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'


export class ToggleCasinoGameHandler extends BaseHandler {
   async run() {
      const { casinoGameId } = this.args
      const transaction = this.context.sequelizeTransaction

      try {
         const game = await db.CasinoGame.findOne({
            where: { id: casinoGameId },
            transaction
         })
         game.isActive = !game.isActive
         await game.save({ transaction })
         return { success: true }
      }
      catch (error) {
         return this.handleError(error)
      }
   }
}
