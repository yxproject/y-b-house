import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    token:string = '';

    constructor() {
        console.log(localStorage.getItem('token'));
        this.token = localStorage.getItem('token');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = 'Bearer ' + this.token;
        const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', token)
        });
        return next.handle(clonedRequest);
    }
}