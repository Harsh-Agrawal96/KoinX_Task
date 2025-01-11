
import { getLatestRecord, getcoinName } from "../Services/queryRecord.Services.js";


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


export{
    getLastRecord
}