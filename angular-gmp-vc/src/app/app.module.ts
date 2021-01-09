import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { BreadcrumbsNavComponent } from './components/breadcrumbs-nav/breadcrumbs-nav.component';
import { SearchComponent } from './components/search/search.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursePlateBorderDirective } from './directives/course-plate-border.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterCoursesPipe } from './pipes/filter.pipe';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginModule } from './login/login.module';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { DurationInputComponent } from './components/duration-input/duration-input.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { AuthorsInputComponent } from './components/authors-input/authors-input.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CoursesPageComponent,
        BreadcrumbsNavComponent,
        SearchComponent,
        CoursesListComponent,
        CourseItemComponent,
        FooterComponent,
        CoursePlateBorderDirective,
        DurationPipe,
        OrderByPipe,
        FilterCoursesPipe,
        ConfirmModalComponent,
        ModalComponent,
        AddCourseComponent,
        DurationInputComponent,
        DateInputComponent,
        AuthorsInputComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        LoginModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
