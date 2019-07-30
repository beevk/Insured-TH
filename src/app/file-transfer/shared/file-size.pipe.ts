import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(value: number): string {
    const fileSizeInKB = (value / 1024);
    if (fileSizeInKB < 1024) {
      return `${fileSizeInKB.toFixed(2)} KB`;
    }
    return `${(fileSizeInKB / 1024).toFixed(2)} MB`;
  }
}
