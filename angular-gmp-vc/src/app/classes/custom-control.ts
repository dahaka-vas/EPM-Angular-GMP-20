import { ControlValueAccessor } from '@angular/forms';

export class CustomControl implements ControlValueAccessor {
    public value: any = null;

    private onChange = (value: any) => {};
    private onTouched = () => {};

    constructor() { }

    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public updateValue(value: any) {
        this.value = value;
        this.onChange(value);
        this.onTouched();
    }
}
