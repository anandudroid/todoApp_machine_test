





import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class RequestEntityTooLargeException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.REQUEST_ENTITY_TOO_LARGE) {
        super(ErrorCodes.REQUEST_ENTITY_TOO_LARGE, errorMessages)
    }
}