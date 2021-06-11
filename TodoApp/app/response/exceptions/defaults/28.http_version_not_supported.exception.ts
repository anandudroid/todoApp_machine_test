




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class HTTPVersionNotSupportedException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.HTTP_VERSION_NOT_SUPPORTED) {
        super(ErrorCodes.HTTP_VERSION_NOT_SUPPORTED, errorMessages)
    }
}