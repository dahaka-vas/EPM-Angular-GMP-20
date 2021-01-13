import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { COURSES } from '../mocks/courses-list.mock';
import { ICourseItem } from '../models/course.models';
import { ICoursesRequest } from '../models/http.models';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    private courses = COURSES;

    private courseListParams: ICoursesRequest = {
        start: 0,
        count: 5,
        sort: 'date'
    };

    public coursesTotalCount = 0;

    constructor(
        private httpService: HttpService,
    ) { }

    public getList(params?: ICoursesRequest): Observable<ICourseItem[]> {
        Object.assign(this.courseListParams, params);

        if (!this.courseListParams.textFragment) {
            delete this.courseListParams.textFragment;
            this.courseListParams.count = 5;
        } else {
            this.courseListParams.start = 0;
            this.courseListParams.count = 30;
        }

        return this.httpService.getCourses(this.courseListParams)
            .pipe(
                tap(courses => this.coursesTotalCount = this.courseListParams.textFragment ? courses.length : 30),
            );
    }

    public createCourse(course: ICourseItem): Observable<ICourseItem> {
        const id = Date.now() + Math.ceil(Math.random() * 10);
        course = {
            ...course,
            id,
        }
        return this.httpService.createCourse(course);
    }

    public getCourse(id: number): Observable<ICourseItem> {
        return this.httpService.getCourseById(id);
    }

    public updateCourse(updatedCourse: ICourseItem): Observable<ICourseItem> {
        return this.httpService.updateCourse(updatedCourse);
    }

    public removeCourse(id: number): Observable<void> {
        return this.httpService.deleteCourse(id);
    }
}
