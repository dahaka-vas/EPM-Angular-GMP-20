import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ICourseItem } from 'src/app/models/course.models';
import { FilterCoursesPipe } from 'src/app/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { GetCoursesList, RemoveCourse } from 'src/app/+store/courses/courses.actions';
import { ICoursesRequest } from 'src/app/models/http.models';

@Component({
    selector: 'gmp-vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    providers: [FilterCoursesPipe],
})
export class CoursesListComponent implements OnInit {
    public courseList: ICourseItem[] = [];
    public coursesTotalCount = 0;

    private componentDestroyed$ = new Subject<void>();

    constructor(
        private modalService: ModalService,
        private router: Router,
        private store: Store<{
            courses: {
                courses: ICourseItem[],
                totalElements: number,
            }
        }>,
    ) { }

    public ngOnInit(): void {
        const params: ICoursesRequest = {
            start: 0
        };
        this.store.dispatch(GetCoursesList({ params }));
        this.store.pipe(
            select('courses'),
            tap(v => console.log('v', v)),
            takeUntil(this.componentDestroyed$),
        ).subscribe(({ courses, totalElements }: { courses: ICourseItem[], totalElements: number }) => {
            this.coursesTotalCount = totalElements;
            this.courseList.push(...courses);
        });
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    public loadCourses(): void {
        const params: ICoursesRequest = {
            start: this.courseList.length
        };
        this.store.dispatch(GetCoursesList({ params }));
    }

    public deleteCourse(id: number): void {
        const modalRef = this.modalService.open(ConfirmModalComponent, {course: ` (with id: ${id})`});
        modalRef.result
            .pipe(
                takeUntil(this.componentDestroyed$)
            ).subscribe(() => {
                this.store.dispatch(RemoveCourse({ id }));
                this.courseList = [];
            });
    }

    public searchCourse(searchStream$: Observable<string>): void {
        searchStream$
            .pipe(
                takeUntil(this.componentDestroyed$),
            ).subscribe((textFragment: string) => {
                this.store.dispatch(GetCoursesList({ params: { textFragment } }));
                this.courseList = [];
            });
    }

    public addCourse() {
        this.router.navigate(['courses', 'new']);
    }
}
