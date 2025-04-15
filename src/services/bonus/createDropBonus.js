import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import { serverDayjs } from '@src/libs/dayjs'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { BONUS_TYPE } from '@src/utils/constants/bonus.constants'
import { SUCCESS_MSG } from '@src/utils/success'
const { COINS } = require("@src/utils/constants/public.constants")

const schema = {
    type: 'object',
    properties: {
        coin: { type: 'integer' },
        name: { type: 'string' },
        coinType: { type: 'string' },
        isActive: { type: 'boolean' },
        totalClaimsAllowed: { type: 'integer' },
        totalClaims: { type: 'integer' },
        expiryTime: { type: 'string', format: 'date-time' },  // Expecting UTC format
    },
    required: ['coin', 'coinType', 'name', 'code', 'totalClaimsAllowed', 'totalClaims', 'expiryTime']
}
function generateCouponCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
    }
    return code;
}

export class CreateDropBonusHandler extends BaseHandler {
    get constraints() {
        return schema
    }

    async run() {

        const { coin, name, coinType, totalClaimsAllowed, totalClaims, expiryTime, isActive } = this.args
        const transaction = this.context.sequelizeTransaction

        // const expiryTimeTrimmed = expiryTime.trim();
        // const expiryDate = new Date(expiryTimeTrimmed);

        // if (isNaN(expiryDate.getTime())) {
        //     throw new AppError(Errors.INVALID_EXPIRY_TIME, {
        //         explanation: "Invalid date format. Please provide a valid UTC date in ISO 8601 format."
        //     });
        // }


        // const currentUTCDate = new Date();
        // if (expiryDate <= currentUTCDate) {
        //     throw new AppError(Errors.INVALID_EXPIRY_TIME, {
        //         explanation: "expiry time must be greater than current time"
        //     });
        // }
        // const expiryTimeISO = expiryDate.toISOString()


        const expiryTimeTrimmed = expiryTime.trim();
        const expiryDate = serverDayjs(expiryTimeTrimmed);

        if (!expiryDate.isValid()) {
            throw new AppError(Errors.INVALID_EXPIRY_TIME);
        }

        const currentUTCDate = serverDayjs();
        if (expiryDate.isBefore(currentUTCDate)) {
            throw new AppError(Errors.INVALID_EXPIRY_TIME);
        }

        const expiryTimeISO = expiryDate.toISOString();

        // const existingBonus = await db.DropBonus.findOne({ where: { code }, transaction });
        // if (existingBonus) {

        //     throw new AppError(Errors.DUPLICATE_CODE);
        // }
        let code;
        let existingBonus;
        do {
            code = generateCouponCode();
            existingBonus = await db.DropBonus.findOne({ where: { code }, transaction });
        } while (existingBonus);  // Keep generating until a unique code is found
        if (coinType !== COINS.GOLD_COIN && coinType !== COINS.SWEEP_COIN.BONUS_SWEEP_COIN) {
            throw new AppError(Errors.INVALID_COIN_TYPE);
        }

        const dropBonus = await db.DropBonus.create({
            coin,
            coinType,
            name,
            code,
            totalClaimsAllowed,
            totalClaims: (totalClaims || 0),
            expiryTime: expiryTimeISO,
            isActive: isActive ? isActive : false,
        }, { transaction })

        return { dropBonus, message: SUCCESS_MSG.CREATE_SUCCESS }
    }
}