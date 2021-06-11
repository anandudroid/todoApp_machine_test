




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class GateWayTimeOutException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.GATEWAY_TIMEOUT) {
        super(ErrorCodes.GATEWAY_TIMEOUT, errorMessages)
    }
}