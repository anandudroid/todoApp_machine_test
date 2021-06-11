




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class UnsupportedMediaTypeException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.UNSUPPORTED_MEDIA_TYPE) {
        super(ErrorCodes.UNSUPPORTED_MEDIA_TYPE, errorMessages)
    }
}