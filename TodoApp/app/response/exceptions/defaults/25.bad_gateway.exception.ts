




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class BadGateWayException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.BAD_GATEWAY) {
        super(ErrorCodes.BAD_GATEWAY, errorMessages)
    }
}