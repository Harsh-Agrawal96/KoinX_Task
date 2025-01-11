
import { Record } from "../models/records.js";
import { currencies } from "../models/currency.js";


let getCurrencyDetails = async ( currency ) => {

    return new Promise( async (resolve,reject) => {
        try{

            let currencyDetail = [];
            for (const i of currency) {
                const Details = await currencies.findOne({ coin: i });
                currencyDetail.push(Details);
            }

            resolve(currencyDetail);
        }catch(err){
            reject(err);
        }
    });
};


// background job(store in db)
let storeRequestedRecord = async ( currencyDetail, currencyData ) => {

    return new Promise( async (resolve,reject) => {
        try{

            for (const i of currencyDetail ) {

                const data = currencyData[i.CoingeckoID];
                const record = new Record({
                    coin : i.coin,
                    price : (data['usd']).toFixed(2),
                    marketCap : (data['usd_market_cap']).toFixed(2),
                    change24h : (data['usd_24h_change']).toFixed(2),
                })
                await record.save();
            }

            resolve();
        }catch(err){
            reject(err);
        }
    })
}


export {
    getCurrencyDetails,
    storeRequestedRecord
}


