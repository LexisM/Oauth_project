import { connectToDb, getDbConnection } from "../db.js";

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
    const {
        id: googleId,
        verified_email: isVerified,
        email
    } = oauthUserInfo;

    connectToDb();
    const db = getDbConnection('auth-project');
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
        const result = await db.collection('users').findOneAndUpdate(
            { email },
            { $set: { googleId, isVerified } },
            { returnNewDocument: true },
        );
        return result;
    } else {
        const result = await db.collection('users').insertOne({
            googleId,
            email,
            isVerified,
            info: {},
        });
        console.log("inserted one : " + result);
        const userNew = await db.collection('users').findOne(result.insertedId);
        if (userNew) return userNew;

    }
}