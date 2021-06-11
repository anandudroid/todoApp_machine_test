



import { Request, Response, NextFunction} from 'express';
import { IController } from './icontroller'; 
import { IResponse } from '../response/responss';
import { RequestedURLNotFoundException } from '../response/exceptions/defaults/29.request_url_not_found.exception';

export class EndController extends IController {

    public end(req: Request, res: Response, next :NextFunction) { 
        res.send(IResponse.Exception(new RequestedURLNotFoundException())); 
    } 
} 