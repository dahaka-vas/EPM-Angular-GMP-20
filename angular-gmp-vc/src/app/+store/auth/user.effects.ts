import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@gmp-vc-services/http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IAuthorizationResponse } from 'src/app/models/http.models';
import { login, loginSuccess, logout } from './user.actions';

@Injectable()
export class UserEffects {
    constructor(
        private httpService: HttpService,
        private actions$: Actions,
        private router: Router,
    ) { }

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        switchMap(({ username, password }) => this.httpService.login(username, password)
            .pipe(
                switchMap((response: IAuthorizationResponse) => {
                    const currentUser = {
                        login: username,
                        ...response,
                    }
                    localStorage.setItem('user', JSON.stringify(response));
                    this.router.navigate(['/courses']);
                    return of(loginSuccess({ user: currentUser }));
                }),
            )),
    ));

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(logout),
        tap(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        }),
    ), { dispatch: false });
}
