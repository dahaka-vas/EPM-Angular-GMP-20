import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@gmp-vc-services/authentication.service';

@Component({
    selector: 'gmp-vc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public isAuthenticated = false;

    constructor(
        private authService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.isAuthenticated = this.authService.isAuthenticated;
    }

    public logout(): void {
        this.authService.logout();
        console.log('Logout');
    }
}
