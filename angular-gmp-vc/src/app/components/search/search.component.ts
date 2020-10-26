import { Component } from '@angular/core';

@Component({
    selector: 'gmp-vc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    public searchText = '';

    public findCourse(): void {
        console.log(`Find course with '${this.searchText}' value`);
    }
}
