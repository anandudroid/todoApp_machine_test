import { Request, Response, NextFunction } from 'express';
import { StringValidation } from '../validations/string.validation';


export class RequestParamParser {

    public static parseString(req :Request, key :string) :string {

        try {
                
            let value = req.params[key];
            if (StringValidation.validate(value) == true) {

                return value
            } else {
                return null;
            }
        } catch (error) {
            return null;
        } 
    }
}