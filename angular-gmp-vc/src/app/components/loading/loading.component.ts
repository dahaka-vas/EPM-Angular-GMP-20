import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@gmp-vc-services/loading.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'gmp-vc-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    public isLoading = false;

    private componentDestroyed$ = new Subject<void>();

    constructor(
        private loadingService: LoadingService,
    ) { }

    public ngOnInit(): void {
        this.loadingService.loading$
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((isLoading: boolean) => this.isLoading = isLoading);
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
}
