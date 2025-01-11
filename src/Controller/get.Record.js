
import { getLatestRecord, getcoinName } from "../Services/queryRecord.Services.js";
import { deviationApiLimit } from "../utils/variable.js";


let getLastRecord = async (req,res) => {

    try{
        const coin = req.body.coin;
        const coinDetail = await getcoinName(coin);
        if( !coinDetail ){
            return res.status(500).json({ message : "Something went wrong" });
        }

        const record = await getLatestRecord(1,coinDetail.coin);
        if( record.length == 0 ){
            return res.status(500).json({message : "Data unavailable"});
        }

        return res.status(200).json({
            price : record[0].price,
            marketCap : record[0].marketCap,
            "24hChange" : record[0].change24h
        })
    }catch(err){
        res.status(500).json({ message : "Something went wrong" });
    }
}

let coinLatestRecord = async (req,res) => {

    try{
        const coin = req.body.coin;
        const coinDetail = await getcoinName(coin);
        if( !coinDetail ){
            return res.status(500).json({ message : "Something went wrong" });
        }

        const record = await getLatestRecord(deviationApiLimit,coinDetail.coin);
    

        const prices = record.map( (i) =>
            parseFloat(i.price.toString())
        )

        const priceDeviation = deviationCalculation(prices);

        return res.status(200).json({
            deviation : priceDeviation
        })
    }catch(err){
        res.status(500).json({ message : "Something went wrong" });
    }
}

let deviationCalculation = (prices) => {
    
    if (prices.length === 0) {
        return 0;
    }

    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
        sum += prices[i];
    }
    const mean = sum / prices.length;

    const squaredDifferences = prices.map(price => 
        Math.pow(price - mean, 2)
    );

    let totalSquaredDifferences = 0;
    for (let i = 0; i < squaredDifferences.length; i++) {
        totalSquaredDifferences += squaredDifferences[i];
    }

    let variance = totalSquaredDifferences / squaredDifferences.length;
    let standardDeviation = Math.sqrt(variance);

    return standardDeviation.toFixed(2);
}


export{
    getLastRecord,
    coinLatestRecord,
}