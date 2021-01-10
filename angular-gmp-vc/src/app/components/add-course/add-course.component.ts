import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '@gmp-vc-services/courses.service';
import { ICourseItem } from 'src/app/models/course-item.models';

@Component({
    selector: 'gmp-vc-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
    public form!: FormGroup;
    public course!: ICourseItem | undefined;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private coursesService: CoursesService,
    ) { }

    public ngOnInit(): void {
        this.route.params.subscribe(routeParams => {
            this.course =  this.coursesService.getCourse(Number(routeParams.id));

            const course = this.course || {} as ICourseItem;
            if (!this.course) {
                this.router.navigate(['courses', 'new']);
            }
            this.form = this.fb.group({
                title: [course.title, Validators.required],
                description: [course.description, Validators.required],
                duration: [course.duration, Validators.required],
                creationDate: [course.creationDate, Validators.required],
                authors: [course.authors, Validators.required],
            });
        })

    }

    public cancel(): void {
        this.router.navigate(['courses']);
    }

    public saveCourse(): void {
        const course = this.form.value;
        if (!this.course) {
            this.coursesService.createCourse(course);
        } else {
            this.coursesService.updateCourse({
                ...this.course,
                ...course,
            })
        }
        this.router.navigate(['courses']);
    }
}
