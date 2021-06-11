




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class NotFoundException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.NOT_FOUND) {
        super(ErrorCodes.NOT_FOUND, errorMessages)
    }
}