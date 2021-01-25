import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpService } from '@gmp-vc-services/http.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CustomControl } from 'src/app/classes/custom-control';
import { IAuthor } from 'src/app/models/course.models';

@Component({
    selector: 'gmp-vc-authors-input',
    templateUrl: './authors-input.component.html',
    styleUrls: ['./authors-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AuthorsInputComponent),
        multi: true
    }]
})
export class AuthorsInputComponent extends CustomControl {
    private componentDestroyed$ = new Subject<void>();

    public authors: IAuthor[] = [];
    public filteredAuthors: IAuthor[] = [];
    public value: any[] = [];
    public isOpened = false;
    public textFragment = '';
    public dropdownHeight = 0;

    constructor (
        private httpService: HttpService,
    ) {
        super();
    }

    public ngOnInit() {
        this.httpService.getAuthors().subscribe((authors: IAuthor[]) => {
            this.authors = authors;
        });
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    public openList(triggerElement: HTMLElement): void {
        const doc = document.documentElement;
        this.dropdownHeight = (doc.scrollHeight - doc.scrollTop - doc.clientHeight) + (doc.clientHeight - triggerElement.getBoundingClientRect().bottom) - 60;

        this.isOpened = !this.isOpened;
        this.textFragment = '';
        this.filteredAuthors = this.authors.filter((author: IAuthor) => !this.value.find((item: IAuthor) => item.id === author.id));
        this.updateValue(this.value);
    }

    public searchText(searchStream$: Observable<string>): void {
        searchStream$
            .pipe(
                switchMap((textFragment: string) => {
                    this.textFragment = textFragment;
                    return this.httpService.getAuthors({ textFragment });
                }),
                takeUntil(this.componentDestroyed$),
            ).subscribe((authors: IAuthor[]) => {
                this.filteredAuthors = authors.filter((author: IAuthor) => this.value.some((item: IAuthor) => item.id !== author.id));
            });
    }

    public addItem(item: IAuthor): void {
        if (!this.value.find((author: IAuthor) => author.id === item.id)) {
            this.value.push(item);
            item.disabled = true;
            this.updateValue(this.value);
        }
    }

    public removeAuthor(event: MouseEvent, index: number): void {
        event.stopPropagation();
        const removedItem = this.value.splice(index, 1);
        const removedAuthor = this.authors.find(author => author.id === removedItem[0].id) || {} as IAuthor;
        removedAuthor.disabled = false;
        this.updateValue(this.value);
    }
}
