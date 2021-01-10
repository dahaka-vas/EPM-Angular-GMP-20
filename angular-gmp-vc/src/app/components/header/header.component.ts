import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@gmp-vc-services/authentication.service';

@Component({
    selector: 'gmp-vc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    constructor(
        public authService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
    }

    public logout(): void {
        this.authService.logout();
        console.log('Logout');
    }
}
