




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes"; 
import { ErrorMessages } from "../../codes/error_messages";

export class FailedDependencyException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.FAILED_DEPENDENCY) {
        super(ErrorCodes.FAILED_DEPENDENCY, errorMessages)
    }
}