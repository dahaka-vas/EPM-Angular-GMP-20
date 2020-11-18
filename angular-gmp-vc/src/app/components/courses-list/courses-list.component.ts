import { Component, OnChanges, OnInit } from '@angular/core';
import { ICourseItem } from 'src/app/models/course-item.models';
import { FilterCoursesPipe } from 'src/app/pipes/filter.pipe';
import { COURSES } from './courses-list.mock';

@Component({
    selector: 'gmp-vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    providers: [FilterCoursesPipe],
})
export class CoursesListComponent implements OnInit, OnChanges {

    public courseList: ICourseItem[] = [];
    public allCourses: ICourseItem[] = [];

    constructor(private filterPipe: FilterCoursesPipe) {
        console.log('CoursesListComponent -> constructor');
    }

    public ngOnChanges(): void {
        console.log('CoursesListComponent -> ngOnChanges');
    }

    public ngOnInit(): void {
        console.log('CoursesListComponent -> ngOnInit');
        this.courseList = COURSES;
        this.allCourses = COURSES;
    }

    public loadCourses(): void {
        console.log('Load more courses');
    }

    public deleteCourse(id: number): void {
        console.log(`Delete course with id: ${id}`);
    }

    public searchCourse(text: string): void {
        this.courseList = this.filterPipe.transform(this.allCourses, text);
    }
}
