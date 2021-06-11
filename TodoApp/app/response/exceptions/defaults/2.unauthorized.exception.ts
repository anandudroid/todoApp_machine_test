


import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes"; 
import { ErrorMessages } from "../../codes/error_messages";

export class UnAuthorizedException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.UNAUTHORIZED) {
        super(ErrorCodes.UNAUTHORIZED, errorMessages)
    }
}