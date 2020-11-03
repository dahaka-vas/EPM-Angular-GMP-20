import { CoursePlateBorderDirective } from './course-plate-border.directive';

describe('CoursePlateBorderDirective', () => {
    const element = { nativeElement: {
        style: { boxShadow: '' },
    }};
    it('should create an instance', () => {
        const directive = new CoursePlateBorderDirective(element);
        expect(directive).toBeTruthy();
    });
});
