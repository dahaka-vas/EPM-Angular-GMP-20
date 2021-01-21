import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@gmp-vc-services/http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ICourseItem } from 'src/app/models/course.models';
import { ICoursesRequest } from 'src/app/models/http.models';
import { AddCourse, CourseLoaded, CoursesListLoaded, GetCourse, GetCoursesList, RemoveCourse, UpdateCourse } from './courses.actions';

@Injectable()
export class CoursesEffects {
    private courseListParams: ICoursesRequest = {
        start: 0,
        count: 5,
        sort: 'date'
    };

    constructor(
        private actions$: Actions,
        private httpService: HttpService,
        private router: Router,
    ) { }

    getCourses$ = createEffect(() => this.actions$.pipe(
        ofType(GetCoursesList),
        switchMap(({ params }: { params: ICoursesRequest }) => {
            Object.assign(this.courseListParams, params);

            if (!this.courseListParams.textFragment) {
                delete this.courseListParams.textFragment;
                this.courseListParams.count = 5;
            } else {
                this.courseListParams.start = 0;
                this.courseListParams.count = 30;
            }

            return this.httpService.getCourses(this.courseListParams)
        }),
        switchMap((courses: ICourseItem[]) => {
            const totalElements = this.courseListParams.textFragment ? courses.length : 30
            return of(CoursesListLoaded({courses: { courses, totalElements }}));
        }),
    ));

    getCourse$ = createEffect(() => this.actions$.pipe(
        ofType(GetCourse),
        switchMap(({ id }: { id: number }) => this.httpService.getCourseById(id)),
        switchMap((course: ICourseItem) => {
            return of(CourseLoaded({ course: { course } }));
        }),
        catchError(() => of(CourseLoaded({
            course: { course: {} as ICourseItem }
        }))),
    ));

    removeCourse$ = createEffect(() => this.actions$.pipe(
        ofType(RemoveCourse),
        switchMap(({ id }: { id: number }) => this.httpService.deleteCourse(id)),
        switchMap(() => this.httpService.getCourses(this.courseListParams)),
        switchMap((courses: ICourseItem[]) => {
            const totalElements = this.courseListParams.textFragment ? courses.length : 30
            return of(CoursesListLoaded({courses: { courses, totalElements }}));
        }),
    ));

    updateCourse$ = createEffect(() => this.actions$.pipe(
        ofType(UpdateCourse),
        switchMap(({ updatedCourse }: { updatedCourse: ICourseItem }) => this.httpService.updateCourse(updatedCourse)),
        tap(() => this.router.navigate(['courses'])),
    ), { dispatch: false });

    createCourse$ = createEffect(() => this.actions$.pipe(
        ofType(AddCourse),
        switchMap(({ course }: { course: ICourseItem }) => {
            const id = Date.now() + Math.ceil(Math.random() * 10);
            course = {
                ...course,
                id,
            }
            return this.httpService.createCourse(course);
        }),
        tap(() => this.router.navigate(['courses'])),
    ), { dispatch: false });
}
