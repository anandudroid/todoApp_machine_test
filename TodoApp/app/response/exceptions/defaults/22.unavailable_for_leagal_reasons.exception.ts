




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes"; 
import { ErrorMessages } from "../../codes/error_messages";

export class UnavailableForLeagelReasonsException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.UNAVAILABLE_FOR_LEGAL_REASONS) {
        super(ErrorCodes.UNAVAILABLE_FOR_LEGAL_REASONS, errorMessages)
    }
}