import { IException } from "../exception";
import { ErrorCodes } from "../codes/status_codes"; 
import { ErrorMessages } from "../codes/error_messages";

export class ExistingTypeException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.VALUE_ALREADY_EXISTS) {
        super(ErrorCodes.VALUE_ALREADY_EXISTS, errorMessages)
    }
}