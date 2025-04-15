import { Op } from 'sequelize'

import db from '@src/db/models'
import { getAll } from '@src/services/helper/crud'
import { ROLE } from '@src/utils/constant'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class GetTransactionUsersHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { type, user, email } = this.args

    let transactionUsers

    // if (userType === ROLE.ADMIN) {
    //   transactionUsers = await db.sequelize.query(`
    //   WITH RECURSIVE children AS (
    //   SELECT super_admin_user_id, email, parent_id, 0 AS relative_depth
    //   FROM super_admin_users
    //   WHERE super_admin_user_id = :id

    //   UNION ALL

    //   SELECT parent.super_admin_user_id, parent.email, parent.parent_id, child.relative_depth + 1
    //   FROM super_admin_users parent
    //   INNER JOIN children child ON child.super_admin_user_id = parent.parent_id AND parent.email ILIKE :filterEmail)

    //   SELECT * FROM children
    //   WHERE super_admin_user_id != :id;
    // `, {
    //     replacements: {
    //       id,
    //       filterEmail: `%${email}%`
    //     }
    //   })

    //   transactionUsers = transactionUsers[0]
    // } else if (userType === ROLE.ADMIN) {
    //   if (type === ROLE.ADMIN) {
    //     transactionUsers = await db.sequelize.query(`
    //     WITH RECURSIVE children AS (
    //     SELECT admin_user_id, email, parent_id, parent_type, tenant_id, allowed_currencies, 0 AS relative_depth
    //     FROM public.admin_users
    //     WHERE admin_user_id = :id AND tenant_id = :tenantId

    //     UNION ALL

    //     SELECT parent.admin_user_id, parent.email, parent.parent_id, parent.parent_type, parent.tenant_id, parent.allowed_currencies, child.relative_depth + 1
    //     FROM public.admin_users parent
    //     INNER JOIN children child ON child.admin_user_id = parent.parent_id  AND child.admin_user_id != parent.admin_user_id
    //     AND child.tenant_id = parent.tenant_id AND parent.email ILIKE :filterEmail)

    //     SELECT * FROM children
    //     WHERE admin_user_id != :id AND parent_type != 'superadmin';
    // `, {
    //       replacements: {
    //         id,
    //         tenantId: user.tenantId,
    //         filterEmail: `%${email}%`
    //       }
    //     })

    //     transactionUsers = transactionUsers[0]
    //   } else
    if (type === ROLE.USER) {
      transactionUsers = await getAll({
        model: db.User,
        data: { [Op.and]: [{ tenantId: user.tenantId }, { email: { [Op.iLike]: `%${email}%` } }] },
        attributes: ['email', 'parentId', 'userId', 'currencyCode']
      })
    }

    return { transactionUsers, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
