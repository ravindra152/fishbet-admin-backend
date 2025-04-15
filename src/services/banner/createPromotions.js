import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { PROMOTIONS_TYPE } from '@src/utils/constant'
import { S3_FILE_PREFIX } from '@src/utils/constants/public.constants'
import { uploadFile } from '@src/utils/s3.utils'
import { SUCCESS_MSG } from '@src/utils/success'
import { getOne } from '@src/services/helper/crud'

export class CreatePromotionsHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { images, title, slug, description, category, content, url } = this.args
    const transaction = this.context.sequelizeTransaction

    const promotionTypeExist = Object.values(PROMOTIONS_TYPE).includes(Number(category))
    if (!promotionTypeExist) throw new AppError(Errors.PROMOTION_NOT_EXISTS)


    // const checkPromotionSlugExist = await getOne({ model: db.Promotions, data: { slug }, transaction })
    let finalSlug = slug || await this.generateSlugFromTitle(title.EN);
    // let finalSlug = slug || await this.generateSlugFromTitle(String(JSON.parse(String(title)).EN));
    const checkPromotionSlugExist = await db.Promotions.findOne({
      where: { slug: finalSlug }
    })
    if (checkPromotionSlugExist) throw new AppError(Errors.PROMOTION_SLUG_ALREADY_EXISTS)



    let imagesData = {}
    if (images) {
      const uploadedImagesArray = await Promise.all(
        Object.entries(images).map(async ([deviceType, image]) => {
          if (!image) return { [deviceType]: null }; // Handle missing images

          const uploadResult = await uploadFile(image.buffer, {
            name: `${image.originalname}_${deviceType}`,
            mimetype: image.mimetype,
            filePathInS3Bucket: S3_FILE_PREFIX.promotions,
          });

          return { [deviceType]: uploadResult.location };
        })
      );

      imagesData = Object.assign({}, ...uploadedImagesArray);
    }

    const promotions = await db.Promotions.create({
      title: title,
      description: description,
      category,
      slug: finalSlug,
      url,
      content,
      image: imagesData.web,
      mobileImage: imagesData.mobile
    }, { transaction })

    return { promotions, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }




  // Helper function to generate slug from title
  generateSlugFromTitle (title) {
    // Convert title to lowercase, replace spaces with underscores, and remove non-alphanumeric characters.
    let slug = title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');


    return this.ensureUniqueSlug(slug);
  }

  // Helper function to ensure unique slug
  async ensureUniqueSlug (baseSlug) {
    let newSlug = baseSlug;
    let counter = 1;

    // Check if the generated slug exists in the database
    while (await db.Promotions.findOne({ where: { slug: newSlug } })) {
      // If slug exists, append a counter to the slug
      newSlug = `${baseSlug}_${counter}`;
      counter++;
    }

    return newSlug;
  }


}
