import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'searchFilter'
})

export class PipeFilter implements PipeTransform {
    transform(items: any[], term: any[]): any {
        return items.filter(item => item.companyName.indexOf(term[0]) !== -1);
    }
}   