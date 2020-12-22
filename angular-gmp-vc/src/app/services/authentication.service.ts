import { Injectable } from '@angular/core';
import { USERS } from '../mocks/users.mock';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    public isAuthenticated = false;

    constructor() { }

    public login(login: string, password: string): void {
        const currentUser = USERS.find(user => user.login === login && user.password === password);
        this.isAuthenticated = !!currentUser;
        if (this.isAuthenticated) {
            const keys = Object.keys(currentUser || {}).filter(key => key === 'password');
            const userStorageValue = JSON.stringify(currentUser, keys);
            localStorage.setItem('user', userStorageValue);
        }
    }

    public logout(): void {
        localStorage.removeItem('user');
    }

    public getUserInfo(): string | null {
        return localStorage.getItem('user');
    }
}
