import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], key: string, filter: string): any[] {
    const result = [];

    if (value.length === 0 || key === '' || filter === '') {
      return value;
    }

    for (const item of value) {
      if (item[key].toLowerCase().includes(filter.toLowerCase())) {
        result.push(item);
      }
    }

    return result;
  }
}
