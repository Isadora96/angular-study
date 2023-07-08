import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree> => {
        const router = inject(Router);
        const authService = inject(AuthService);
        return authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                if(isAuth) {
                    return true;
                }
                return router.createUrlTree(['/auth']);
            })
        );
};