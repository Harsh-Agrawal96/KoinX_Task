import configDB from "./dbConfig.js";


let configurations = (app) => {

    configDB(app);
};


export { 
    configurations
}