




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes"; 
import { ErrorMessages } from "../../codes/error_messages";

export class RequestedRangeNotSatisfyException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.REQUESTED_RANGE_NOT_SATISFIABLE) {
        super(ErrorCodes.REQUESTED_RANGE_NOT_SATISFIABLE, errorMessages)
    }
}