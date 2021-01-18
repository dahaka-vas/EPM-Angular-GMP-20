import { Component, OnChanges, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ICourseItem } from 'src/app/models/course.models';
import { FilterCoursesPipe } from 'src/app/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'gmp-vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    providers: [FilterCoursesPipe],
})
export class CoursesListComponent implements OnInit, OnChanges {

    public courseList: ICourseItem[] = [];
    private componentDestroyed$ = new Subject<void>();

    constructor(
        private filterPipe: FilterCoursesPipe,
        public coursesService: CoursesService,
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
        this.coursesService.getList()
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((courses: ICourseItem[]) => {
                this.courseList = courses;
            })
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    public loadCourses(): void {
        console.log('Load more courses');
        this.coursesService.getList({ start: this.courseList.length })
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((courses: ICourseItem[]) => {
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
        modalRef.result
            .pipe(
                switchMap(result => {
                    console.log('result = ' + result);
                    return this.coursesService.removeCourse(id)
                }),
                switchMap(() => this.coursesService.getList()),
                takeUntil(this.componentDestroyed$)
            ).subscribe((courses: ICourseItem[]) => {
                    this.courseList = courses;
            });
    }

    public searchCourse(searchStream$: Observable<string>): void {
        searchStream$
            .pipe(
                switchMap((textFragment: string) => this.coursesService.getList({ textFragment })),
                takeUntil(this.componentDestroyed$),
            ).subscribe((courses: ICourseItem[]) => {
                this.courseList = courses;
            });
    }

    public addCourse() {
        this.router.navigate(['courses', 'new']);
    }
}
