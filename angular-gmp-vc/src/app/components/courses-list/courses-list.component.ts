import { Component, OnChanges, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ICourseItem } from 'src/app/models/course.models';
import { FilterCoursesPipe } from 'src/app/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';

@Component({
    selector: 'gmp-vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    providers: [FilterCoursesPipe],
})
export class CoursesListComponent implements OnInit, OnChanges {

    public courseList: ICourseItem[] = [];

    // TODO: Implement params for courses loading
    // private courseListParams: ICoursesRequest = {};

    constructor(
        private filterPipe: FilterCoursesPipe,
        private coursesService: CoursesService,
        private modalService: ModalService,
        private router: Router,
    ) {
        console.log('CoursesListComponent -> constructor');
    }

    public ngOnChanges(): void {
        console.log('CoursesListComponent -> ngOnChanges');
    }

    public ngOnInit(): void {
        console.log('CoursesListComponent -> ngOnInit');
        this.coursesService.getList().subscribe((courses: ICourseItem[]) => {
            this.courseList = courses;
        })
    }

    public loadCourses(): void {
        console.log('Load more courses');
        this.coursesService.getList({ start: this.courseList.length }).subscribe((courses: ICourseItem[]) => {
            this.courseList.push(...courses);
        })
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
            this.coursesService.removeCourse(id).subscribe(() => {
                this.courseList = this.courseList.filter(course => course.id !== id);
            });
        });
    }

    public searchCourse(text: string): void {
        this.coursesService.getList({ textFragment: text, count: 30 }).subscribe((courses: ICourseItem[]) => {
            this.courseList = courses;
        })
    }

    public addCourse() {
        this.router.navigate(['courses', 'new']);
    }
}
