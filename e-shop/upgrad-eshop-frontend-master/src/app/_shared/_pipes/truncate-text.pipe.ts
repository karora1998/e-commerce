import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {


  transform(value: string, limit: number = 40, trail: string = '…'): string {


    if (value) {
      if (value.length > limit) {
        return value.slice(0, limit) + '...';
      }
      else {
        return value;

      }
    } else {
      return '';
    }

  }
}
