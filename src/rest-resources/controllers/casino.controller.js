import { sendResponse } from '@src/helpers/response.helpers'
import {
  addFeaturedGameHandler,
  CreateCategoryGameHandler,
  CreateGameCategoryHandler,
  DeleteCategoryGameHandler,
  DeleteGameCategoryHandler,
  GetAggregatorsHandler,
  GetAllGameCategoryHandler,
  GetAllProvidersHandler,
  GetCasinoGamesHandler,
  GetCasinoTransactionsHandler,
  GetFreespinGamesHandler,
  OrderCasinoGamesHandler,
  OrderGameCategoryHandler,
  UpdateCasinoGameHandler,
  UpdateCasinoProviderHandler,
  UpdateGameCategoryHandler
} from '@src/services/casino'
import { LoadOneGameHubHandler } from '@src/services/casino/loadGames/load1GameHub.service'
import { LoadAleaGamesHandler } from '@src/services/casino/loadGames/loadAleaGames.service'
import { ToggleCasinoAggregator } from '@src/services/casino/toggleCasinoAggregator'
import { ToggleCasinoGameHandler } from '@src/services/casino/toggleCasinoGames'
import { ToggleCasinoCategoryHandler } from '@src/services/casino/toggleCategory'
import { ToggleProviderHandler } from '@src/services/casino/toggleProvider'


export default class CasinoController {
  // static async createCasinoProvider(req, res, next) {
  //   try {
  //     const data = await CreateCasinoProviderHandler.execute({ ...req.body, thumbnail: req.file }, req.context)
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async getAllProviders(req, res, next) {
    try {
      const data = await GetAllProvidersHandler.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateCasinoProvider(req, res, next) {
    try {
      const images = {
        web: req.files["web"] ? req.files["web"][0] : null,
        mobile: req.files["mobile"] ? req.files["mobile"][0] : null,
      };
      const data = await UpdateCasinoProviderHandler.execute({ ...req.body, images }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async toggleCasinoGame(req, res, next) {
    try {
      const data = await ToggleCasinoGameHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async toggleCasinoProvider(req, res, next) {
    try {
      const data = await ToggleProviderHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
  static async toggleCasinoCategory(req, res, next) {
    try {
      const data = await ToggleCasinoCategoryHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async toggleCasinoAggregator(req, res, next) {
    try {
      const data = await ToggleCasinoAggregator.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getCasinoGame(req, res, next) {
    try {
      const data = await GetCasinoGamesHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  // static async getCasinoGameCount(req, res, next) {
  //   try {
  //     const data = await GetCasinoGamesCountHandler.execute({ ...req.body, ...req.query })
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async updateCasinoGame(req, res, next) {
    try {

      const images = {
        web: req.files["web"] ? req.files["web"][0] : null,
        mobile: req.files["mobile"] ? req.files["mobile"][0] : null,
      };

      const data = await UpdateCasinoGameHandler.execute({ ...req.body, images }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getAggregators(req, res, next) {
    try {
      const data = await GetAggregatorsHandler.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  // static async filterGame(req, res, next) {
  //   try {
  //     const data = await FilterGameHandler.execute(req.body)
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async createGameCategory(req, res, next) {
    try {
      const images = {
        web: req.files["web"] ? req.files["web"][0] : null,
        mobile: req.files["mobile"] ? req.files["mobile"][0] : null,
      };
      const data = await CreateGameCategoryHandler.execute({ ...req.body, images }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateGameCategory(req, res, next) {
    try {
      const images = {
        web: req.files["web"] ? req.files["web"][0] : null,
        mobile: req.files["mobile"] ? req.files["mobile"][0] : null,
      };
      const data = await UpdateGameCategoryHandler.execute({ ...req.body, images }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getFreespinGames(req, res, next) {
    try {
      const data = await GetFreespinGamesHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getGameCategory(req, res, next) {
    try {
      const data = await GetAllGameCategoryHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async orderGameCategory(req, res, next) {
    try {
      const data = await OrderGameCategoryHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async orderCasinoGames(req, res, next) {
    try {
      const data = await OrderCasinoGamesHandler.execute(req.body)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }


  static async deleteGameCategory(req, res, next) {
    try {
      const data = await DeleteGameCategoryHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getCasinoTransactions(req, res, next) {
    try {
      const data = await GetCasinoTransactionsHandler.execute({ ...req.body, ...req.query })

      if (result.csv) {
        res.header('Content-Type', 'text/csv')
        res.attachment(result.fileName)
        return res.send(result.csvData)
      }
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  // static async updateGames(req, res, next) {
  //   try {
  //     const data = await UpdateGamesHandler.execute(req.body)
  //     sendResponse({ req, res, next }, data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async createCategoryGame(req, res, next) {
    try {
      const data = await CreateCategoryGameHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async deleteCategoryGame(req, res, next) {
    try {
      const data = await DeleteCategoryGameHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async addFeaturedGames(req, res, next) {
    try {
      const data = await addFeaturedGameHandler.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async loadAleaCasinoGame(req, res, next) {
    try {
      const data = await LoadAleaGamesHandler.execute({ ...req.body }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async loadOneGamehubCasinoGame(req, res, next) {
    try {
      const data = await LoadOneGameHubHandler.execute({ ...req.body }, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
}
