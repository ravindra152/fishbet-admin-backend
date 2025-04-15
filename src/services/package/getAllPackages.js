import { Errors } from '@src/errors/errorCodes';
import { AppError } from '@src/errors/app.error';
import db from '@src/db/models';
import ajv from '@src/libs/ajv';
import { BaseHandler } from '@src/libs/logicBase';
import { SUCCESS_MSG } from '@src/utils/success';
import { pageValidation } from '@src/utils/common';

const schema = {
  type: 'object',
  properties: {
    limit: { type: 'string' },
    pageNo: { type: 'string' }
  },
  required: ['limit', 'pageNo']
};

;

export class GetAllPackagesHandler extends BaseHandler {
  get constraints() {
    return constraints;
  }

  async run() {
    const { limit, pageNo } = this.args;

    const { page, size } = pageValidation(pageNo, limit);
    const offset = (page - 1) * size;

    const packages = await db.Package.findAndCountAll({
      order: [['id', 'ASC']],
      limit: size,
      offset
    });

    if (!packages) throw new AppError(Errors.PACKAGE_NOT_EXISTS);

    return {
      packages, message: SUCCESS_MSG.GET_SUCCESS
    };
  }
}
