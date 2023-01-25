import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtre'
})
export class FiltrePipe implements PipeTransform {

  transform(items: any[], term: any): any {
    if (!term){return items}
      return items.filter(item => item.name.toLocaleLowerCase().indexOf(term.toLowerCase()) !== -1);
  }

}

// return items.filter((term)=> {
//   return (term.name.toLowerCase().includes(term.toLowerCase())
//  })
