import { sendResponse } from '@src/helpers/response.helpers'
import { GetTicketsHandler } from '@src/services/support/ticketSupport'
import { GetTicketMessagesHandler } from '@src/services/support/ticketSupport/getTicketMessages'
import { SendTicketMessageHandler } from '@src/services/support/ticketSupport/sendTicketMessage'
import { UpdateTicketStatusHandler } from '@src/services/support/ticketSupport/updateTicketStatus'


export default class TicketController {

  static async getTickets(req, res, next) {
    try {
      const data = await GetTicketsHandler.execute({...req.query,...req.body}, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async updateTicketStatus(req, res, next) {
    try {
      const data = await UpdateTicketStatusHandler.execute(req.body,req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getTicketMessages(req, res, next) {
    try {
      const data = await GetTicketMessagesHandler.execute({...req.query,...req.body}, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async sendTicketMessage(req, res, next) {
    try {
      const data = await SendTicketMessageHandler.execute(req.body,req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
}
