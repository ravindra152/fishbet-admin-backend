import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'


export class ToggleAdminUserHandler extends BaseHandler {
    async run() {
        const { adminUserId } = this.args

        try {
            const adminUser = await db.AdminUser.findOne({
                where: { adminUserId },
            })
            adminUser.isActive = !adminUser.isActive
            await adminUser.save()
            return { success: true }
        }
        catch (error) {
            return this.handleError(error)
        }
    }
}
