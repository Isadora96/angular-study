import { Component, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    isLoginMode: boolean = true;
    isLoading: boolean = false;
    errorMessage: string | null = null;

    private closeSub!: Subscription;

    constructor (private authService: AuthService, private router: Router, private viewContainerRef: ViewContainerRef) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        let authObs: Observable<AuthResponseData>;

        if(!form.valid) return

        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

        if(this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(resData => {
            this.isLoading = false;
            this.router.navigate(['./recipes']);
        }, error => {
            this.errorMessage = error,
            this.isLoading = false;
            this.showErrorAlert(this.errorMessage);
        })

        form.reset();
    }

    onHandleError() {
        this.errorMessage = null;
    }

    private showErrorAlert(message: string | null) {
        const alertCpmFactory = this.viewContainerRef.createComponent(AlertComponent);

        alertCpmFactory.instance.message = message!;
        this.closeSub = alertCpmFactory.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            this.viewContainerRef.clear();
        });
        
    }
}