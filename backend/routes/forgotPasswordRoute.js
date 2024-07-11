import { v4 as uuid } from 'uuid';
import { sendEmail } from "../util/sendEmail.js";
import { connectToDb, getDbConnection } from "../db.js";

export const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        const { email } = req.params;

        await connectToDb();
        const db = getDbConnection('auth-project');

        const passwordResetCode = uuid();

        const result = await db.collection('users').updateOne(
            { email },
            { $set: { passwordResetCode } }
        );

        if (!result) {
            console.error('No result returned from updateOne operation');
            return res.status(500).json({ error: 'Internal server error' });
        }



        if (result.modifiedCount > 0) {

            try {
                await sendEmail({
                    to: email,
                    from: 'lexismfb@gmail.com',
                    subject: 'Password Reset Code',
                    text: `Your password reset code is: 
                    http://localhost:5173/reset-password/${passwordResetCode}`
                });

            } catch (e) {
                res.sendStatus(500);
            }


        }
        res.sendStatus(200);
    }
}
