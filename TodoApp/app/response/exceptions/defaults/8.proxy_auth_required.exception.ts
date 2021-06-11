




import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 
export class ProxyAuthenticationRequiredException extends IException {
 
    constructor(errorMessages :string = ErrorMessages.PROXY_AUTHENTICATION_REQUIRED) {
        super(ErrorCodes.PROXY_AUTHENTICATION_REQUIRED, errorMessages)
    }
}