


import { Validation } from './validation';

export class StringValidation extends Validation {

    public static validate(str :string) :boolean {
  
        if (super.validate(str) == false) { return false; } 
        if (str === "" || str === " ") { return false; }

        //str = str.trim();  // old code
        if (typeof str == "string") {
            str = str.trim();
        }
        
        if (str === "" || str === " ") { return false; }

        return true; 
    }
}