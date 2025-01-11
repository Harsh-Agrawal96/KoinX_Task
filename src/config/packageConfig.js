import bodyParser from "body-parser";
import cors from "cors"


let libraryConfig = (app) => {

    const corsConfig = {
        origin : "*",
        credential: true,
        methods : ["GET", "POST", "PUT", "DELETE"],
    };

    app.use(cors(corsConfig));
    app.options("", cors(corsConfig));
    
    // body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
}


export {
    libraryConfig
}