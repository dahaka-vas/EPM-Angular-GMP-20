import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '@gmp-vc-services/courses.service';
import { select, Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { AddCourse, GetCourse, NewCourse, UpdateCourse } from 'src/app/+store/courses/courses.actions';
import { ICourseItem } from 'src/app/models/course.models';

@Component({
    selector: 'gmp-vc-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
    public form!: FormGroup;
    public course!: ICourseItem | null;

    private componentDestroyed$ = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<{
            course: { course: ICourseItem }
        }>,
    ) { }

    public ngOnInit(): void {
        this.route.params
            .pipe(
                switchMap(routeParams => {
                    const id = routeParams.id;
                    this.store.dispatch(GetCourse({ id }));
                    return this.store.pipe(select('course'));
                }),
                takeUntil(this.componentDestroyed$),
            ).subscribe(({ course }) => {
                this.course = course;
                course = this.course || {} as ICourseItem;
                this.form = this.fb.group({
                    name: [course.name, Validators.required],
                    description: [course.description, Validators.required],
                    length: [course.length, Validators.required],
                    date: [course.date, Validators.required],
                    authors: [course.authors, Validators.required],
                });
            });
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    public cancel(): void {
        this.router.navigate(['courses']);
    }

    public saveCourse(): void {
        const course = this.form.value;
        if (this.course && !this.course.id) {
            this.store.dispatch(AddCourse({ course }));
        } else {
            this.store.dispatch(UpdateCourse({
                updatedCourse: {
                    ...this.course,
                    ...course,
                }
            }));
        }
    }
}
