import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { logout } from 'src/app/+store/auth/user.actions';
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
        private store: Store<{
            user: { user: ICurrentUser }
        }>,
    ) { }

    public ngOnInit(): void {
        this.store.pipe(
            select('user'),
            tap(({ user }: { user: ICurrentUser }) => this.user = user),
            takeUntil(this.componentDestroyed$),
        ).subscribe()
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    public logout(): void {
        this.store.dispatch(logout());
    }
}
