import express from "express";
import { storeRequestedCurrency } from "../../Controller/add.Record.js";
import * as queryRecord from "../../Controller/get.Record.js";

let Route = express.Router();

let allV1Routes = (app) => {

    // background job initiates(can call background job from this api)
    Route.get("/store", storeRequestedCurrency );

    Route.get("/stats", queryRecord.getLastRecord );

    Route.get("/deviation", queryRecord.coinLatestRecord);

    return app.use("/",Route);
};


export {
    allV1Routes
}