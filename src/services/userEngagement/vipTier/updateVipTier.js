import db from '@src/db/models';
import {BaseHandler} from '@src/libs/logicBase';
import { SUCCESS_MSG } from '@src/utils/success';
import { AppError } from '@src/errors/app.error';
import { Errors } from '@src/errors/errorCodes';
import { uploadFile } from '@src/utils/s3.utils';
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants';

export class UpdateVipTierHandler extends BaseHandler {
  async run() {
    const {
      vipTierId,
      name,
      boost,
      rakeback,
      bonusSc,
      bonusGc,
      level,
      scRequiredMonth,
      gcRequiredMonth,
      gradualLoss,
      gradualLossPeriodUnit,
      prioritySupport,
      isActive,
      rewardCap,
      minDepositLimit,
      maxDepositLimit,
      minRedemptionLimit,
      maxRedemptionLimit,
      image
    } = this.args;
    console.log(image)

    const transaction = this.dbTransaction;

    // Check if the VIP Tier exists
    const existingVipTier = await db.VipTier.findOne({
      where: { vipTierId },
      transaction,
    });

    if (!existingVipTier) {
      throw new AppError(Errors.VIP_TIER_NOT_EXISTS);
    }

    // checking if tier name or level already exists

    // let prevLvl,prevName
    // prevLvl=existingVipTier.level;
    // prevName=existingVipTier.name;
    // let existingLvlOrName

    // if(prevLvl!=level && prevName!=name){
    //   existingLvlOrName= await db.VipTier.findOne({
    //     where: {
    //       [db.Sequelize.Op.or]: [
    //         { level },
    //         { name },
    //       ],
    //     },
    //     transaction
    //   });
    // }else if(prevLvl!=level){
    //   existingLvlOrName= await db.VipTier.findOne({
    //     where: {level},
    //     transaction
    //   });
    // }
    // else if(prevName!=name){
    //   existingLvlOrName= await db.VipTier.findOne({
    //     where: {name},
    //     transaction
    //   });
    // }

    // if(existingLvlOrName)
    //   throw new AppError(Errors.VIP_TIER_ALREADY_EXISTS);


    // Validating if maxDepositLimit is greater than minDepositLimit
    if (+maxDepositLimit < +minDepositLimit) {
      throw new AppError(Errors.MAX_LIMIT_LESS_THAN_MIN_LIMIT);
    }

    // Validating if maxRedemptionLimit is greater than minRedemptionLimit
    if (+maxRedemptionLimit < +minRedemptionLimit) {
      throw new AppError(Errors.MIN_LIMIT_GREATER_THAN_MAX_LIMIT);
    }

    // Update VIP Tier
    const updatedData = {
      name,
      boost,
      rakeback,
      bonusSc,
      bonusGc,
      level,
      scRequiredMonth,
      gcRequiredMonth,
      gradualLoss,
      gradualLossPeriodUnit,
      prioritySupport,
      isActive,
      rewardCap,
      minDepositLimit,
      maxDepositLimit,
      minRedemptionLimit,
      maxRedemptionLimit,
      icon:image
    };

    if (image) {
      const location = await uploadFile(image.buffer, {
        name: image.originalname,
        mimetype: image.mimetype,
        filePathInS3Bucket: S3_FILE_PREFIX.vipTier
      })
      updatedData.icon = location.location
    }

    await db.VipTier.update(updatedData, { where: { vipTierId }, transaction });

    return {
      success: true,
      message: SUCCESS_MSG.UPDATE_SUCCESS,
    };
  }
}
