import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { SUCCESS_MSG } from "@src/utils/success";
import { AppError } from "@src/errors/app.error";
import { TICKET_STATUSES } from "@src/utils/constants/public.constants";
import { Errors } from "@src/errors/errorCodes";

export class SendTicketMessageHandler extends BaseHandler{
  async run(){
    const {ticketId,user,message}= this.args
    const transaction= this.dbTransaction

    const ticket=await db.Ticket.findOne({
      where: {id: ticketId},
    })

    if(!ticket || ticket.status==TICKET_STATUSES.CLOSED)
      throw new AppError(Errors.INVALID_TICKET_ID)

    const ticketMessage=await db.TicketMessage.create(
      {
        ticketId,
        message,
        senderId: user.userId,
        isAdminResponse: true
      },
      transaction
    )

    return {ticketMessage,message: SUCCESS_MSG.CREATE_SUCCESS}
  }
}
