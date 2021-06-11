



import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class LengthRequiredException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.LENGTH_REQUIRED) {
        super(ErrorCodes.LENGTH_REQUIRED, errorMessages)
    }
}