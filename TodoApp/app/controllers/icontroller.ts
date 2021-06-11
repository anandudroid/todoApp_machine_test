

import {Request, Response, NextFunction} from 'express';
import { IResponse } from '../response/responss';
import { IException } from '../response/exception';
 
export class IController {
 
    public action1(req: Request, res: Response, next :NextFunction)  {
        res.send(IResponse.Exception(new IException(200, "IController")));
    }

    public action2(req: Request, res: Response, next :NextFunction) {
        res.send(IResponse.Exception(new IException(200, "IController")));
    }

    public action3(req: Request, res: Response, next :NextFunction) {
        res.send(IResponse.Exception(new IException(200, "IController")));
    }

    public action4(req: Request, res: Response, next :NextFunction) {
        res.send(IResponse.Exception(new IException(200, "IController")));
    }  
}