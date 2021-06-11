import { DateValidation } from "../validations/date.validation";
import * as moment from 'moment';


export class DateFormatter {

    public static forrmat(date: string, format: DateFormates = DateFormates["YYYY-MM-DD"]): Date {

        if (DateValidation.validate(date) == false) { return null };
        return moment(date, format).isValid() ? moment(date, format).toDate() : null;
    }

    public static startOf(date: Date): Date {

        if (DateValidation.validate(date.toString()) == false) { return null };

        return moment(date).startOf('day').toDate()
    }

    public static endOf(date: Date): Date {

        if (DateValidation.validate(date.toString()) == false) { return null };

        return moment(date).endOf('day').toDate()
    }

    public static startOfDate(date: string): Promise<Date> {

        return new Promise((resolve, reject) => {

            try {
                if (DateValidation.validate(date) == false) { reject(date) };
                resolve(moment(date).startOf('day').toDate());
            } catch (error) {
                reject(date)
            }
        })
    }

    public static endOfDate(date: string): Promise<Date> {

        return new Promise((resolve, reject) => {

            try {
                if (DateValidation.validate(date) == false) { reject(date) };
                resolve(moment(date).endOf('day').toDate());
            } catch (error) {
                reject(date)
            }
        })
    }

    public static getCurrentDate(format: DateFormates = DateFormates["YYYY-MM-DD"]) {
        let now = moment();
        return now.format(format);
    }
}



// let startDate_ = moment(startDate).startOf('day').toDate()
// let endDate_ = moment(endDate).endOf('day').toDate()

export enum DateFormates {
    "YYYY-MM-DD" = 'YYYY-MM-DD',
    "YYYY-MM-DDTHH:mm:ss.sssZ" = "YYYY-MM-DDTHH:mm:ss.sssZ"
    //    medium = ,
    //    shortTime =,
    //    mmss = ,
}