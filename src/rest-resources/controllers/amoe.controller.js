import FaucetController from './faucet.controller'

export default class AmoeController {

  static async setFaucet(req,res,next){
    return FaucetController.setFaucet(req,res,next)
  }

  static async getFaucet(req,res,next){
    return FaucetController.getFaucet(req,res,next)
  }

}
