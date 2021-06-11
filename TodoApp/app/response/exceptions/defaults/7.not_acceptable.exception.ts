



import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class NotAcceptablException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.NOT_ACCEPTABLE) {
        super(ErrorCodes.NOT_ACCEPTABLE, errorMessages)
    }
}