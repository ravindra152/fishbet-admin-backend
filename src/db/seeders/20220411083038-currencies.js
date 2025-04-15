'use strict'

import { COINS } from "@src/utils/constants/public.constants"

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert('currencies', [
      {
        name: 'Gold Coins',
        code: COINS.GOLD_COIN,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bonus Sweeps Coins',
        code: COINS.SWEEP_COIN.BONUS_SWEEP_COIN,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Purchased Sweeps Coins',
        code: COINS.SWEEP_COIN.PURCHASE_SWEEP_COIN,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Redeemable Sweeps Coins',
        code: COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete('currencies', null, {})
  }
}
