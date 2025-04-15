'use strict'

const { COINS } = require("@src/utils/constants/public.constants")

module.exports = {
  async up(queryInterface, DataTypes) {
    const users = Array.from({ length: 10 }, (_, index) => ({
      username: `demo-user-${index + 1}`,
      first_name: `Demo`,
      last_name: `User-${index + 1}`,
      email: `demouser${index + 1}@gmail.com`,
      is_email_verified: true,
      password: '$2b$12$GUcThczmOUCuhcIjbrpl2u.yvvfSw0jdP2uCvQCEQN2rQwFpuC3Gu',
      phone: `39393939${index + 1}`,
      date_of_birth: new Date(),
      is_active: true,
      // country_code: 'tgt_admin',
      last_login_date: new Date(),
      phone_code: 'tgt_admin',
      city: 'tgt_admin',
      profile_image: 'tgt_admin',
      currency_code: '+91',
      is_internal_user: true,
      ref_parent_id: 133,
      referral_code: `REF${1000 + index}`,
      other: JSON.stringify({ EN: 'FAQ' }),
      created_at: new Date(),
      updated_at: new Date(),
    }))

    await queryInterface.bulkInsert('users', users)

    const [createdUsers] = await queryInterface.sequelize.query(
      `SELECT user_id FROM users WHERE username LIKE 'demo-user-%';`
    )
    if (createdUsers.length > 0) {
      const wallets = []
      createdUsers.forEach(user => {
        [COINS.GOLD_COIN,
        COINS.SWEEP_COIN.BONUS_SWEEP_COIN,
        COINS.SWEEP_COIN.PURCHASE_SWEEP_COIN,
        COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN
        ].forEach(currency => {
          wallets.push({
            user_id: user.user_id,
            currency_code: currency,
            balance: 500, // Default balance
            created_at: new Date(),
            updated_at: new Date(),
          })
        })
      })
      await queryInterface.bulkInsert('wallets', wallets)
    }
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete('wallets', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
}
