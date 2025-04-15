import db from "@src/db/models";
import { AppError } from "@src/errors/app.error";
import { Errors } from "@src/errors/errorCodes";
import { BaseHandler } from "@src/libs/logicBase";
import { pageValidation } from "@src/utils/common";
import { SUCCESS_MSG } from "@src/utils/success";
import { Op } from 'sequelize';

export class GetTicketsHandler extends BaseHandler {
  async run() {
    const { limit, pageNo, status, ticketId, username } = this.args

    const { page, size } = pageValidation(pageNo, limit)
    const offset = (page - 1) * size
    let query = {};
    if (status)
      query = { status }
    if (ticketId) query.id = ticketId;
    if (username) {
      query = {
        ...query,
        '$User.username$': { [Op.like]: `%${username}%` },
      };
    }


    const tickets = await db.Ticket.findAll({
      where: query,
      order: [['createdAt', 'DESC']],
      limit: size,
      offset,
      include: [
        {
          model: db.User,
          as: 'User',
          attributes: ['username', 'userId', 'email']
        }
      ]
    });


    return { tickets, message: SUCCESS_MSG.GET_SUCCESS }
  }
}