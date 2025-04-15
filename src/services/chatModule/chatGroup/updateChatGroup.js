import db from "@src/db/models";
import { AppError } from "@src/errors/app.error";
import { Errors } from "@src/errors/errorCodes";
import { BaseHandler } from "@src/libs/logicBase";
import { SUCCESS_MSG } from "@src/utils/success";
import _ from "lodash";

export default class UpdateChatGroupService extends BaseHandler {
    async run() {
        let { chatGroupId, name, description, status, criteria, isGlobal } = this.args
        const transaction = this.context.sequelizeTransaction
        
        const group = await db.ChatGroup.findOne({ where: { name } })
        if (group) throw new AppError(Errors.GROUP_ALREADY_EXISTS)
        if (name && group && name != group.name) {
            const groupNameExists = await db.ChatGroup.findOne({ where: { name, id: { [Op.not]: chatGroupId } } })
            if (groupNameExists) throw new AppError(Errors.GROUP_NAME_ALREADY_EXIST)
        }
        if (isGlobal === true) {
            const globalGroup = await db.ChatGroup.findOne({ where: { isGlobal: true } })
            if (globalGroup) throw new AppError(Errors.GLOBAL_GROUP_EXIST)
        }
        const groupData = await db.ChatGroup.update({
            name,
            description,
            status,
            groupLogo: null,
            admins: [],
            criteria: {},
            isGlobal
        }, { where: { id: chatGroupId }, transaction })
        return { group: groupData, message: SUCCESS_MSG.UPDATE_SUCCESS }
    }
}