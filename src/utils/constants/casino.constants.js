export const CASINO_AGGREGATORS = {
  GSOFT: 'GSOFT',
  ICONIC21: 'ICONIC21',
  ALEA: 'ALEA',
  ONEGAMEHUB: 'ONEGAMEHUB'
}

export const CASINO_PROVIDERS = {
  GSOFT: 'GSOFT',
  ICONIC21: 'ICONIC21'
}

export const ONE_GAME_HUB_REQUEST_ACTIONS = {
  // Game Listing & Configuration
  AVAILABLE_GAMES: "available_games",
  AVAILABLE_CURRENCIES: "available_currencies",

  // Game Session Launch
  REAL_PLAY: "real_play",
  DEMO_PLAY: "demo_play",

  // FreeRounds Management
  FREEROUNDS_CREATE: "freerounds_create",
  FREEROUNDS_CANCEL: "freerounds_cancel",

  // Player Transactions
  BALANCE: "balance",
  BET: "bet",
  WIN: "win",
  CANCEL: "cancel"
};

export const CASINO_ROUND_STATUS = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
}


/**
 * @type {Object.<string, { id: string, name: string, subCategories: { id: string, name: string }[] }[]>}
 */
/**
 * @type {Object.<string, { id: string, name: string, subCategories: { id: string, name: string }[] }[]>}
 */
export const DEFAULT_CATEGORIES = [{
  id: 1,
  name: 'Live'
}, {
  id: 2,
  name: 'Slots'
}, {
  id: 3,
  name: 'Virtuals'
}, {
  id: 4,
  name: 'TvGames'
}, {
  id: 5,
  name: 'Poker'
},
{
  id: 7,
  name: 'video-poker'
},
{
  id: 9,
  name: 'video-slot'
}, {
  id: 10,
  name: 'scratch-card'
}, {
  id: 11,
  name: 'crash'
}, {
  id: 12,
  name: 'Scratchcards'
}, {
  id: 13,
  name: 'probability'
}, {
  id: 14,
  name: 'keno'
},
{
  id: 15,
  name: 'Roulette'
}
]