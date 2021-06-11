import { StringValidation } from './string.validation';
import * as moment from 'moment';
import { ILogger } from '../ilogger';

export class DateValidation extends StringValidation {

  public static validate(date: string): boolean {

    if (StringValidation.validate(date) == false) { return false; }

    try {

      var date_ = moment(date);
      ILogger.log("date",date_.toDate());
      return date_.isValid();
    } catch (error) {

      return false;
    }
  }
}