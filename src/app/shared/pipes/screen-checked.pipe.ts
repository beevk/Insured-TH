import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'screenChecked'
})
export class ScreenCheckedPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? '✓' : 'X';
  }

}