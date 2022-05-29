import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], key: string, filter: string) {
    const result = [];

    if (!value.length || !key || !filter)
      return value;

    for (const item of value) {
      if (item[key].toLowerCase().includes(filter.toLowerCase()))
        result.push(item);
    }

    return result;
  }
}
