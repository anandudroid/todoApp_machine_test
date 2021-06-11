

import { IResult } from "./result";
import { IException } from "./exception";


export class IResponse<R extends IResult<any>, E extends IException> {

    public _result :R = null;
    public _error :E = null;

    constructor(result :R, error :E) {
 
        this._result = result;
        this._error = error;
    }
 
    public static Build(result :IResult<any>, error: IException) {
        return new IResponse(result, error).get();
    }

    public static Result(result :IResult<any>) {
        return new IResponse(result, null).get();
    }

    public static Exception(error :IException) {
        return new IResponse(null, error).get();
    }

    private get() {

        let r :any = this._result;
        let e :any = this._error;

        if (r === null) {
            r = new IResult(null);
        }

        if (e === null) {
            e = new IException(null, null);
        }


        return {
            result :r.get(),
            error :e.get()
        }
    }

}