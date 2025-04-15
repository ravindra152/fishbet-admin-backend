import config from '@src/configs/app.config';
import { aleaCasinoConfig } from '@src/configs/casinoProviders/alea.config';
import db from '@src/db/models';
import { AppError } from '@src/errors/app.error';
import { BaseHandler } from '@src/libs/logicBase';
import { CASINO_AGGREGATORS, DEFAULT_CATEGORIES } from '@src/utils/constants/casino.constants';
import axios from 'axios';

export class LoadAleaGamesHandler extends BaseHandler {
  async run() {
    const transaction = this.dbTransaction;
    const languages = this.args.languages;
    const env = config.get('env') !== 'production' ? 'gamesAvailable' : 'gamesReady';

    try {
      const pageDetails = await this.fetchPageDetails(env);
      const totalPages = pageDetails.totalPages;
      const gameData = await this.fetchAllGames(env, totalPages);
      await this.processGameData(gameData, languages, transaction);
      return { success: true };
    } catch (error) {
      console.error('Error in LoadAleaGamesHandler:', error);
      throw new AppError(error);
    }
  }

  async fetchPageDetails(env) {
    const query = this.buildPageQuery(env);
    const { data: pageData } = await this.executeGraphQLQuery(query);

    return env === 'gamesAvailable' ? pageData.gamesAvailable.page : pageData.gamesReady.page;
  }

  async fetchAllGames(env, totalPages) {
    const allGames = [];

    for (let i = 0; i < totalPages; i++) {
      const query = this.buildGamesQuery(env, i);
      const { data: gamesData } = await this.executeGraphQLQuery(query);
      const results = env === 'gamesAvailable' ? gamesData.gamesAvailable.results : gamesData.gamesReady.results;
      allGames.push(...results);
    }

    return allGames;
  }

  buildPageQuery(env) {
    return `{
      ${env}(jurisdictionCode: "CAO", size: 500) {
        page {
          number
          size
          totalPages
          totalElements
        }
      }
    }`;
  }

  buildGamesQuery(env, pageNumber) {
    return `{
      ${env}(jurisdictionCode: "CAO", size: 500, page: ${pageNumber}) {
        results {
          id
          name
          software {
            id
            name
          }
          rtp
          genre
          demoAvailable
          thumbnailLinks
          assetsLink
        }
      }
    }`;
  }

  async executeGraphQLQuery(query) {
    const options = this.getAxiosOptions(query);

    try {
      const response = await axios(options);
      if (response.status === 200) return response.data;
      throw new Error('Failed to execute GraphQL query');
    } catch (error) {
      console.error('Error executing GraphQL query:', error);
      throw error;
    }
  }

  getAxiosOptions(query) {
    return {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://customer-api.aleaplay.com/api/graphql',
      headers: {
        'Authorization': `Bearer ${aleaCasinoConfig.secretToken}`,
        'Alea-CasinoId': aleaCasinoConfig.casinoId,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ query, variables: {} }),
    };
  }

  async processGameData(data, languages, transaction) {
    const aggregator = await this.createAggregator(CASINO_AGGREGATORS.ALEA, languages, transaction);
    const providerIdsMap = await this.createProviders(aggregator.id, data, languages, transaction);
    const categoryMap = await this.createCategories(DEFAULT_CATEGORIES, languages, transaction);
    await this.createGames(categoryMap, providerIdsMap, data, languages, transaction);
  }

  getNames(languages, defaultName) {
    return { EN: defaultName }
  }

  async createAggregator(name, languages, transaction) {
    const aggregatorNames = this.getNames(languages, name);

    let casinoAggregator = await db.CasinoAggregator.findOne({
      where: db.Sequelize.literal(`name->>'EN' = '${name}'`),
      transaction
    });

    if (!casinoAggregator) {
      casinoAggregator = await db.CasinoAggregator.create(
        { name: aggregatorNames },
        { transaction }
      );
    }

    return casinoAggregator;
  }


  async createProviders(aggregatorId, providers, languages, transaction) {
    const uniqueProvidersMap = new Map();

    providers.forEach(provider => {
      if (!uniqueProvidersMap.has(provider.software.id)) {
        uniqueProvidersMap.set(provider.software.id, {
          gameAggregatorId: aggregatorId,
          uniqueId: provider.software.id,
          name: this.getNames(languages, provider.software.name),
        });
      }
    });

    const uniqueProviders = Array.from(uniqueProvidersMap.values());

    const updatedProviders = await db.CasinoProvider.bulkCreate(uniqueProviders, {
      updateOnDuplicate: ['name'],
      retuning: true,
      transaction,
    });

    return updatedProviders.reduce((map, provider) => {
      map[provider.uniqueId] = provider.id;
      return map;
    }, {});
  }

  /**
     * @param {typeof DEFAULT_CATEGORIES[string]} categories
     * @param {Language[]} languages
     * @param {import ('sequelize').Transaction} transaction
     * @returns {Object.<string, string>}
     */
  async createCategories(categories, languages, transaction) {
    const updatedCategories = await db.CasinoCategory.bulkCreate(categories.map(category => {
      return {
        id: category.id,
        name: this.getNames(languages, category.name)
      }
    }), {
      returning: ['id'],
      updateOnDuplicate: ['name'],
      transaction,
      logging: true
    })

    return updatedCategories.reduce((prev, category) => {
      prev[category.name.EN] = category.id
      return prev
    }, {})
  }


  async createGames(categoryMap, providerIdsMap, games, languages, transaction) {
    console.log(games)
    const gameData = games.map(game => {
      const providerId = providerIdsMap[game.software.id];
      const categoryId = categoryMap[game.genre] || categoryMap.default;
      return providerId ? {
        name: game.name,
        casinoGameId: game.id,
        casinoProviderId: providerId,
        casinoCategoryId: categoryId,
        thumbnailUrl: game.thumbnailLinks?.RATIO_6_6_WEBP ? game.thumbnailLinks["RATIO_6_6_WEBP"] : JSON.stringify(game.thumbnailLinks || {}),
        hasFreespins: game.features ? game.features.includes('FreeSpins') : false,
        demo: game.demoAvailable,
        returnToPlayer: game.rtp
      } : null;
    }).filter(Boolean);

    await db.CasinoGame.bulkCreate(gameData, {
      updateOnDuplicate: ['name', 'iconUrl', 'casinoCategoryId', 'thumbnailUrl', 'returnToPlayer'],
      transaction,
    });
  }
}
