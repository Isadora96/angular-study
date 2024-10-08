import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null!);

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}


    signup(email: string, password: string) {

        const url: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
        const data = { email, password, returnSecureToken: true}

        return this.http.post<AuthResponseData>(url, data)
        .pipe(catchError(this.handleError), tap(resData => {
            this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }));
    }

    login(email: string, password: string) {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;
        const data = { email, password, returnSecureToken: true}

        return this.http.post<AuthResponseData>(url, data)
        .pipe(catchError(this.handleError), tap(resData => {
            this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }));
    }

    logout() {
        this.user.next(null!);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData')!);

        if(userData) {
            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if(loadedUser.token) {
                this.user.next(loadedUser);
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout(expirationDuration);
            }
        }
    }

    private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResp: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if(!errorResp.error || !errorResp.error.error) {
            return  throwError(errorMessage);
        }
        switch (errorResp.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
                errorMessage = 'Email or password incorrect!'
                break;
        }

        return throwError(errorMessage);
    }
}