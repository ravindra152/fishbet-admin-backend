import db from '@src/db/models'
import { CATEGORIES, DEVICE_TYPE_MAP } from './seedGames'

function getNames(languages, defaultName) {
  return languages.reduce((prev, language) => {
    prev[language.code] = defaultName
    return prev
  }, {})
}

export async function createAggregator(id, name, languages, transaction) {
  const aggregatorNames = getNames(languages, name)
  const [aggregator] = await db.sequelize.models.CasinoAggregator.findOrCreate({
    defaults: { name: aggregatorNames },
    where: { id },
    returning: ['id'],
    transaction,
    logging: false
  })

  return aggregator
}

export async function createProviders(aggregatorId, providers, languages, transaction) {
  const updatedProviders = await db.sequelize.models.CasinoProvider.bulkCreate(providers.map(provider => {
    console.log(getNames(languages, provider.name).EN)
    return {
      gameAggregatorId: aggregatorId,
      uniqueId: provider.id,
      name: getNames(languages, provider.name).EN,
      thumbnailUrl: provider.logo
    }
  }), {
    updateOnDuplicate: ['name', 'thumbnailUrl'],
    transaction,
    logging: false
  })

  return updatedProviders.reduce((prev, updatedProvider) => {
    prev[updatedProvider.id] = updatedProvider.id
    return prev
  }, {})
}

export async function createCategories(categories, languages, transaction) {
  const updatedCategories = await db.sequelize.models.CasinoCategory.bulkCreate(categories.map(category => {
    return {
      id: category.id,
      name: getNames(languages, category.name)
    }
  }), {
    returning: ['id'],
    updateOnDuplicate: ['updatedAt'],
    transaction,
    logging: true
  })

  return updatedCategories.reduce((prev, category) => {
    prev[category.id] = category.id
    return prev
  }, {})
}

export async function createGames(categoryIdsMap, providerIdsMap, games, languages, transaction) {
  await db.sequelize.models.CasinoGame.bulkCreate(games.reduce((prev, game) => {
    const providerId = providerIdsMap[game.providerId]
    if (!providerId) return prev
    const categoryId = categoryIdsMap[game.typeId] ? categoryIdsMap[game.typeId] : categoryIdsMap[CATEGORIES.Live]
    if (!categoryId) return prev
    prev.push({
      casinoProviderId: providerId,
      casinoCategoryId: categoryId,
      casinoGameId: game.id,
      name: getNames(languages, game.name).EN,
      returnToPlayer: game.basicRTP,
      wageringContribution: 0,
      thumbnailUrl: game.img_vertical,
      devices: DEVICE_TYPE_MAP[game.device],
      demo: game.demo
    })

    return prev
  }, []), {
    updateOnDuplicate: ['name', 'thumbnailUrl'],
    transaction
  })

  return true
}
