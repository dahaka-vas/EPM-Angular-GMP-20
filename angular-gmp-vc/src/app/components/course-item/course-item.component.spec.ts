import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseItemComponent } from './course-item.component';
import { COURSES } from '../courses-list/courses-list.mock';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

describe('CourseItemComponent', () => {
    let component: CourseItemComponent;
    let fixture: ComponentFixture<CourseItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CourseItemComponent, DurationPipe ],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseItemComponent);
        component = fixture.componentInstance;
        component.courseItem = COURSES[0];
        // courseElement = fixture.debugElement.query(By.css('.course-item__button--delete')).nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit course id event when `Delete` button clicked', () => {
        component.deleteCourseByID.subscribe((id: number) => {
            expect(id).toBe(component.courseItem.id);
        });

        // const deleteCourseButton = fixture.debugElement.query(By.css('.course-item__button--delete')).nativeElement;
        const deleteCourseButton = fixture.nativeElement.querySelector('.course-item__button--delete');
        deleteCourseButton.click();
    });

    it('should log ngOnChange', () => {
        const consoleSpy = spyOn(console, 'log');
        component.ngOnChanges();
        expect(consoleSpy).toHaveBeenCalled();
    });
});
