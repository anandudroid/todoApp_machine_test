



import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class RequestTimeOutException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.REQUEST_TIMEOUT) {
        super(ErrorCodes.REQUEST_TIMEOUT, errorMessages)
    }
}