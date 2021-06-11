




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes"; 
import { ErrorMessages } from "../../codes/error_messages";

export class InternalServerErrorException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.INTERNAL_SERVER_ERROR) {
        super(ErrorCodes.INTERNAL_SERVER_ERROR, errorMessages)
    }
}