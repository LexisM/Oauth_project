import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectToDb, getDbConnection } from "../db.js";

export const loginRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        connectToDb();
        const db = getDbConnection('auth-project');
        const user = await db.collection('users').findOne({ email });

        if (!user) return res.sendStatus(401);

        const { _id: id, isVerified, passwordHash, info } = user;

        const isCorrect = await bcrypt.compare(password, passwordHash);

        if (isCorrect) {
            jwt.sign({ id, isVerified, email, info }, process.env.VITE_JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                if (err) { return res.sendStatus(500); }

                res.status(200).send({ token });
            })
        } else {
            res.sendStatus(401);
        }
    }
}