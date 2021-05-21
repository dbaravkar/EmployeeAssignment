import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameSearch'
})
export class NameSearchPipe implements PipeTransform {

  transform(value: any, searchstr?: any): any {
    if (!value) {
      return [];
    }
    if (searchstr && searchstr.length) {
      return value.filter( (el: any) => {
        return el.name.toLowerCase().startsWith(searchstr.toLowerCase());
      });
    }
    return value;
  }

}
