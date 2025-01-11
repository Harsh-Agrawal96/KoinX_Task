
let lastApiCallTime = null;

export const getLastApiCallTime = () => lastApiCallTime;
export const setLastApiCallTime = (time) => { lastApiCallTime = time; };


// time for which api will be disable
export const apiFrequency = 2 * 60 * 60 * 1000;


// currencies for which data need to fetch (we can increase it but there details on currency model)
export const currency = ['Bitcoin', 'Matic', 'Ethereum'];