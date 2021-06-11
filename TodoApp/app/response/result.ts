


export class IResult<T> {
 
    constructor(public value :T) { 
    } 

    public get() {
        return this.value;
    }
}