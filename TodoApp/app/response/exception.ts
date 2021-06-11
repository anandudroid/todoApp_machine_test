


export class IException {

    public message :string;
    public _appendings :string = null;

    constructor(public ststusCode :number, message :string) { 

        this.message = message;

    } 
 
    public get() {
 
        let status :any = this.ststusCode;
        let msg :any = this.message;
        let appendings = this._appendings;

        if (status === null && msg === null) {
            return null;
        }

        let r = {
            errorCode :status,
            errorMessage :msg
        }

        if (appendings == undefined || appendings === undefined || appendings == null || appendings === null) {
           return r
        } 

        r["desc"] = appendings;
 
        return r;
    }

    public append(message :any) :IException {
 
        let message_ = "";
        try {
            message_ = JSON.stringify(message);
        } catch (error) {
            message_ = message;
        }

        if (message_ == undefined || message_ === undefined || message_ == null || message_ === null) {
            return;
        }

        let m = this._appendings;
 
        if (m == undefined || m === undefined || m == null || m === null) {
            m = "";
        } 
  
        m = m + "(" + message_ + ")"

        this._appendings = m;
        
        return this;
    }
}