import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


function configDB (app) {

    const dbURL = process.env.DB_URL;

    mongoose.connect( dbURL )
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log(err))
}


export default configDB;