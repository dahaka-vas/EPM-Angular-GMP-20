import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCourseComponent } from '@gmp-vc-components/add-course/add-course.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { LoginComponent } from './login/components/login/login.component';

const routes: Routes = [
    { path: '', component: CoursesPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'courses', component: CoursesPageComponent },
    { path: 'add-course', component: AddCourseComponent },
    { path: '**', redirectTo: '/' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
