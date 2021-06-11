




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class PaymentRequiredException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.PAYMENT_REQUIRED) {
        super(ErrorCodes.PAYMENT_REQUIRED, errorMessages)
    }
}