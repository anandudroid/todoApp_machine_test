



import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes"; 
import { ErrorMessages } from "../../codes/error_messages";

export class UnProcessableEntityException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.UNPROCESSABLE_ENTITY) {
        super(ErrorCodes.UNPROCESSABLE_ENTITY, errorMessages)
    }
}
