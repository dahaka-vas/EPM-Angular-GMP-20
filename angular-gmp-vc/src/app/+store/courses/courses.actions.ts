import { createAction, props } from '@ngrx/store';
import { ICourseItem } from 'src/app/models/course.models';
import { ICoursesRequest } from 'src/app/models/http.models';

export const GetCoursesList = createAction(
    '[Courses] Get List',
    ({ params }: { params: ICoursesRequest } = { params: {} }) => ({ params })
    // props<{ params: ICoursesRequest | undefined }>()
)

export const CoursesListLoaded = createAction(
    '[Courses]  List',
    props<{
        courses: {
            courses: ICourseItem[],
            totalElements: number,
        }
    }>()
)

export const CreateCourse = createAction(
    '[Courses] Create Course',
    props<ICourseItem>()
)

export const GetCourse = createAction(
    '[Courses] Get Course',
    props<{ id: number }>()
)

export const CourseLoaded = createAction(
    '[Courses]  List',
    props<{
        course: { course: ICourseItem },
    }>()
)

export const UpdateCourse = createAction(
    '[Courses] Update Course',
    props<{ updatedCourse: ICourseItem }>()
)

export const RemoveCourse = createAction(
    '[Courses] Remove Course',
    props<{ id: number }>()
)

export const NewCourse = createAction(
    '[Courses] New Course'
)

export const AddCourse = createAction(
    '[Courses] Add Course',
    props<{ course: ICourseItem }>()
)