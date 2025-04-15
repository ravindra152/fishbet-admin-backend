import TicketController from './ticket.controller'

export default class SupportController {

  static async getTickets(req,res,next){
    return TicketController.getTickets(req,res,next)
  }

  static async updateTicketStatus(req,res,next){
    return TicketController.updateTicketStatus(req,res,next)
  }

  static async getTicketMessages(req,res,next){
    return TicketController.getTicketMessages(req,res,next)
  }

  static async sendTicketMessage(req,res,next){
    return TicketController.sendTicketMessage(req,res,next)
  }

}
