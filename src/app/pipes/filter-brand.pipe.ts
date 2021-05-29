import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'filter-brand'
})
export class FilterBrandPipe implements PipeTransform {

  transform(value: Brand[], filterBrandText:string): Brand[] {
    filterBrandText=filterBrandText?filterBrandText.toLocaleLowerCase():""
    return filterBrandText?value.filter((c:Brand)=>c.brandname.toLocaleLowerCase().indexOf(filterBrandText)!==-1):value;
  }

}
