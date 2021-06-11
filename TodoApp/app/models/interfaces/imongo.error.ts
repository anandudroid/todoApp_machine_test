import * as express from 'express';
import { IModel } from './imodel';

export interface IMongoError extends IModel {

    index: number;
    code: number;
    errmsg: string;
    name: string;
    driver: boolean;

    op: any;
    err: IMongoError;
    result: IMongoErrorResult;
}

export interface IMongoErrorResult extends IModel {

    writeErrors: IMongoErrorResultWriteErrors[];
    errmsg: string;
}

export interface IMongoErrorResultWriteErrors extends IModel {

    index: number;
    code: number;
    errmsg: string;
    op: any;
}

