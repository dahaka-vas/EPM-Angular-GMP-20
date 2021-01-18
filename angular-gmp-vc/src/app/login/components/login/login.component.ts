import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@gmp-vc-services/authentication.service';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { IAuthorizationResponse } from 'src/app/models/http.models';

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
        private authService: AuthenticationService,
        private router: Router,
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
        this.authService.login(this.form.value.email, this.form.value.password)
            .pipe(
                tap((response: IAuthorizationResponse) => {
                    console.log('logged in successfully');
                    this.router.navigate(['/courses']);
                }),
                catchError((error: any) => {
                    console.log('logged in failed')
                    // console.error(error);
                    return of(error);
                }),
                takeUntil(this.componentDestroyed$),
            )
            .subscribe();
    }
}
