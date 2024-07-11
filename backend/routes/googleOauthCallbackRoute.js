import jwt from 'jsonwebtoken';
import { getGoogleUser } from '../util/getGoogleUser.js';
import { updateOrCreateUserFromOauth } from '../util/updateOrCreateUserFromOauth.js';

export const googleOauthCallbackRoute = {
    path: '/auth/google/callback',
    method: 'get',
    handler: async (req, res) => {
        const { code } = req.query;
        const oauthUserInfo = await getGoogleUser({ code });
        if (!oauthUserInfo) {
            return res.status(400).json({ error: 'Failed to retrieve user information from Google' });
        }


        const updatedUser = await updateOrCreateUserFromOauth({ oauthUserInfo });



        console.log(updatedUser);

        if (!updatedUser) {
            return res.status(500).json({ error: 'Failed to update or create user' });
        }

        const { _id: id, isVerified, email, info } = updatedUser;

        jwt.sign(
            { id, isVerified, email, info },
            process.env.VITE_JWT_SECRET,
            (err, token) => {
                if (err) return res.sendStatus(500);
                res.redirect(`http://localhost:5173/login?token=${token}`);
            });
    }
}