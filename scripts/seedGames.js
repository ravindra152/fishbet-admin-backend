import db from '@src/db/models'
import { createAggregator, createCategories, createGames, createProviders } from './casinoGame'
// const db = require('../src/db/models')
// const { createAggregator, createCategories, createGames, createProviders } =  require('./casinoGame')

const DEVICE_TYPES = {
  MOBILE: 'Mobile',
  DESKTOP: 'Desktop',
  ALL_DEVICES: 'All device'
}

export const DEVICE_TYPE_MAP = {
  Mobile: [DEVICE_TYPES.MOBILE],
  Desktop: [DEVICE_TYPES.DESKTOP],
  'All device': [DEVICE_TYPES.DESKTOP, DEVICE_TYPES.MOBILE]
}

export const CATEGORIES = {
  Live: 1,
  Slot: 2,
  Virtuals: 3,
  TvGames: 4,
  Poker: 5,
  SportBook: 6
}

const AGGREGATORS = {
  NUX: {
    id: '1',
    name: 'nux'
  }
}

const DEFAULT_CATEGORIES = [{
  id: 1,
  name: 'Live'
}, {
  id: 2,
  name: 'Slot'
}, {
  id: 3,
  name: 'Virtuals'
}, {
  id: 4,
  name: 'TvGames'
}, {
  id: 5,
  name: 'Poker'
}, {
  id: 6,
  name: 'SportBook'
}]
export async function seedGames () {
  try {
    console.log(db.sequelize.models, "=================")
    const transaction = await db.sequelize.transaction()
    // console.log(db, "=================")
    const languages = await db.sequelize.models.Language.findAll({ attributes: ['languageId', 'code'], raw: true, transaction })
    const aggregator = await createAggregator(AGGREGATORS.NUX.id, AGGREGATORS.NUX.name, languages, transaction)
    const providers = require('./providers.json')
    const providerIdsMap = await createProviders(aggregator.id, providers, languages, transaction)

    const categoryIdsMap = await createCategories(DEFAULT_CATEGORIES, languages, transaction)
    const games = require('./games.json')
    await createGames(categoryIdsMap, providerIdsMap, games, languages, transaction)
    await transaction.commit()
    console.log('========Game created success fully====================')
    return { success: true }
  } catch (error) {
    console.log(error)
  }
}

// seedGames()
