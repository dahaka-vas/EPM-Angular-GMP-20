import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { COURSES } from '../mocks/courses-list.mock';
import { ICourseItem } from '../models/course.models';
import { ICoursesRequest } from '../models/http.models';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    private courses = COURSES;

    constructor(
        private httpService: HttpService,
    ) { }

    public getList(params?: ICoursesRequest): Observable<ICourseItem[]> {
        const defaultParams: ICoursesRequest = { start: 0, count: 5, sort: 'date' };
        Object.assign(defaultParams, params);
        params = JSON.parse(JSON.stringify(defaultParams));
        return this.httpService.getCourses(params);
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
