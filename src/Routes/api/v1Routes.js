import express from "express";
import { storeRequestedCurrency } from "../../Controller/add.Record.js";


let Route = express.Router();

let allV1Routes = (app) => {

    Route.get("/store", storeRequestedCurrency );

    return app.use("/",Route);
};


export {
    allV1Routes
}