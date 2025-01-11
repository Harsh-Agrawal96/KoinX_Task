import * as addService from "../Services/addRecord.Services.js";
import { apiFrequency, getLastApiCallTime, setLastApiCallTime, currency } from "../utils/variable.js";


// background job 
let storeRequestedCurrency = async (req,res) => {

    const currentTime = new Date().getTime();

    // check for the api is disable or not (only call once and available after certain time)
    if (getLastApiCallTime()) {
        const nextApiAvailableTime = getLastApiCallTime() + apiFrequency;

        if ( currentTime < nextApiAvailableTime ) {
            const remainingTimeMs = nextApiAvailableTime - currentTime;

            const hours = Math.floor(remainingTimeMs / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTimeMs % (1000 * 60)) / 1000);

            const nextAvailableTime = `available in ${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
            return res.status(429).json({
                message: `API limit reached, It will be available back in ${nextAvailableTime} `
            });
        }
    }
    setLastApiCallTime(currentTime);

    // if api available
    try{
        // currency are dynamic(can be increase or decrease)
        await performStore(currency);
    }catch(err){
        return res.status(500).json({ message : "Something went wrong" });
    }

    return res.status(200).json({message : "Fetched data and stored in db successfully"})
}

let performStore = async ( currency ) => {

    // getting the CoingeckoId for the currencies
    const currencyDetail = await addService.getCurrencyDetails(currency);
    if( currency.length !== currencyDetail.length ){
        throw new Error('Internal server Error');
    }

    const currencyId = [];
    currencyDetail.map( (i) => currencyId.push(i.CoingeckoID) );
    const queryCoins = currencyId.join('%2C');

    // fetching the data from the Coingecko api
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${queryCoins}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
    const options = {method: 'GET', headers: {accept: 'applicationjson'}};

    await fetch(url, options)
    .then( async (res) => {
        const jsonObj = await res.json();
        
        // store in db
        await addService.storeRequestedRecord(currencyDetail, jsonObj );
    })
    .catch(err => { throw new Error() });

    return;
}



export{
    storeRequestedCurrency
}

