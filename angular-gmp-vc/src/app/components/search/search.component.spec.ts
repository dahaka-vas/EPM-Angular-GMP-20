import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ SearchComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should log when `Search` button clicked', () => {
        const consoleSpy = spyOn(console, 'log');

        const searchCourseButton = fixture.nativeElement.querySelector('.search-course__button');
        searchCourseButton.click();

        expect(consoleSpy).toHaveBeenCalled();
    });
});
