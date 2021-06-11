




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class ServiceUnAvailableException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.SERVICE_UNAVAILABLE) {
        super(ErrorCodes.SERVICE_UNAVAILABLE, errorMessages)
    }
}