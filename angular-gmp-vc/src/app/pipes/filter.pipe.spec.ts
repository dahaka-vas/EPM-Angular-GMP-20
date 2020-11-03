import { FilterCoursesPipe } from './filter.pipe';

describe('FilterPipe', () => {
    it('create an instance', () => {
        const pipe = new FilterCoursesPipe();
        expect(pipe).toBeTruthy();
    });
});
