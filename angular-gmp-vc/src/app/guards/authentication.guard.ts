import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '@gmp-vc-services/authentication.service';
import { HttpService } from '@gmp-vc-services/http.service';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { login } from '../+store/auth/user.actions';
import { ICurrentUser, IUser } from '../models/user.models';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private httpService: HttpService,
        private store: Store<{
            user: { user: ICurrentUser }
        }>,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | boolean | UrlTree {
		const loginPage = this.router.parseUrl('/login');
        const token = JSON.parse(localStorage.getItem('user') || '{}').token;
        const login$ = this.httpService.getUser(token)
        .pipe(
            switchMap((user: IUser) => {
                this.store.dispatch(login({ username: user.login, password: user.password }));
                return this.store.pipe(select('user'));
            }),
            map(({ user }) => !!user),
            catchError(() => of(loginPage)),
        );
        return login$;
    }
}
