import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // take(1) -> takes one value for the service and unsubscribe right after
        //exhaustMap waits for the first observable(user) to complete
        return this.authService.user.pipe(
            take(1), 
            exhaustMap((user: any) => {
                if(!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone(
                    {
                        params: new HttpParams().set('auth', user.token)
                    }
                );
                return next.handle(modifiedReq);
            })
        );
    }

}