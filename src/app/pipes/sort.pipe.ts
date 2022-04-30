import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: any[], key: string, isAsc: boolean = true): any[] {
    value.sort(
      (a: any, b:any) => (a[key] < b[key] ? -1 : 1) * (isAsc ? 1 : -1)
    );

    return value;
  }
}
