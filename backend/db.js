import { MongoClient } from "mongodb";

const uri = "mongodb+srv://webadmin:v7YZNsGVlev0EF6Y@datarep.wmalsu7.mongodb.net/?retryWrites=true&w=majority&appName=DataRep";

const client = new MongoClient(uri);
let dbConnection = null;



export const connectToDb = async () => {
    if (dbConnection) return dbConnection;

    try {

        await client.connect();
        console.log("Connected successfully to server");
        const db = client.db("auth-project");
        dbConnection = db;
        return db;

    } catch (err) {
        console.error(err);
    }
};

export const getDbConnection = () => {
    if (!dbConnection) throw new Error("No database connected!");
    return dbConnection;
};
const main = async () => {
    try {
        await connectToDb();
    } catch (err) {
        console.error(`Error connecting to DB: ${err}`);
    }
};

export const closeDatabaseConnection = async () => {
    if (client.isConnected()) {
        await client.close();
        console.log("Database connection closed");
    }
};

main();

