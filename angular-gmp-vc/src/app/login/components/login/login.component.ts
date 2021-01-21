import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { login } from 'src/app/+store/auth/user.actions';
import { ICurrentUser } from 'src/app/models/user.models';

@Component({
    selector: 'gmp-vc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public form!: FormGroup;

    private componentDestroyed$ = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private store: Store,
    ) { }

    public ngOnInit(): void {
        this.form = this.fb.group({
            email: [null, Validators.required],
            password: [null, Validators.required],
        });
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    // TODO: Wrong e-mail or password
    public login(): void {
        const { email, password } = this.form.value;
        this.store.dispatch(login({ username: email, password: password }));
    }
}
