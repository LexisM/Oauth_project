import { ObjectId } from "mongodb";

import jwt from "jsonwebtoken";
import { connectToDb, getDbConnection } from "../db.js";

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        const { verificationString } = req.body;
        connectToDb();
        const db = getDbConnection('auth-project');
        const result = await db.collection('users').findOne({
            verificationString
        });



        if (!result) return res.status(401).json({ message: "The email verification code is invalid" });

        const { _id: id, email, info } = result;



        await db.collection('users').updateOne({ _id: new ObjectId(id) }, {
            $set: {
                isVerified: true
            }
        });

        jwt.sign({ id, email, isVerified: true, info }, process.env.VITE_JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200).json({ token });
        });
    }

}