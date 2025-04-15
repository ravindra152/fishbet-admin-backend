import { dayjs } from "@src/libs/dayjs"
import { Op } from "sequelize"
/**
 * @param {string} startDate
 * @param {string} endDate
 * @returns
 */
export function alignDatabaseDateFilter(startDate, endDate) {
    let filterObj = {}
    if (startDate && endDate) filterObj = { [Op.and]: [{ [Op.gte]: dayjs(startDate).format() }, { [Op.lte]: dayjs(endDate).format() }] }
    else if (endDate) filterObj = { [Op.lte]: dayjs(endDate).format() }
    else if (startDate) filterObj = { [Op.gte]: dayjs(startDate).format() }
    return filterObj
}