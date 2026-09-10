import 'dotenv/config';
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const db = async () => {
    if (!MONGODB_URI) {
        console.log("MONGODB_URI Not found");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Db is connected");
    } catch (err) {
        console.log(`Error : ${err}`);
    }
};

export default db;