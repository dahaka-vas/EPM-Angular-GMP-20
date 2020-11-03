import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration',
})
export class DurationPipe implements PipeTransform {

    public transform(mins: number): string {
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        return (hours ? `${hours}h ` : '') + `${minutes} min`;
    }
}
