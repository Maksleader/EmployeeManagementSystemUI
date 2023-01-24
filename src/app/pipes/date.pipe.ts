import { Constants } from "./constants";
import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: "dateFormat"
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  
  override transform(value: any, _args?: any): any {
    return super.transform(value, Constants.DATE_FMT);
  }
}