import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '@gmp-vc-services/courses.service';
import { of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
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
        private coursesService: CoursesService,
    ) { }

    public ngOnInit(): void {
        // TODO: find out how to refactor this
        this.route.params
            .pipe(
                switchMap(routeParams => this.coursesService.getCourse(Number(routeParams.id))),
                catchError(() => of(null)),
                takeUntil(this.componentDestroyed$),
            ).subscribe(course => {
                this.course = course;
                course = this.course || {} as ICourseItem;
                if (!this.course) {
                    this.router.navigate(['courses', 'new']);
                }
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
        const saveCourse$ = !this.course
            ? this.coursesService.createCourse(course)
            : this.coursesService.updateCourse({
                ...this.course,
                ...course,
            });
        saveCourse$.pipe(
            takeUntil(this.componentDestroyed$),
        ).subscribe(() => this.router.navigate(['courses']));
    }
}
