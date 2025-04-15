const { TRANSACTION_STATUS } = require("@src/utils/constant")
const {
   LEDGER_TRANSACTION_TYPES,
   LEDGER_TYPES,
   TRANSACTION_PURPOSE,
   CASINO_TRANSACTION_PURPOSE,
   LEDGER_DIRECTIONS,
   COINS,
   WITHDRAWAL_STATUS
} = require("@src/utils/constants/public.constants")
import { Faker, es } from '@faker-js/faker'
import db from '@src/db/models'
import { MathPrecision } from '@src/libs/mathOperation'
import { v4 as uuid } from 'uuid'
const customFaker = new Faker({ locale: [es] })
const dayjs = require('dayjs');


/**
 * Adjust wallet balance and create a ledger entry.
 * @param {Object} wallet - Wallet object.
 * @param {Number} amount - Amount to adjust.
 * @param {String} purpose - Transaction purpose.
 * @param {String} transactionId - Transaction ID.
 */
async function updateWalletAndLedger(wallet, amount, purpose, transactionId, transactionType, code, date) {
   const direction = LEDGER_DIRECTIONS[purpose]
   if (direction === LEDGER_TYPES.CREDIT) {
      wallet.balance = MathPrecision.plus(wallet.balance, amount)
   } else if (direction === LEDGER_TYPES.DEBIT) {
      if (wallet.balance < amount) return // Skip if insufficient balance
      wallet.balance = MathPrecision.minus(wallet.balance, amount)
   } else return

   await db.TransactionLedger.create({
      transactionId,
      transactionType: transactionType,
      walletId: wallet.id,
      amount,
      currencyCode: code,
      direction: direction,
      createdAt: date,
      updatedAt: date
   })

   await wallet.save()
}

/**
 * Create a casino transaction and update wallets.
 * @param {Array<String>} codes - Wallet currency codes.
 * @param {String} gameId - Casino game ID.
 * @param {String} purpose - Transaction purpose.
 * @param {Number} userId - User ID.
 */
async function createCasinoTxn(codes, gameId, purpose, userId, amountRange, date) {
   const casinoTransaction = await db.CasinoTransaction.create({
      userId,
      transactionId: uuid(),
      casinoGameId: gameId,
      gameRoundId: gameId,
      actionType: purpose,
      status: TRANSACTION_STATUS.SUCCESS,
      createdAt: date,
      updatedAt: date,
      moreDetails: {
         betAmount: 100,
         currency: 'USD',
         betType: 'single',
      },
   })

   for (const code of codes) {
      const wallet = await db.Wallet.findOne({ where: { currencyCode: code } })
      const amount = customFaker.number.float({ min: amountRange.min, max: amountRange.max })

      if (wallet) {
         await updateWalletAndLedger(wallet, amount, purpose, casinoTransaction.id, LEDGER_TRANSACTION_TYPES.CASINO, code, date)
      }
   }
}

/**
 * Create a generic transaction and update wallets.
 * @param {Array<String>} codes - Wallet currency codes.
 * @param {String} purpose - Transaction purpose.
 * @param {Number} userId - User ID.
 */
async function createTxn(codes, purpose, userId, amountRange, date) {
   const transactionBankng = await db.Transaction.create({
      userId,
      // transactionId: uuid(),
      purpose,
      status: TRANSACTION_STATUS.SUCCESS,
      createdAt: date,
      updatedAt: date
   })

   for (const code of codes) {
      const wallet = await db.Wallet.findOne({ where: { currencyCode: code } })
      const amount = customFaker.number.float({ min: amountRange.min, max: amountRange.max })

      if (wallet) {
         await updateWalletAndLedger(wallet, amount, purpose, transactionBankng.transactionId, LEDGER_TRANSACTION_TYPES.BANKING, code, date)
      }
   }
}


/**
 * Create a generic transaction and update wallets.
 * @param {Array<String>} codes - Wallet currency codes.
 * @param {String} purpose - Transaction purpose.
 * @param {Number} userId - User ID.
 */
async function createWithdrawalRequests(code, purpose, userId, amountRange, date) {
   const amount = customFaker.number.float({ min: amountRange.min, max: amountRange.max })
   const withdrawalRequest = await db.Withdrawal.create(
      {
         userId, amount, status: WITHDRAWAL_STATUS.PENDING, createdAt: date,
         updatedAt: date
      })

   const wallet = await db.Wallet.findOne({ where: { currencyCode: code } })

   if (wallet) {
      await updateWalletAndLedger(wallet, amount, purpose, withdrawalRequest.id, LEDGER_TRANSACTION_TYPES.WITHDRAW, code, date)
   }

}


/**
 * Generate a random date within the last 3 months.
 * @returns {string} A random date in the format 'YYYY-MM-DD HH:mm:ss'.
 */
function getRandomDateLast3Months() {
   // Random number of days within the last 90 days
   const randomDays = Math.floor(Math.random() * 7);
   return dayjs().subtract(randomDays, 'day').format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Generate a set of unique random dates (at least 30 days) within the last 3 months.
 * @returns {Array} Array of unique date strings within the last 3 months.
 */
function getUniqueRandomDates() {
   const dates = new Set();
   while (dates.size < 5) {
      // Generate a random date within the last 3 months and add to the set
      const randomDate = getRandomDateLast3Months().slice(0, 10); // Get only the date part (YYYY-MM-DD)
      dates.add(randomDate);
   }
   return Array.from(dates);
}


/**
 * Initialize demo transactions for users.
 */
async function initialize() {
   const [createdUsers] = await db.sequelize.query(
      `SELECT user_id FROM users`
   )

   for (const user of createdUsers) {
      const casinoGameId = customFaker.helpers.arrayElement(
         (await db.CasinoGame.findAll()).map(game => game.id)
      )

      // Generate 30 unique random dates for the user within the last 3 months
      const randomDates = getUniqueRandomDates();
      console.log("======================================================================>")
      for (const randomDate of randomDates) {
         const date = dayjs(randomDate).format('YYYY-MM-DD HH:mm:ss');


         // Generic transactions
         await createTxn(
            [COINS.SWEEP_COIN.PURCHASE_SWEEP_COIN, COINS.GOLD_COIN],
            TRANSACTION_PURPOSE.PURCHASE,
            user.user_id,
            { min: 5, max: 100 },
            date
         )

         await createTxn(
            [COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN],
            TRANSACTION_PURPOSE.REDEEM,
            user.user_id,
            { min: 5, max: 20 },
            date
         )


         // Casino transactions
         await createCasinoTxn(
            [COINS.SWEEP_COIN.PURCHASE_SWEEP_COIN, COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN],
            casinoGameId,
            CASINO_TRANSACTION_PURPOSE.CASINO_BET,
            user.user_id,
            { min: 5, max: 100 },
            date
         )

         await createCasinoTxn(
            [COINS.SWEEP_COIN.BONUS_SWEEP_COIN, COINS.SWEEP_COIN.PURCHASE_SWEEP_COIN],
            casinoGameId,
            CASINO_TRANSACTION_PURPOSE.CASINO_BET,
            user.user_id,
            { min: 5, max: 100 },
            date
         )

         await createCasinoTxn(
            [COINS.GOLD_COIN],
            casinoGameId,
            CASINO_TRANSACTION_PURPOSE.CASINO_BET,
            user.user_id,
            { min: 2, max: 50 },
            date
         )

         await createCasinoTxn(
            [COINS.GOLD_COIN],
            casinoGameId,
            CASINO_TRANSACTION_PURPOSE.CASINO_WIN,
            user.user_id,
            { min: 2, max: 50 },
            date
         )

         await createCasinoTxn(
            [COINS.SWEEP_COIN.PURCHASE_SWEEP_COIN],
            casinoGameId,
            CASINO_TRANSACTION_PURPOSE.CASINO_WIN,
            user.user_id,
            { min: 2, max: 50 },
            date
         )

         await createCasinoTxn(
            [COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN],
            casinoGameId,
            CASINO_TRANSACTION_PURPOSE.CASINO_WIN,
            user.user_id,
            { min: 2, max: 50 },
            date
         )

         // await createWithdrawalRequests(
         //    COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN,
         //    TRANSACTION_PURPOSE.REDEEM,
         //    user.user_id,
         //    { min: 5, max: 20 },
         //    date
         // )
      }
   }
}

module.exports = initialize 
