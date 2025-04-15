import { BaseHandler } from '@src/libs/logicBase'
import initialize from '../../../../scripts/transactionSeeder'
import db from '@src/db/models'

export class PopulateDummyDataHandler extends BaseHandler {
   async run() {
      await initialize()
      await db.sequelize.query('REFRESH MATERIALIZED VIEW user_stats;')
      return { success: true }

   }
}
