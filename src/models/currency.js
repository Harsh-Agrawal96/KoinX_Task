import mongoose from "mongoose";


const cryptoCurrency = new mongoose.Schema({
    coin : {
        type : String,
        require : true,
    },
    CoingeckoID : {
        type : String,
        require : true
    }
})


const currencies = mongoose.model('cryptoCurrency',cryptoCurrency);

export { currencies };