import { Component, OnInit } from '@angular/core';
import { ICourseItem } from 'src/app/models/course-item';

@Component({
    selector: 'gmp-vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {

    constructor() { }

    public courseList: ICourseItem[] = [
        {
            id: 1,
            title: '1',
            creationDate: new Date(),
            duration: 10,
            description: 'description',
        },
        {
            id: 2,
            title: '2',
            creationDate: new Date(),
            duration: 10,
            description: 'description',
        },
    ];

    ngOnInit(): void {
    }

}
