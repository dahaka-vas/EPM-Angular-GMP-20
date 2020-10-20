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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
