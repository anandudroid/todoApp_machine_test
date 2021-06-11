import { TaskController } from '../controllers/task.controller';
import * as express from 'express';
import IRoutes from './irouter';

export class TaskRouter extends IRoutes {

    constructor(app: express.Application) {

        super(app)

             let cotroller = new TaskController();
     
             this.router.post("/", cotroller.createTask);
             this.router.get("/", cotroller.getAll); 
             this.router.delete("/:id", cotroller.deleteTask);
    }
}   