




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class GoneException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.GONE) {
        super(ErrorCodes.GONE, errorMessages)
    }
}