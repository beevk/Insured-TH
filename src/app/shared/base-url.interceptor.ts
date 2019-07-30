import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    private baseUrl = 'http://test.narendragupta.com/api/Values';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Change modifiedRequest and forward it to the next interceptor/Server
        const modifiedRequest: HttpRequest<any> = req.clone({
            url: `${this.baseUrl}/${req.url}`
        });

        return next.handle(modifiedRequest);
    }
}
