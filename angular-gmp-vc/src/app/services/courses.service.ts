import { Injectable } from '@angular/core';
import { COURSES } from '../mocks/courses-list.mock';
import { ICourseItem } from '../models/course-item.models';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    private courses = COURSES;

    constructor() { }

    public getList(): ICourseItem[] {
        return this.courses;
    }

    public createCourse(): ICourseItem {
        return COURSES[0];
    }

    public getCourse(id: number): ICourseItem | undefined {
        return this.courses.find(course => course.id === id);
    }

    public updateCourse(): void { }

    public removeCourse(id: number): ICourseItem[] {
        this.courses = this.courses.filter(course => course.id !== id);
        return this.courses;
    }
}
