import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile, deleteFileFromS3 } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'

export class UpdateVipTierHandler extends BaseHandler {

    async run() {
        let {
            vipTierId,
            name,
            icon,
            level,
            wageringThreshold,
            gamesPlayed,
            bigBetsThreshold,
            bigBetAmount,
            depositsThreshold,
            loginStreak,
            referralsCount,
            timeBasedConsistency,
            isActive,
            rewards
        } = this.args

        const transaction = this.context.sequelizeTransaction
        let fileName
        const vipTierExists = await db.VipTier.findOne({
            where: { vipTierId: vipTierId }
        })
        if (!vipTierExists) throw new AppError(Errors.PROMOTION_NOT_EXISTS)

        if (icon) {
            fileName = await uploadFile(icon.buffer, {
                name: icon.originalname,
                mimetype: icon.mimetype,
                filePathInS3Bucket: S3_FILE_PREFIX.promotions
            })
            if (vipTierExists?.icon) await deleteFileFromS3(vipTierExists.icon)
        }

        const updateFields = {}

        if (name) updateFields.name = name
        if (level) updateFields.level = level
        if (wageringThreshold) updateFields.wageringThreshold = wageringThreshold
        if (gamesPlayed) updateFields.gamesPlayed = gamesPlayed
        if (bigBetsThreshold) updateFields.bigBetsThreshold = bigBetsThreshold
        if (bigBetAmount) updateFields.bigBetAmount = bigBetAmount
        if (depositsThreshold) updateFields.depositsThreshold = depositsThreshold
        if (loginStreak) updateFields.loginStreak = loginStreak
        if (referralsCount) updateFields.referralsCount = referralsCount
        if (timeBasedConsistency) updateFields.timeBasedConsistency = timeBasedConsistency
        if (isActive !== undefined) updateFields.isActive = isActive
        if (icon) updateFields.icon = fileName.location

        const vipTier = await db.VipTier.update(updateFields, {
            where: { vipTierId: vipTierId },
            transaction
        })

        if (rewards && rewards.length > 0) {
            const existingRewards = await db.Reward.findAll({
                where: { vipTierId },
                transaction
            })

            const rewardsToUpdate = []
            for (const reward of rewards) {
                const existingReward = existingRewards.find(r => String(r.rewardId) === String(reward.rewardId))
                if (existingReward) {
                    const updatedReward = {}
                    if (reward.cashBonus !== undefined) updatedReward.cashBonus = reward.cashBonus
                    if (reward.commissionRate !== undefined) updatedReward.commissionRate = reward.commissionRate
                    if (reward.rackback !== undefined) updatedReward.rackback = reward.rackback
                    if (reward.prioritySupport !== undefined) updatedReward.prioritySupport = reward.prioritySupport
                    if (reward.isActive !== undefined) updatedReward.isActive = reward.isActive

                    if (Object.keys(updatedReward).length > 0) {
                        rewardsToUpdate.push({
                            rewardId: existingReward.rewardId,
                            ...updatedReward
                        })
                    }
                }
            }

            if (rewardsToUpdate.length > 0) {
                const updatePromises = rewardsToUpdate.map(reward =>
                    db.Reward.update({
                        cashBonus: reward.cashBonus,
                        commissionRate: reward.commissionRate,
                        rackback: reward.rackback,
                        prioritySupport: reward.prioritySupport,
                        isActive: reward.isActive
                    }, {
                        where: { rewardId: reward.rewardId },
                        transaction
                    })
                )

                const rewardUpdated = await Promise.all(updatePromises)
            }
        }

        return { vipTier, message: SUCCESS_MSG.UPDATE_SUCCESS }
    }
}
