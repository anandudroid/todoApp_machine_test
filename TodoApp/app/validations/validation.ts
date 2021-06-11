


export class Validation {

    public static validate(value :any) :boolean {
 
        if (value === undefined) { return false; } 
        if (value === "undefined") { return false; } 
        if (value === null) { return false; }
 
        return true; 
    }
}