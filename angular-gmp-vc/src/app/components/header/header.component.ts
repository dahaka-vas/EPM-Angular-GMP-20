import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@gmp-vc-services/authentication.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ICurrentUser } from 'src/app/models/user.models';

@Component({
    selector: 'gmp-vc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    private componentDestroyed$ = new Subject<void>();

    public user!: ICurrentUser;

    constructor(
        public authService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authService.currentUser$
            .pipe(
                tap(v => this.user = v),
                takeUntil(this.componentDestroyed$),
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    public logout(): void {
        this.authService.logout();
        console.log('Logout');
    }
}
