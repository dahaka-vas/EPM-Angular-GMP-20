import { Component, Input, OnInit, EventEmitter, Output, OnChanges  } from '@angular/core';
import { ICourseItem } from 'src/app/models/course-item.models';

@Component({
    selector: 'gmp-vc-course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit, OnChanges {

    @Input() public courseItem!: ICourseItem;

    @Output() public deleteCourseByID = new EventEmitter<number>();

    constructor() {
        console.log('CourseItemComponent -> constructor');
    }

    public ngOnChanges(): void {
        console.log('CourseItemComponent -> ngOnChanges');
    }

    public ngOnInit(): void {
        console.log('CourseItemComponent -> ngOnInit');
    }

    public deleteCourse(): void {
        this.deleteCourseByID.emit(this.courseItem.id);
    }
}
