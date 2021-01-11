import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '@gmp-vc-services/authentication.service';
import { HttpService } from '@gmp-vc-services/http.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IUser } from '../models/user.models';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private httpService: HttpService,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const loginPage = this.router.parseUrl('/login');
        const token = JSON.parse(this.authService.getUserInfo() || '{}').token;
        const login$ = this.httpService.getUser(token)
            .pipe(
                switchMap((user: IUser) => this.authService.login(user.login, user.password)),
                map((response: any) => !!response),
                catchError(() => of(loginPage)),
            );
        return this.authService.isAuthenticated || login$;
    }
}
