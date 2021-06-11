
import * as express from 'express'; 

class IRoutes {
 
    router: express.Router;

    constructor(app: express.Application) { 
        this.router = express.Router();
    } 
}

export default IRoutes;