
import * as express from 'express';  
import { ILogger } from '../ilogger';
 
class LogMiddleware {
 
    public exe(request: express.Request, response: express.Response, next) {
 
        let body = request.body;

       // console.log(`LogMiddleware => ${body}`);

        if (body === undefined || body === null) {

          //  console.log(`LogMiddleware => body = null`);
            body = "";
        } else if (body instanceof Object) {

          //  console.log(`LogMiddleware => JSON.stringify(body)`);
            body = JSON.stringify(body);
        } else {
            
        }
        
        ILogger.log('LogMiddleware', request.hostname + request.method + request.path + body) 
        next();  
     }
}

export {LogMiddleware}

 



