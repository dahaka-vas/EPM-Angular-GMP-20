import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    public course: ICourseItem | null = null;

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
                    name: [course.name, [Validators.required, Validators.maxLength(50)]],
                    description: [course.description, [Validators.required, Validators.maxLength(500)]],
                    length: [course.length, [Validators.required, this.getDurationValidator()]],
                    date: [this.getFormattedDate(course.date), [Validators.required, this.getDateValidator()]],
                    authors: [course.authors || [], [this.getAuthorsValidator()]],
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

    private getAuthorsValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value.length) {
                return null;
            }
            return { required: true };
        }
    }

    private getDateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const date = (control.value || '').toString();
            const formattedDate = date.split('.').reverse();

            let [ year, month, day ] = formattedDate;
            month = `${Number(month) === Number(month) ? +month - 1 : month}`;
            const currentDate = new Date(year, month, day);
            const isEquivalentDate = (
                currentDate.getFullYear() === +year
                && currentDate.getMonth() === +month
                && currentDate.getDate() === +day
            );

            const isInvalidDate = (
                formattedDate.length !== 3
                || year.length !== 4
                || !isEquivalentDate
                || Date.parse(formattedDate) !== Date.parse(formattedDate)
            );

            if (isInvalidDate) {
                return {
                    date: 'Wrong date or date format',
                }
            }
            return null;
        }
    }

    private getDurationValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const { value } = control;

            if (Number(value) !== Number(value)) {
                return {
                    duration: 'Wrong value',
                }
            }
            return null;
        }
    }

    private getFormattedDate(date: string | Date): string {
        if (!date) return '';
        return `${new Date(date).getDate()}.${new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}`
    }
}
