import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';

const routes: Routes = [
  { path: '', component: CoursesPageComponent },
  { path: 'courses', component: CoursesPageComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
