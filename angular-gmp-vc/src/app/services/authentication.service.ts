import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { USERS } from '../mocks/users.mock';
import { IAuthorizationResponse } from '../models/http.models';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    public isAuthenticated = false;

    constructor(
        private router: Router,
        private httpService: HttpService,
    ) { }

    public login(login: string, password: string): Observable<IAuthorizationResponse> {
        return this.httpService.login(login, password)
            .pipe(
                tap((response: IAuthorizationResponse) => {
                    this.isAuthenticated = !!response;
                    localStorage.setItem('user', JSON.stringify(response));
                })
            );
    }

    public logout(): void {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
    }

    public getUserInfo(): string | null {
        return localStorage.getItem('user');
    }
}
