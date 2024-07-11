import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import { connectToDb, getDbConnection } from "../db.js";

export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        const updates = (({ favoriteFood, hairColor, bio }) => ({
            favoriteFood,
            hairColor,
            bio
        }))(req.body);

        if (!authorization) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.VITE_JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Unable to verify token' });

            const { id, isVerified } = decoded;


            if (id !== userId) return res.status(403).json({ message: 'Not allow to update user data' });
            if (!isVerified) return res.status(403).json({ message: 'Verify your email to update data' });

            connectToDb();

            const db = getDbConnection('auth-project');

            const result = await db.collection('users').findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { info: updates } },
                { returnOriginal: false },
            );

            console.log(result);
            const { email, info } = result;

            jwt.sign({ id, isVerified, email, info }, process.env.VITE_JWT_SECRET, { expiresIn: '2d' }, (err, token) => {

                if (err) {
                    return res.status(200).json(err);
                }

                res.status(200).json({ token });

            })


        })
    }

}