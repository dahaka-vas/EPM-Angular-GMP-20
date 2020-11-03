import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[courseCreationDate]',
})
export class CoursePlateBorderDirective implements OnInit {

    @Input('courseCreationDate') public date: Date = new Date(0);

    constructor(private element: ElementRef) { }

    public ngOnInit(): void {
        let color;
        const now = new Date();
        const previousTwoWeeks = new Date(
            new Date(now).getFullYear(),
            new Date(now).getMonth(),
            -12,
        );

        if (+this.date < +now && +this.date >= +previousTwoWeeks) {
            color = 'var(--green-border)';
        }

        if (+this.date >= +now) {
            color = 'var(--blue-border)';
        }

        this.element.nativeElement.style.boxShadow = `0 0 6px 0 ${color}, 0 0 12px 0 ${color}`;
    }
}
