import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'gmp-vc-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
    public form!: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: [null, Validators.required],
            description: [null, Validators.required],
            duration: [null, Validators.required],
            date: [null, Validators.required],
            authors: [null, Validators.required],
        });
    }

    public saveCourse() { }
}
