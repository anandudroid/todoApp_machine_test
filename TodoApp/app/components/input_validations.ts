import { Request } from 'express';
import { IResponse } from "../response/responss";
import { PreConditionFailedException } from "../response/exceptions/defaults/13.precondition_failed.exception";
import { ErrorMessages } from "../response/codes/error_messages";
import { StringValidation } from "../validations/string.validation";
import { DateValidation } from '../validations/date.validation';
import { RequestParamParser } from './req_param_parser';


export class InputValidations {

    public static isNotNull(data: any): Promise<any> {
        return new Promise((resolve, reject) => {

            if (data == undefined || data == null) {
                reject(IResponse.Exception(new PreConditionFailedException().append("invalid request")));
                return;
            }
            resolve(data);
        });
    }

    public static validateRequestParam(req: Request, field: string): Promise<string> {

        return new Promise((resolve, reject) => {

            let fValue = RequestParamParser.parseString(req, field);
            if (StringValidation.validate(fValue) == true) {

                resolve(fValue);
            } else {

                reject(IResponse.Exception(new PreConditionFailedException(ErrorMessages.INVALID_PARAM_FIELD).append(field)));
            }
        });
    }

    public static validateField(key: string, value: string): Promise<string> {

        return new Promise((resolve, reject) => {

            if (StringValidation.validate(value) == true) {

                resolve(value);
            } else {

                reject(IResponse.Exception(new PreConditionFailedException(ErrorMessages.INVALID_FIELD).append(key + " : " + value)));
            }
        });
    }

    public static validateDate(date: string): Promise<string> {

        return new Promise((resolve, reject) => {

            if (DateValidation.validate(date) == true) {
                resolve(date)
            } else {
                reject(IResponse.Exception(new PreConditionFailedException(ErrorMessages.INVALID_DATE).append("date")));
            }

        })
    }
}