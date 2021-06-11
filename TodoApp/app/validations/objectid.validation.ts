import { Validation } from "./validation";
import { Types } from "mongoose";

export class ObjectIdValidation extends Validation{

    public static validate(value :any): boolean{
        var ObjectID = Types.ObjectId;
        try{
            if(ObjectID.isValid(value)){
                if(new ObjectID(value) == value){ 
                    return true } 
            }
        }catch (error) {
            return false;
        }
      
    }
}