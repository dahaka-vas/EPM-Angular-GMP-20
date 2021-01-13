import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { Subject } from 'rxjs';
import {
    filter,
    takeUntil,
    startWith,
} from 'rxjs/operators';

const breadcrumbsMap = {
    courses: 'Courses',
    new: 'New Course',
}

@Component({
    selector: 'gmp-vc-breadcrumbs-nav',
    templateUrl: './breadcrumbs-nav.component.html',
    styleUrls: ['./breadcrumbs-nav.component.scss'],
})
export class BreadcrumbsNavComponent implements OnInit {

    public breadcrumbs: any[] = [];
    private componentDestroyed$ = new Subject<void>();

    constructor(
        private router: Router,
    ) { }

    public ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            startWith(null),
            takeUntil(this.componentDestroyed$),
        ).subscribe(event => {
            this.breadcrumbs = this.router.url.split('/').filter(url => url).reduce((breadcrumbs: any[], url: string) => {
                const link = breadcrumbs.reduce((allUrls, currentUrl) => [...allUrls, currentUrl.url], []);
                link.push(url);

                const newUrl = {
                    routerLink: link.join('/'),
                    text: (breadcrumbsMap as any)[url] || 'Edit Course',
                    url,
                };

                return [
                    ...breadcrumbs,
                    newUrl,
                ];
            }, []);
        });
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
}
