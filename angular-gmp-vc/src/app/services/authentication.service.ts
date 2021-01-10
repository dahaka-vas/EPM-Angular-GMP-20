import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USERS } from '../mocks/users.mock';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    public isAuthenticated = false;

    constructor(
        private router: Router,
    ) { }

    public login(login?: string, password?: string): boolean {
        const token = JSON.parse(this.getUserInfo() || '{}').token;
        const currentUser = USERS.find(user => user.token === token || (user.login === login && user.password === password));
        this.isAuthenticated = !!currentUser;

        if (this.isAuthenticated && !token) {
            const keys = Object.keys(currentUser || {}).filter(key => key !== 'password');
            const userStorageValue = JSON.stringify(currentUser, keys);
            localStorage.setItem('user', userStorageValue);
        }

        return this.isAuthenticated;
    }

    public logout(): void {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
    }

    public getUserInfo(): string | null {
        return localStorage.getItem('user');
    }
}
