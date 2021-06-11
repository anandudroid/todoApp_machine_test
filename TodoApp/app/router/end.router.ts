



import * as express from 'express';
import IRoutes from './irouter';
import { EndController } from '../controllers/end.controller';

 
export class EndRoutes extends IRoutes {

    constructor(app: express.Application) {

        super(app)

        let cotroller = new EndController();
          
        this.router.get("*", cotroller.end);   
        this.router.post("*", cotroller.end);   
        this.router.put("*", cotroller.end);   
        this.router.delete("*", cotroller.end);   
        this.router.patch("*", cotroller.end);  
    }  
} 