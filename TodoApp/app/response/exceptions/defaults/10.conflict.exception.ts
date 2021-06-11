




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class ConflictException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.CONFLICT) {
        super(ErrorCodes.CONFLICT, errorMessages)
    }
}