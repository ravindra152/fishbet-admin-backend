export const COINS = {
  GOLD_COIN: 'GC',
  SWEEP_COIN: {
    BONUS_SWEEP_COIN: 'BSC',
    PURCHASE_SWEEP_COIN: 'PSC',
    REDEEMABLE_SWEEP_COIN: 'RSC',
  }
}
export const COINS_FILTER = {
  GOLD_COIN: 'GC',
  SWEEP_COIN: 'SC',
}
export const WALLET_OWNER_TYPES = {
  USER: 'user',
  ADMIN: 'admin'
}
export const PACKAGE_MINIMUM_AMOUNT_LIMIT = {
  MIN:20
}
export const BANNER_TYPE = {
  HOME: 'home',
  CASINO: 'casino',
  PROMOTION: 'promotion',
  OTHER: 'other'
}

export const DEVICE_TYPE = {
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
  BOTH: 'both'
}

export const VIP_TIER_NAMES = {
  BRONZE: 'Bronze',
  SILVER: 'silver',
  GOLD: 'gold',
}

const ASSETS = 'sweeps/assets'

export const S3_FILE_PREFIX = {
  bonus: ASSETS + '/bnonus',
  packages: ASSETS + '/sweeps/packages',
  casino_game: ASSETS + '/casino/games',
  casino_provider: ASSETS + '/casino/providers',
  casino_category: ASSETS + '/casino/categories',
  promotions: ASSETS + '/promotions',
  siteLogo: ASSETS + '/site_information/logo',
  banner: ASSETS + '/site_information/banner',
  imageGallery: ASSETS + '/gallery',
  vipTier: ASSETS + '/vip_tier/icon'
}

export const TRANSACTION_PURPOSE = {
  // General transactions
  PURCHASE: 'purchase',
  REDEEM: 'redeem',
  REDEEM_REFUND: 'redeem_refund',

  // Bonus transactions
  BONUS_CASH: 'bonus_cash',
  BONUS_DEPOSIT: 'bonus_deposit',
  BONUS_REFERRAL: 'bonus_referral',
  BONUS_TO_CASH: 'bonus_to_cash',
  BONUS_FORFEIT: 'bonus_forfeit',
  BONUS_WIN: 'bonus_win',
  BONUS_DROP: 'bonus_drop',
  POSTAL_CODE: 'postal_code',
  BONUS_RACKBACK: "bonus_rackback",
  // Faucet transactions
  FAUCET_AWAIL: 'faucet_awail',

  // Spin Wheel transaction
  WHEEL_REWARD: "wheel_reward",

  // Chatrain transaction
  EMIT: 'emit_chatrain',
  CHATRAIN: 'chatrain',
  CLAIM: 'claim_chatrain',

  //Tip transaction
  SEND_TIP: 'send_tip',
  RECEIVE_TIP: 'receive_tip',
  TIP: 'tip',
}

// Casino transactions
export const CASINO_TRANSACTION_PURPOSE = {
  CASINO_BET: 'casino_bet',
  CASINO_REFUND: 'casino_refund',
  CASINO_WIN: 'casino_win',
  JACKPOT_WIN: 'jackpot_win',
  PROMO_WIN: 'promo_win',
  BONUS_DROP: 'bonus_drop',
  BONUS_RACKBACK: "bonus_rackback",
  POSTAL_CODE: "postal_code",
  GAME_ROLLBACK: 'game_rollback',
}


export const POSTAL_CODE_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
}

export const LEDGER_TYPES = {
  DEBIT: 'Debit',
  CREDIT: 'Credit'
}


export const LEDGER_TRANSACTION_TYPES = {
  CASINO: 'casino',
  BANKING: 'banking',
  BONUS: 'bonus',
  WITHDRAW: 'withdraw',
  CHATRAIN: 'chatrain',
  TIP: 'tip'
}


export const LEDGER_DIRECTIONS = {
  [TRANSACTION_PURPOSE.PURCHASE]: LEDGER_TYPES.CREDIT,
  [TRANSACTION_PURPOSE.REDEEM]: LEDGER_TYPES.DEBIT,
  [TRANSACTION_PURPOSE.REDEEM_REFUND]: LEDGER_TYPES.CREDIT,
  [CASINO_TRANSACTION_PURPOSE.CASINO_BET]: LEDGER_TYPES.DEBIT,
  [CASINO_TRANSACTION_PURPOSE.CASINO_WIN]: LEDGER_TYPES.CREDIT,
  [CASINO_TRANSACTION_PURPOSE.CASINO_REFUND]: LEDGER_TYPES.CREDIT,
  [CASINO_TRANSACTION_PURPOSE.BONUS_DROP]: LEDGER_TYPES.CREDIT,
  [CASINO_TRANSACTION_PURPOSE.BONUS_RACKBACK]: LEDGER_TYPES.CREDIT,
  [CASINO_TRANSACTION_PURPOSE.POSTAL_CODE]: LEDGER_TYPES.CREDIT,
  [TRANSACTION_PURPOSE.FAUCET_AWAIL]: LEDGER_TYPES.CREDIT,
  [TRANSACTION_PURPOSE.WHEEL_REWARD]: LEDGER_TYPES.CREDIT,
  [TRANSACTION_PURPOSE.EMIT]: LEDGER_TYPES.DEBIT,
  [TRANSACTION_PURPOSE.CLAIM]: LEDGER_TYPES.CREDIT,
  [TRANSACTION_PURPOSE.SEND_TIP]: LEDGER_TYPES.DEBIT,
  [TRANSACTION_PURPOSE.RECEIVE_TIP]: LEDGER_TYPES.CREDIT,
}

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'successful',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
  ROLLBACK: 'rollback',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  REQUESTED: 'requested'
}

export const WITHDRAWAL_STATUS = {
  PENDING: 'Pending',
  SUCCESS: 'Success',
  CANCELLED: 'Cancelled',
}

export const NOWPAYMENT_WEBHOOK_REDEEM_STATUS = {
  WAITING: 'WAITING',
  CONFIRMING: 'CONFIRMING',
  CONFIRMED: 'CONFIRMED',
  SENDING: 'SENDING',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  FINISHED: 'FINISHED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED',
  PROCESSING: 'PROCESSING',
  REJECTED: 'REJECTED',
  CREATING: 'CREATING'
};


export const SC_GC_REQUIRED_PLAY_UNITS = {
  DAYS: 'days',
  MONTHS: 'months',
  YEARS: 'years'
}

export const GRADUAL_LOSS_PERIOD_UNITS = {
  DAYS: 'days',
  MONTHS: 'months',
  YEARS: 'years'
}

export const TICKET_STATUSES = {
  OPEN: 'open',
  ACTIVE: 'active',
  RESOLVED: 'resolved',
  CLOSED: 'closed'
}



export const VIP_TIER_LIMITS = {
  LEVEL: {
    MIN: 0,
    MAX: 200
  },
  WAGERING_THRESHOLD: {
    MIN: 0,
    MAX: 10000
  },
  GAMES_PLAYED: {
    MIN: 0,
    MAX: 500
  },
  BIG_BETS_THRESHOLD: {
    MIN: 0,
    MAX: 500
  },
  BIG_BET_AMOUNT: {
    MIN: 0,
    MAX: 5000
  },
  DEPOSIT_THRESHOLD: {
    MIN: 0,
    MAX: 10000
  },
  LOGIN_STREAK: {
    MIN: 0,
    MAX: 1000
  },
  REFERRAL_COUNT: {
    MIN: 0,
    MAX: 10000
  },
  TIME_BASED_CONSISTENCY: {
    MIN: 1,
    MAX: 1500
  },
};

export const REWARD_LIMITS = {
  COMMISSION_RATE: {
    MIN: 0,
    MAX: 100
  },
  RACKBACK_RATE: {
    MIN: 0,
    MAX: 100
  },
  CASH_BONUS: {
    MIN: 0,
    MAX: 10000
  }
};

export const PACKAGE_LIMITS = {
  AMOUNT: {
    MIN: 20,
    MAX: 1000
  },
  SC_COIN: {
    MIN: 20,
    MAX: 2000
  },
  GC_COIN: {
    MIN: 20,
    MAX: 10000
  },
  DISCOUNT_AMOUNT: {
    MIN: 0,
    MAX: 200
  }
};
