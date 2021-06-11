import { Validation } from './validation';

export class ArrayValidation extends Validation {

    public static validate(array: any): boolean {

        if (super.validate(array) == false) { return false; }

        try {

            if(Array.isArray(array)) { return true }

            return Array.isArray(JSON.parse(array))

        } catch (error) {

            return false;
            // try {
            //     return Array.isArray(array);
            // } catch (error) {
            //     return false;
            // }
        }

    }

    public static isEmpty(array: any[]): boolean {

        if (ArrayValidation.validate(array)) {

            return array.length == 0;
        }
        return null;

    }

    public static stringToArry(array: any): Array<any> {

        if (Validation.validate(array) == false) { return null }

        if (typeof array == 'string') {

            try {

                let array_ = JSON.parse(array);

                if (ArrayValidation.validate(array_)) {
                    return array_;
                }
            } catch (error) {
                return null;
            }
        }

        if (ArrayValidation.validate(array)) {
            return array;
        }

        return null;
    }

    public static getStringArray(array: any): Array<String> {

        if (Validation.validate(array) == false) { return null }

        let array_ = ArrayValidation.stringToArry(array);

        if (array_ == null) {
            return null;
        }

        for (var i = 0; i < array_.length; i++) {

            if (typeof array_[i] !== 'string') {
                // return null
                array_[i] = String(array_[i])
            }
            //array_[i] = array_[i].replace(/\s*$/,'');
            array_[i] = array_[i].trim();
        }
        return array_;
    }


    public static getArrayFromCommaSeperatedString(array: any): Array<String> {

        if (Validation.validate(array) == false) { return null }

        if (typeof array == 'string') {

            try {

                let array_ = array.split(",");

                if (array_ == null) {
                    return null;
                }

                if (ArrayValidation.validate(array)) {
                    return array_;
                }

                for (var i = 0; i < array_.length; i++) {

                    if (typeof array_[i] !== 'string') {
                        // return null
                        array_[i] = String(array_[i])
                    }
                }
                return array_;

            } catch (error) {
                return null;
            }
        }
    }

    public static toArray(array: any): Array<any> {

        if (Validation.validate(array) == false) { return null; }

        if (typeof array == 'string') {

            try {

                let array_ = JSON.parse(array);

                if (ArrayValidation.validate(array_)) {
                    return array_;
                }
            } catch (error) {
                return null;
            }
        }

        // if(ArrayValidation.validate(array)) { return array }

        if (ArrayValidation.validate(array)) { return array }
        return null;
    }

}