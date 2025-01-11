import mongoose from "mongoose";


// requested crypto currency data records
const requestedRecord = new  mongoose.Schema({
    coin : {
        type : String,
        require : true,
    },
    price : {
        type: mongoose.Schema.Types.Decimal128,
        require : true,
    },
    marketCap : {
        type: mongoose.Schema.Types.Decimal128, 
        require : true,
    },
    change24h : {
        type: mongoose.Schema.Types.Decimal128,
        require : true,
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }
});


const Record = mongoose.model('requestedRecords', requestedRecord);

export { Record }