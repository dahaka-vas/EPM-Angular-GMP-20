import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomControl } from 'src/app/classes/custom-control';

@Component({
    selector: 'gmp-vc-duration-input',
    templateUrl: './duration-input.component.html',
    styleUrls: ['./duration-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DurationInputComponent),
        multi: true
    }]
})
export class DurationInputComponent extends CustomControl {
}
