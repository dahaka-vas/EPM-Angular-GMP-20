import { Component, Input, OnInit } from '@angular/core';
import { ICourseItem } from 'src/app/models/course-item';

@Component({
    selector: 'gmp-vc-course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit {

    constructor() { }

    @Input() public courseItem: ICourseItem = {};

    ngOnInit(): void {
    }

}
