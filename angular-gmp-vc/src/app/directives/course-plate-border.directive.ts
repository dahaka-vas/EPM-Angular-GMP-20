import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '.course-item[courseCreationDate]',
})
export class CoursePlateBorderDirective implements OnInit {

    // tslint:disable-next-line: no-input-rename
    @Input('courseCreationDate') public date: Date | string | number = new Date(0);

    constructor(private element: ElementRef) { }

    public ngOnInit(): void {
        let itemClass = '';
        const now = new Date();
        const twoWeeksAgo = new Date(new Date().setDate(now.getDate() - 14));

        this.date = new Date(this.date);

        if (this.date < now && this.date >= twoWeeksAgo) {
            itemClass = 'new-item';
        }

        if (this.date >= now) {
            itemClass = 'future-item';
        }

        if (itemClass) {
            this.element.nativeElement.classList.add(itemClass);
        }
    }
}
