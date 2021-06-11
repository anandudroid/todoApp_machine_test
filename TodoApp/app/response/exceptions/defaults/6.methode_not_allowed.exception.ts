



import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class MethodeNotFoundException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.METHODE_NOT_ALLOWED) {
        super(ErrorCodes.METHODE_NOT_ALLOWED, errorMessages)
    }
}