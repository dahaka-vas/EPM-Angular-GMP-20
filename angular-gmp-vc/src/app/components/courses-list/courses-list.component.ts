import { Component, OnChanges, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ICourseItem } from 'src/app/models/course-item.models';
import { FilterCoursesPipe } from 'src/app/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
    selector: 'gmp-vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    providers: [FilterCoursesPipe],
})
export class CoursesListComponent implements OnInit, OnChanges {

    public courseList: ICourseItem[] = [];
    public allCourses: ICourseItem[] = [];

    constructor(
        private filterPipe: FilterCoursesPipe,
        private coursesService: CoursesService,
        private modalService: ModalService,
    ) {
        console.log('CoursesListComponent -> constructor');
    }

    public ngOnChanges(): void {
        console.log('CoursesListComponent -> ngOnChanges');
    }

    public ngOnInit(): void {
        console.log('CoursesListComponent -> ngOnInit');
        this.allCourses = this.coursesService.getList();
        this.courseList = this.allCourses;
    }

    public loadCourses(): void {
        console.log('Load more courses');
    }

    public deleteCourse(id: number): void {
        console.log(`Delete course with id: ${id}`);
        // if (confirm('Do you really want to delete this course?')) {
        //     this.allCourses = this.coursesService.removeCourse(id);
        //     this.courseList = this.allCourses;
        // }

        const modalRef = this.modalService.open(ConfirmModalComponent, {course: ` (with id: ${id})`});
        modalRef.result.subscribe((result) => {
            console.log('result = ' + result);
            this.allCourses = this.coursesService.removeCourse(id);
            this.courseList = this.allCourses;
        });
    }

    public searchCourse(text: string): void {
        this.courseList = this.filterPipe.transform(this.allCourses, text);
    }
}
