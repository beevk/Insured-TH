import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'screenChecked'
})
export class ScreenCheckedPipe implements PipeTransform {

  transform(value: boolean, ...args: any[]): string {
    return value ? '✓' : '×';
  }

}
