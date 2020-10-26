import { Component, OnChanges, OnInit } from '@angular/core';
import { ICourseItem } from 'src/app/models/course-item.models';
import { COURSES } from './courses-list.mock';

@Component({
    selector: 'gmp-vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit, OnChanges {

    public courseList!: ICourseItem[];

    constructor() {
        console.log('CoursesListComponent -> constructor');
    }

    public ngOnChanges(): void {
        console.log('CoursesListComponent -> ngOnChanges');
    }

    public ngOnInit(): void {
        console.log('CoursesListComponent -> ngOnInit');
        this.courseList = COURSES;
    }

    public loadCourses(): void {
        console.log('Load more courses');
    }

    public deleteCourse(id: number): void {
        console.log(`Delete course with id: ${id}`);
    }

}
