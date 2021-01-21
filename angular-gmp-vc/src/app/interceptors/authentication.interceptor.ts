import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@gmp-vc-services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthenticationService,
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = JSON.parse(localStorage.getItem('user') || '{}').token;
        const requestUpdate = request.url.includes('/auth/login')
            ? {}
            : {
                setHeaders: {
                    Authorization: token
                }
            }
        const req = request.clone(requestUpdate);
        return next.handle(req);
    };
}
