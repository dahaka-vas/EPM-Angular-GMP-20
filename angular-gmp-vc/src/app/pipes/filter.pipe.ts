import { Pipe, PipeTransform } from '@angular/core';
import { ICourseItem } from '../models/course.models';

@Pipe({
    name: 'filterCourses',
})
export class FilterCoursesPipe implements PipeTransform {

    transform(courses: ICourseItem[], searchText = ''): ICourseItem[] {
        return courses.filter(course => {
            return [
                course.name,
                course.description,
            ].some((fieldValue: string) => {
                fieldValue = fieldValue.toString();
                return fieldValue.toLowerCase().includes(searchText.toLowerCase());
            });
        });
    }
}
