
import * as express from 'express';  
import IRoutes from './irouter'; 
import { IndexController } from '../controllers/index.controller';


export class IndexRoutes extends IRoutes {

    constructor(app: express.Application) {

        super(app)

        let cotroller = new IndexController();
          
        this.router.get("/", cotroller.get);   
    }  
} 