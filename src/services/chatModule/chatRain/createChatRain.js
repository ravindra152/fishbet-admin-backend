import db from "@src/db/models";
import { AppError } from "@src/errors/app.error";
import { Errors } from "@src/errors/errorCodes";
import { BaseHandler } from "@src/libs/logicBase";
import { SUCCESS_MSG } from "@src/utils/success";

export default class CreateChatRainService extends BaseHandler {
    async run() {
        const transaction = this.context.sequelizeTransaction
        const { name, description, prizeMoney, currency, chatGroupId } = this.args
        const chatGroupExist = await db.ChatGroup.findByPk(chatGroupId)
        if (!chatGroupExist) throw new AppError(Errors.CHAT_GROUP_NOT_FOUND)
        const activeChatRainExist = await db.ChatRain.findOne({ where: { chatGroupId, isClosed: false } })
        if (activeChatRainExist) throw new AppError(Errors.CHAT_RAIN_ALREADY_ACTIVE)
        const newChatRain = await db.ChatRain.create({
            name,
            description,
            prizeMoney,
            currencyId: currency,
            chatGroupId,
            isClosed: false
        }, { transaction })

        // const reqConfig = {
        //     method: 'post',
        //     maxBodyLength: Infinity,
        //     url: `${appConfig.userBackend.endpoint}/api/v1/chat-rain/emit-chat-rain`,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data: data
        // }

        // axios.request(reqConfig)
        //   .then((response) => {
        //     console.log(JSON.stringify(response.data))
        //   })
        //   .catch((error) => {
        //     throw new APIError(error)
        //   })

        return { data: newChatRain, message: SUCCESS_MSG.CREATE_SUCCESS }
    }
}