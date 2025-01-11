
import { Record } from "../models/records.js";
import { currencies } from "../models/currency.js";


let getcoinName = async (coinId) => {

    return new Promise( async (resolve,reject) => {
        try{

            const coinDetails = await currencies.findOne({
                CoingeckoID : coinId
            })

            resolve(coinDetails);
        }catch(err){
            reject(err);
        }
    })
}

let getLatestRecord = async (count, coinName ) => {

    return new Promise( async (resolve,reject) => {
        try{

            const records = await Record.find({ 
                coin: coinName 
            })
            .sort({ timeStamp: -1 })
            .limit(count)

            resolve(records);
        }catch(err){
            reject(err);
        }
    });
};


export{
    getLatestRecord,
    getcoinName
}