import { Component, Input, OnInit, EventEmitter, Output, OnChanges  } from '@angular/core';
import { ICourseItem } from 'src/app/models/course-item.models';

@Component({
    selector: 'gmp-vc-course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit, OnChanges {

    @Input() public courseItem!: ICourseItem;
    @Input() public orderItemNumber = 1;

    @Output() public deleteCourseByID = new EventEmitter<number>();

    public courseCreationDate = '';
    public courseDuration = '';

    constructor() {
        console.log('CourseItemComponent -> constructor');
    }

    public ngOnChanges(): void {
        console.log('CourseItemComponent -> ngOnChanges');
    }

    public ngOnInit(): void {
        console.log('CourseItemComponent -> ngOnInit');
        this.courseCreationDate = `${this.courseItem.creationDate.getMonth() + 1}/${this.courseItem.creationDate.getDate()}/${this.courseItem.creationDate.getFullYear()}`;
        this.courseDuration = this.getCourseFormattedDuration(this.courseItem.duration);
    }

    public deleteCourse(): void {
        this.deleteCourseByID.emit(this.courseItem.id);
    }

    private getCourseFormattedDuration(mins: number): string {
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        return (hours ? `${hours}h ` : '') + `${minutes} min`;
    }

}
