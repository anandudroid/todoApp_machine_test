



import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class ForbiddenException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.FORBIDDEN) {
        super(ErrorCodes.FORBIDDEN, errorMessages)
    }
}