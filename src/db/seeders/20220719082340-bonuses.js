'use strict'

import { BONUS_STATUS, BONUS_TYPE } from '@src/utils/constants/bonus.constants'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('bonuses', [
      {
        bonus_type: BONUS_TYPE.WELCOME,
        promotion_title: 'Welcome Bonus',
        gc_amount: 1000,
        sc_amount: 5,
        status: BONUS_STATUS.ACTIVE,
        description: 'Receive 1000 GC & 5 SC coins on registration.',
        terms_conditions: `
          <ul>
            <li><strong>Validity:</strong> Receive 1000 GC & 5 SC coins on registration.</li>
            <li><strong>Eligibility:</strong> Available to new users only.</li>
          </ul>
        `,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        bonus_type: BONUS_TYPE.FIRST_PURCHASE,
        promotion_title: 'First Purchase Bonus',
        gc_amount: 100,
        sc_amount: 5,
        status: BONUS_STATUS.ACTIVE,
        description: 'Get a 100 GC + 5 SC coins on your first deposit.',
        terms_conditions: `
          <ul>
            <li><strong>Bonus:</strong> 100% match up to $100</li>
            <li><strong>Minimum purchase Amount:</strong> $10</li>
            <li><strong>Wagering Requirement:</strong> Wagering must be completed 2X times the bonus amount before withdrawal.</li>
          </ul>
        `,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        bonus_type: BONUS_TYPE.SECOND_PURCHASE,
        promotion_title: 'Second Purchase Bonus',
        gc_amount: 10,
        sc_amount: 5,
        status: BONUS_STATUS.ACTIVE,
        description: 'Get a 500 GC + 8 SC coins on your second Purchase.',
        terms_conditions: `
          <ul>
            <li><strong>Bonus:</strong> 50% match up to $100</li>
            <li><strong>Minimum purchase Amount:</strong> $20</li>
            <li><strong>Validity:</strong> Must be claimed within 14 days of the second purchase.</li>
            <li><strong>Wagering Requirement:</strong> Wagering must be completed x2 times the bonus amount before withdrawal.</li>
            <li><strong>Maximum Payout:</strong> The maximum bonus amount that can be won is $100.</li>
          </ul>
        `,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        bonus_type: BONUS_TYPE.THIRD_PURCHASE,
        promotion_title: 'Third Purchase Bonus',
        gc_amount: 10,
        sc_amount: 5,
        status: BONUS_STATUS.ACTIVE,
        description: 'Get a 1000 GC + 10 SC coins on your third Purchase.',
        terms_conditions: `
          <ul>
            <li><strong>Bonus:</strong> 25% match up to $50</li>
            <li><strong>Minimum purchase Amount:</strong> $30</li>
            <li><strong>Wagering Requirement:</strong> Wagering must be completed 2X times the bonus amount before withdrawal.</li>
            <li><strong>Maximum Payout:</strong> The maximum bonus amount that can be won is $50.</li>
          </ul>
        `,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        bonus_type: BONUS_TYPE.REFERRAL,
        promotion_title: 'Referral Bonus',
        gc_amount: 10,
        sc_amount: 5,
        status: BONUS_STATUS.ACTIVE,
        description: 'Earn $20 for referring a friend.',
        terms_conditions: `
          <ul>
            <li><strong>Bonus:</strong> $20 for each referred friend</li>
            <li><strong>Eligibility:</strong> Friend must make a purchase for you to receive the bonus.</li>
            <li><strong>Wagering Requirement:</strong> Bonus amount must be wagered 2X before withdrawal.</li>
          </ul>
        `,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bonuses', null, {})
  }
}
