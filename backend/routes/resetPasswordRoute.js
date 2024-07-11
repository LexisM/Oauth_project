import bcrypst from 'bcrypt';
import { connectToDb, getDbConnection } from "../db.js";

export const resetPasswordRoute = {
    path: '/api/users/:passwordResetCode/reset-password',
    method: 'put',
    handler: async (req, res) => {
        const { passwordResetCode } = req.params;
        const { newPassword } = req.body;


        connectToDb();

        const db = getDbConnection('auth-project');

        const newPasswordHash = await bcrypst.hash(newPassword, 10);

        const result = await db.collection('users').findOneAndUpdate(
            { passwordResetCode }, {
            $set: { passwordHash: newPasswordHash },
            $unset: { passwordResetCode: "" }
        });

        if (result.lastErrorObject === 0) return res.sendStatus(404);

        res.sendStatus(200);
    }
}
