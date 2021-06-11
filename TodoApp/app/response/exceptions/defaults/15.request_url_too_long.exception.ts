





import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class RequestURLTooLongException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.REQUEST_URL_TOO_LONG) {
        super(ErrorCodes.REQUEST_URL_TOO_LONG, errorMessages)
    }
}