import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(items: any[], term: any): any {
  if (term == "all category" || term == ""){return items}
     return items.filter(item => item.category == term);

   
  }}


