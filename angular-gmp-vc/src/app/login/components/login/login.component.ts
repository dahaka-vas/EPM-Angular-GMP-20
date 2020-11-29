import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@gmp-vc-services/authentication.service';

@Component({
    selector: 'gmp-vc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
        });
    }

    public login(): void {
        this.authService.login(this.form.value.email, this.form.value.password);
        if (this.authService.isAuthenticated) {
            console.log('logged in successfully');
        } else {
            console.log('logged in failed');
        }
    }

}
