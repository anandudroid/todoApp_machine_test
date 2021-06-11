import { Builder } from './builder';
import { IMongoError, IMongoErrorResultWriteErrors, IMongoErrorResult } from '../../models/interfaces/imongo.error';
import { StringValidation } from '../../validations/string.validation';
import { InternalServerErrorException } from '../../response/exceptions/defaults/23.internal_server_error.exception';
import { ArrayValidation } from '../../validations/array.validations';
import { ILogger } from '../../ilogger';
import { IResponse } from '../../response/responss';

export class MongoErrorBilder extends Builder {

    private error: IMongoError;

    constructor(error: string) {
        super();
        ILogger.log("MongoErrorBilder.error", error);

        try {
            try {
                this.error = JSON.parse(error)
            } catch (e) {
                error.replace(undefined, "undefined_")
                this.error = JSON.parse(error)
            }
        } catch (error) {
            error = null;
        }
    }

    public build(): MongoErrorBilder {
        return this;
    }

    public isDuplicateError(): boolean{
       
      return this.getErrorCode() == 11000; 
    }

    public getError() {

        let errMsg = null;

        if (this.error == undefined) {
            errMsg = null;
        }

        try {

            errMsg = this.getErrorMsg();
        } catch (error) {
            ILogger.log("MongoErrorBilder.getError.catch", JSON.stringify(error))
        }

        if (errMsg == null) {
            errMsg = "Database error";
        }
        return new InternalServerErrorException().append(errMsg);
    }

    public getErrorCode() {

        if (this.error == undefined) {
            return null;
        }

        return this.error.code;
    }

    private getErrorMsg() {

        try {

            let errMsg = null;

            if (this.error == null) {
                return null;
            }

            if (StringValidation.validate(this.error.errmsg)) { errMsg = this.error.errmsg; }
            else if (this.error.err != undefined && this.error.err != null) {

                if (StringValidation.validate(this.error.err.errmsg)) { errMsg = this.error.err.errmsg; }
            } else if (this.getResult() != null) {

                if (StringValidation.validate(this.getResult().errmsg)) { errMsg = this.getResult().errmsg; }
            } else if (this.getWriteErrors() != null) {

                if (StringValidation.validate(this.getWriteErrors()[0].errmsg)) { errMsg = this.getWriteErrors()[0].errmsg; }
            }

            return errMsg;

        } catch (error) {
            return null;
        }
    }

    private getResult(): IMongoErrorResult {

        if (this.error == undefined) {
            return null;
        }

        if (this.error.result == undefined) {
            return null;
        }

        return this.error.result;
    }

    private getWriteErrors(): IMongoErrorResultWriteErrors[] {

        let result = this.getResult();

        if (result == null) {
            return null;
        }

        if (ArrayValidation.validate(result.writeErrors) == false) {
            return null;
        }

        return result.writeErrors;
    }

    // extract error occured entrys/rows from mongoose error result
    public getErrorRowsFromWriteErrors() {

        return new Promise((resove, reject) => {

            let writeErrors: IMongoErrorResultWriteErrors[] = this.getWriteErrors();

            if (ArrayValidation.validate(writeErrors) == false) {

                ILogger.log("MongoErrorBilder.getErrorRowsFromWriteErrors", "writeErrors == undefined");
                reject(IResponse.Exception(new InternalServerErrorException()));
                return null;
            }

            let rows: any[] = new Array<any>();

            writeErrors.forEach(writeError => {
                if (writeError.op != undefined && writeError.op != null) {
                    rows.push(writeError.op);
                }
            });

            resove(rows);
        })
    }


    private isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}