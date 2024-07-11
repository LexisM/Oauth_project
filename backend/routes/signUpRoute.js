import { connectToDb, getDbConnection } from "../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { sendEmail } from "../util/sendEmail.js";


export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        connectToDb();
        console.log('JWT Secret:', process.env.VITE_JWT_SECRET);
        const db = getDbConnection('auth-project');



        const user = await db.collection('users').findOne({ email });

        if (user) {
            res.status(409).send('User already exists');
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const verificationString = uuid();

        const statingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: ''
        };

        //inserting data of user in db
        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: statingInfo,
            isVerified: false,
            verificationString,
        });

        const { insertedId } = result;

        //sending email to user with verification link

        try {
            await sendEmail({
                to: email,
                from: 'lexismfb@gmail.com',
                subject: 'Verify your account',
                text: `Verify your account,
                click here: http://localhost:5173/verify-email/${verificationString}`,
            });
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }

        //signing user data with jwt to crete token
        jwt.sign({
            id: insertedId,
            email,
            info: statingInfo,
            isVerified: false
        },
            //sending secret key
            process.env.VITE_JWT_SECRET,
            {

                expiresIn: '2d'
            },
            // Error handling 
            (err, token) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.status(201).json({ token });
            }
        )

    }

}