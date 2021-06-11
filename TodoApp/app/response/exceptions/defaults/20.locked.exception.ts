




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes"; 
import { ErrorMessages } from "../../codes/error_messages";

export class LockedException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.LOCKED) {
        super(ErrorCodes.LOCKED, errorMessages)
    }
}