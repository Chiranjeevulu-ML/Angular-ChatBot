import { Injectable, Inject } from '@angular/core';
import { DatePipe, Time } from '@angular/common';
import * as moment from 'moment';
import { tap, map, filter } from 'rxjs/operators';

@Injectable()
export class DateFormatConfig {
    getDesiredDateFormat(dateInfo: any, currentFormat:any, requiredFormat:any) {
        //"DD-MM-YYYY" "DD-MM-YYYY"
        return moment(dateInfo, currentFormat).format(requiredFormat);
    }
}