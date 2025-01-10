
import express from "express";
import dotenv from "dotenv";
import { configurations } from "./src/config/config.js";
import { allV1Routes } from "./src/Routes/api/v1Routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

configurations(app);
allV1Routes(app);


app.listen( port, () => {
    console.log(`Server is runing at ${port}`);
})
