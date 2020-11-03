import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';

import { CourseItemComponent } from '../course-item/course-item.component';
import { CoursesListComponent } from './courses-list.component';

describe('CoursesListComponent', () => {
    let component: CoursesListComponent;
    let fixture: ComponentFixture<CoursesListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CoursesListComponent, CourseItemComponent, OrderByPipe, DurationPipe ],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should log ngOnChange', () => {
        const consoleSpy = spyOn(console, 'log');
        component.ngOnChanges();

        expect(consoleSpy).toHaveBeenCalled();
    });

    it('should log when `Load courses` clicked', () => {
        const consoleSpy = spyOn(console, 'log');

        // const loadCourseButton = fixture.debugElement.query(By.css('.course-list__button--load-more')).nativeElement;
        const loadCourseButton = fixture.nativeElement.querySelector('.course-list__button--load-more');
        loadCourseButton.click();

        expect(consoleSpy).toHaveBeenCalled();
    });

    it('should log when `Delete` button clicked', () => {
        const consoleSpy = spyOn(console, 'log');

        const deleteCourseButton = fixture.nativeElement.querySelector('.course-item__button--delete');
        deleteCourseButton.click();

        expect(consoleSpy).toHaveBeenCalled();
    });
});
