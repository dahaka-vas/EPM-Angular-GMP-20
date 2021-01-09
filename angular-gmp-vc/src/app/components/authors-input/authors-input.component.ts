import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomControl } from 'src/app/classes/custom-control';

@Component({
    selector: 'gmp-vc-authors-input',
    templateUrl: './authors-input.component.html',
    styleUrls: ['./authors-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AuthorsInputComponent),
        multi: true
    }]
})
export class AuthorsInputComponent extends CustomControl {
}
