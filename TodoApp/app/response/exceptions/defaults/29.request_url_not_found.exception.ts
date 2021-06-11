



import { IException } from "../../exception";
import { ErrorCodes } from "../../codes/status_codes";
import { ErrorMessages } from "../../codes/error_messages";
 


export class RequestedURLNotFoundException extends IException {
 
    constructor() {
        super(ErrorCodes.NOT_FOUND, ErrorMessages.REQUESTED_URL_NOT_FOUND)
    }
}