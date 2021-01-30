import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

    transform(value: string = '', textFragment: string): string {
        const regExp = new RegExp(textFragment, 'gi');
        return textFragment ? value.replace(regExp, `<em>$&</em>`) : value;
    }
}
