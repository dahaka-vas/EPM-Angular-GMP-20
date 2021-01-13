import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil, throttleTime } from 'rxjs/operators';

@Component({
    selector: 'gmp-vc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
    public searchText = '';
    private searchStream$: Subject<string> = new Subject();
    private componentDestroyed$ = new Subject<void>();

    @Output() public search = new EventEmitter<Observable<string>>();

    public ngOnInit(): void {
        console.log('CourseItemComponent -> ngOnInit');
        this.search.emit(this.searchStream$.pipe(
            filter(searchText => !searchText || searchText.length >= 3),
            debounceTime(400),
            // throttleTime(400),
            distinctUntilChanged(),
            takeUntil(this.componentDestroyed$),
        ));
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    public findCourse(): void {
        console.log(`Find course with '${this.searchText}' value`);
        this.searchStream$.next(this.searchText);
    }
}
