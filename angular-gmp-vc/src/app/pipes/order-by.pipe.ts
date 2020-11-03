import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
    /**
     * @param order set descending `(-1)` or ascending `(1)` order
     */
    // tslint:disable-next-line: no-any
    transform(items: any[], field: string, order: -1 | 1 = 1): any[] {
        return items.sort((a, b) => {
            // for undefiend
            if (!(field in a || field in b)) {
                return 0;
            }

            // for defined
            if (+a[field] > +b[field]) {
                return 1 * order;
            }
            if (+a[field] < +b[field]) {
                return -1 * order;
            }

            // for strings
            if (a[field] > b[field]) {
                return 1 * order;
            }
            if (a[field] < b[field]) {
                return -1 * order;
            }

            return 0;
        });
    }
}
