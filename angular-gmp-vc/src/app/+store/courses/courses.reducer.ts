import { createReducer, on } from '@ngrx/store';
import { ICourseItem } from 'src/app/models/course.models';
import { CourseLoaded, CoursesListLoaded, NewCourse } from './courses.actions';

export const coursesReduser = createReducer({ courses: [], totalElements: 0 },
    on(CoursesListLoaded, (state: { courses: ICourseItem[], totalElements: number  }, action) => {
        console.log('CoursesListLoaded', state, action)
        return {
            ...state,
            ...action.courses
        };
    }),
);

export const courseReduser = createReducer({ course: {} },
    on(CourseLoaded, (state, action) => {
        console.log('CourseLoaded', state, action)
        return {
            ...state,
            ...action.course
        };
    }),
);