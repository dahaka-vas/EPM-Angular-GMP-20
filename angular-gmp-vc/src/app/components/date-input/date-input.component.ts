import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomControl } from 'src/app/classes/custom-control';

@Component({
    selector: 'gmp-vc-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DateInputComponent),
        multi: true
	}]
})
export class DateInputComponent extends CustomControl {
}
