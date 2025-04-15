import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'

export class CreateVipTierHandler extends BaseHandler {

    async run() {
        let { name,
            icon,
            level,
            wageringThreshold,
            gamesPlayed,
            bigBetsThreshold,
            bigBetAmount,
            depositsThreshold,
            loginStreak,
            referralsCount,
            // sweepstakesEntries,
            // sweepstakesWins,
            timeBasedConsistency,
            isActive,
            rewards
        } = this.args
        const transaction = this.context.sequelizeTransaction
        let fileName
        const existingVipTier = await db.VipTier.findOne({ where: { level } })
        if (existingVipTier) {
            throw new AppError(Errors.VIP_TIER_LEVEL_ALREADY_EXISTS)
        }
        if (!icon) throw new AppError(Errors.IMAGE_NOT_FOUND)

        if (icon) {

            const data = await uploadFile(icon.buffer, {
                name: icon.originalname,
                mimetype: icon.mimetype,
                filePathInS3Bucket: S3_FILE_PREFIX.promotions
            })
            fileName = data
        }

        if (!rewards || rewards.length === 0) {
            throw new AppError(Errors.REWARDS_NOT_FOUND)
        }

        if (rewards.length > 1) {
            throw new AppError(Errors.MULTIPLE_REWARDS_NOT_ALLOWED);
        }
        const vipTiers = await db.VipTier.create({
            name,
            icon: fileName.location,
            level,
            wageringThreshold,
            gamesPlayed,
            bigBetsThreshold,
            bigBetAmount,
            depositsThreshold,
            loginStreak,
            referralsCount,
            // sweepstakesEntries,
            // sweepstakesWins,
            timeBasedConsistency,
            isActive: isActive ? isActive : true
        }, { transaction })

        if (rewards && rewards.length > 0) {
            // Prepare rewards data for bulk insert
            const rewardData = rewards.map(reward => ({
                vipTierId: vipTiers.vipTierId,
                cashBonus: reward.cashBonus || 1,
                commissionRate: reward.commissionRate || 1,
                rackback: reward.rackback || 1,
                // freeSpin: reward.freeSpin,
                // exclusiveGames: reward.exclusiveGames, // Array of game IDs
                prioritySupport: reward.prioritySupport,
                // eventInvites: reward.eventInvites,
                isActive: reward.isActive || true, // Default to true if not provided
            }))

            // Step 4: Create rewards in bulk
            const createdRewards = await db.Reward.bulkCreate(rewardData, { transaction })

            // Return the VIP Tier and rewards information in the response
            return {
                vipTiers: {
                    ...vipTiers.toJSON(),
                    rewardData: createdRewards.map(reward => reward.toJSON()),
                },
                message: SUCCESS_MSG.UPDATE_SUCCESS
            }
        }

        // return {
        //     vipTiers: {
        //         ...vipTiers.toJSON(),
        //         rewardData: rewardData.toJSON(),
        //     }, message: SUCCESS_MSG.UPDATE_SUCCESS
        // }
    }
}