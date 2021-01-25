import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

    transform(value: string, textFragment: string): string {
        return textFragment ? value.replace(textFragment, `<em>$&</em>`) : value;
    }
}
