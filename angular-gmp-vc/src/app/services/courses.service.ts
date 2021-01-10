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

    public createCourse(course: ICourseItem): void {
        course = {
            ...course,
            id: this.courses.length + 1,
        }
        this.courses.push(course);
    }

    public getCourse(id: number): ICourseItem | undefined {
        return this.courses.find(course => course.id === id);
    }

    public updateCourse(updatedCourse: ICourseItem): void {
        const index = this.courses.findIndex(course => course.id === updatedCourse.id);
        if (index !== -1) {
            this.courses[index] = updatedCourse;
        }
    }

    public removeCourse(id: number): ICourseItem[] {
        this.courses = this.courses.filter(course => course.id !== id);
        return this.courses;
    }
}
