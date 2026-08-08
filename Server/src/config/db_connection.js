import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
 const db = async () =>{
    if(!MONGODB_URI){
        console.log("MONGODB_URI Not found")
        return;
    }
     await mongoose.connect(MONGODB_URI)
     .then(() =>{
        console.log(`Db is connected`);
     })
     .catch((err) =>{
        console.log(`Error : ${err}`)
     })
 }
export default db;