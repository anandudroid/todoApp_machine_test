




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes"; 
import { ErrorMessages } from "../../codes/error_messages";

export class ExpectationFailedException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.EXPECTATION_FAILED) {
        super(ErrorCodes.EXPECTATION_FAILED, errorMessages)
    }
}