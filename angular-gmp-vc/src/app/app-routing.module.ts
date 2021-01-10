import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCourseComponent } from '@gmp-vc-components/add-course/add-course.component';
import { NotFoundPageComponent } from '@gmp-vc-components/not-found-page/not-found-page.component';
import { CoursesPageComponent } from '@gmp-vc-components/courses-page/courses-page.component';
import { LoginComponent } from './login/components/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'courses'},
    { path: 'login', component: LoginComponent },
    {
        path: 'courses',
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', component: CoursesPageComponent },
            { path: ':id', component: AddCourseComponent },
            { path: 'new', component: AddCourseComponent },
        ]
    },
    { path: '**', component: NotFoundPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
