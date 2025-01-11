import bodyParser from "body-parser";


let libraryConfig = (app) => {
    
    // body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
}


export {
    libraryConfig
}