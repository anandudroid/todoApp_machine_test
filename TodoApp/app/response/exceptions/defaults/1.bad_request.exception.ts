


import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes"; 
import { ErrorMessages } from "../../codes/error_messages";

export class BadRequestException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.BAD_REQUEST) {
        super(ErrorCodes.BAD_REQUEST, errorMessages)
    }
}