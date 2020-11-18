import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'gmp-vc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    public searchText = '';

    @Output() public search = new EventEmitter<string>();

    public findCourse(): void {
        console.log(`Find course with '${this.searchText}' value`);
        this.search.emit(this.searchText);
    }
}
