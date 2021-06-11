




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class PreConditionFailedException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.PRECONDITION_FAILED) {
        super(ErrorCodes.PRECONDITION_FAILED, errorMessages)
    }
}