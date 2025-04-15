import db from '@src/db/models';
import { BaseHandler } from '@src/libs/logicBase';
import { SUCCESS_MSG } from '@src/utils/success';
import { AppError } from '@src/errors/app.error';
import { Errors } from '@src/errors/errorCodes';
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants';
import { uploadFile } from '@src/utils/s3.utils';


export class AddVipTierHandler extends BaseHandler {

  async run () {

    const {
      level,
      maxDepositLimit,
      minDepositLimit,
      minRedemptionLimit,
      maxRedemptionLimit,
      name,
      boost,
      rakeback,
      bonusSc,
      bonusGc,
      scRequiredMonth,
      gcRequiredMonth,
      gradualLoss,
      gradualLossPeriodUnit,
      prioritySupport,
      isActive,
      rewardCap,
      image
    } = this.args;
    console.log(image)

    const transaction = this.dbTransaction


    // console.log(this.args)

    // Check if the VIP tier already exists
    const existingVipTier = await db.VipTier.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { level },
          { name },
        ],
      },
      transaction
    });

    // console.log(existingVipTier)

    if (existingVipTier) {
      throw new AppError(Errors.VIP_TIER_ALREADY_EXISTS);
    }

    // Validating if maxDepositLimit is greater than minDepositLimit
    if (+maxDepositLimit < +minDepositLimit) {
      throw new AppError(Errors.MAX_LIMIT_LESS_THAN_MIN_LIMIT);
    }

    // Validating if maxRedemptionLimit is greater than minRedemptionLimit
    if (+maxRedemptionLimit < +minRedemptionLimit) {
      throw new AppError(Errors.MIN_LIMIT_GREATER_THAN_MAX_LIMIT);
    }


    // Creating the new VIP Tier
    const vipTierData = {
      level,
      maxDepositLimit,
      minDepositLimit,
      minRedemptionLimit,
      maxRedemptionLimit,
      name,
      boost,
      rakeback,
      bonusSc,
      bonusGc,
      scRequiredMonth,
      gcRequiredMonth,
      gradualLoss,
      gradualLossPeriodUnit,
      prioritySupport,
      isActive
    };

    if (image) {
      const location = await uploadFile(image.buffer, {
        name: image.originalname,
        mimetype: image.mimetype,
        filePathInS3Bucket: S3_FILE_PREFIX.vipTier
      })
      vipTierData.icon = location.location
    }

    // Only add claimLimit if it's not an empty string
    if (rewardCap !== "") {
      vipTierData.rewardCap = rewardCap;
    }

    const newVipTier = await db.VipTier.create(vipTierData, { transaction });

    return {
      success: true,
      vipTierId: newVipTier,
      message: SUCCESS_MSG.CREATE_SUCCESS,
    }
  }
}
