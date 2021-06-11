




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class NotImplementedException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.NOT_IMPLEMENTED) {
        super(ErrorCodes.NOT_IMPLEMENTED, errorMessages)
    }
}