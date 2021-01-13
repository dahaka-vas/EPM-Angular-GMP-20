import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    public loading$: Subject<boolean> = new Subject();

    constructor() { }

    loadingUp(request: Observable<any>): Observable<any> {
        this.loading$.next(true);

        return request.pipe(
            delay(400),
            finalize(() => this.loading$.next(false)),
        );
    }
}
