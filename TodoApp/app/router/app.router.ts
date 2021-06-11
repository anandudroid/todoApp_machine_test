import * as express from 'express';    
import { IndexRoutes } from './index.router';
import { TaskRouter } from './task.router';

class AppRoutes {
  
  constructor() {

  }
      public forward(app: express.Application): void {
   
        app.use("/", new IndexRoutes(app).router);  
        app.use("/todoapp/", new TaskRouter(app).router); 
    }
}

export default AppRoutes;