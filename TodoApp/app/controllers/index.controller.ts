


import { Request, Response } from 'express';
import { IController } from './icontroller';
import { TestedOK } from '../models/tested_ok';

export class IndexController extends IController {

    public get(req: Request, res: Response): void{

        res.send(new TestedOK());  
    }
} 