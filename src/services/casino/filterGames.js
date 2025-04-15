import { Op } from 'sequelize'

import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { getAll, updateEntity } from '@src/services/helper/crud'

const schema = {
  type: 'object',
  properties: {
    gameProviderId: { type: 'integer' },
    featureGroup: { type: 'array' }
  },
  required: ['gameProviderId']
}



export class FilterGameHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { gameProviderId, featureGroup } = this.args

    const gameNameRtp = []

    const gameDetail = await getAll({
      model: db.MasterCasinoGame,
      data: { masterCasinoProviderId: gameProviderId },
      attributes: ['featureGroup', 'masterCasinoGameId', 'name', 'devices', 'masterCasinoProviderId', 'isActive']
    })

    for (let game = 0; game < gameDetail.length; game++) {
      let rtpData = { name: gameDetail[game].name, masterCasinoProviderId: gameDetail[game].masterCasinoProviderId }

      if (gameDetail[game].devices.length === 1) rtpData = { ...rtpData, devices: { [Op.contains]: gameDetail[game].devices } }

      const gameVariableRtp = await getAll({
        model: db.MasterCasinoGame,
        data: rtpData,
        attributes: ['returnToPlayer', 'featureGroup', 'masterCasinoGameId', 'name', 'devices', 'masterCasinoProviderId', 'isActive'],
        order: [['returnToPlayer', 'ASC']]
      })

      if (gameVariableRtp.length === 2) {
        await updateEntity({
          model: db.MasterCasinoGame,
          data: { isActive: false },
          values: { masterCasinoGameId: gameVariableRtp[1].masterCasinoGameId }
        })

        gameNameRtp.push([gameVariableRtp[1].name, gameVariableRtp[1].returnToPlayer])
      } else if (gameVariableRtp?.length > 2) {
        for (let rtpGame = 0; rtpGame < gameVariableRtp.length; rtpGame++) {
          if (rtpGame !== 1) {
            await updateEntity({
              model: db.MasterCasinoGame,
              data: { isActive: false },
              values: { masterCasinoGameId: gameVariableRtp[rtpGame].masterCasinoGameId }
            })
            gameNameRtp.push([gameVariableRtp[rtpGame].name, gameVariableRtp[rtpGame].returnToPlayer])
          }
        }
      }

      if (featureGroup.includes(gameDetail[game].featureGroup)) continue
      else {
        await updateEntity({
          model: db.MasterCasinoGame,
          data: { isActive: false },
          values: { masterCasinoGameId: gameDetail[game].masterCasinoGameId }
        })
      }
    }

    return gameNameRtp
  }
}
