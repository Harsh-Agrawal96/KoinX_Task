import configDB from "./dbConfig.js";
import { libraryConfig } from "./packageConfig.js";


let configurations = (app) => {

    configDB(app);
    libraryConfig(app);
};


export { 
    configurations
}