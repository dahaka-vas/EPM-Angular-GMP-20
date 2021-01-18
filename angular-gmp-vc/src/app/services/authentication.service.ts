import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { USERS } from '../mocks/users.mock';
import { IAuthorizationResponse } from '../models/http.models';
import { ICurrentUser } from '../models/user.models';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    public isAuthenticated = false;
    public currentUser$: Subject<ICurrentUser> = new Subject();

    constructor(
        private router: Router,
        private httpService: HttpService,
    ) { }

    public login(login: string, password: string): Observable<IAuthorizationResponse> {
        return this.httpService.login(login, password)
            .pipe(
                tap((response: IAuthorizationResponse) => {
                    this.isAuthenticated = !!response;
                    this.currentUser$.next({
                        login,
                        ...response,
                    });
                    localStorage.setItem('user', JSON.stringify(response));
                })
            );
    }

    public logout(): void {
        this.currentUser$.next();
        localStorage.removeItem('user');
        this.router.navigate(['login']);
    }

    public getUserInfo(): string | null {
        return localStorage.getItem('user');
    }
}
