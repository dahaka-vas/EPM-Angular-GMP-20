import { Component, Input, OnInit, EventEmitter, Output, OnChanges, ChangeDetectionStrategy  } from '@angular/core';
import { Router } from '@angular/router';
import { ICourseItem } from 'src/app/models/course-item.models';

@Component({
    selector: 'gmp-vc-course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent implements OnInit, OnChanges {

    @Input() public courseItem!: ICourseItem;

    @Output() public deleteCourseByID = new EventEmitter<number>();

    constructor(
        private router: Router,
    ) {
        console.log('CourseItemComponent -> constructor');
    }

    public ngOnChanges(): void {
        console.log('CourseItemComponent -> ngOnChanges');
    }

    public ngOnInit(): void {
        console.log('CourseItemComponent -> ngOnInit');
    }

    public editCourse(): void {
        this.router.navigate(['courses', this.courseItem.id]);
    }

    public deleteCourse(): void {
        this.deleteCourseByID.emit(this.courseItem.id);
    }
}
