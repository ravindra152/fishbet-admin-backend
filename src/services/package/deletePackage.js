import { Errors } from '@src/errors/errorCodes';
import { AppError } from '@src/errors/app.error';
import db from '@src/db/models';
import { BaseHandler } from '@src/libs/logicBase';
import ajv from '@src/libs/ajv';
import { SUCCESS_MSG } from '@src/utils/success';

const schema = {
  type: 'object',
  properties: {
    id: { type: 'integer' }
  },
  required: ['id']
};

;

export class DeletePackageHandler extends BaseHandler {
  get constraints() {
    return constraints;
  }

  async run() {
    const { id } = this.args;
    const transaction = this.dbTransaction

    const packageData = await db.Package.findOne({
      where: { id}
    });

    if (!packageData) throw new AppError(Errors.PACKAGE_NOT_FOUND);


    await packageData.destroy({ transaction });

    return { success: true, message : SUCCESS_MSG.DELETE_SUCCESS };
  }
}
