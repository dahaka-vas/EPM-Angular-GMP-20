import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsNavComponent } from './breadcrumbs-nav.component';

describe('BreadcrumbsNavComponent', () => {
  let component: BreadcrumbsNavComponent;
  let fixture: ComponentFixture<BreadcrumbsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbsNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
