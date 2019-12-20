import { Component, ViewChild, AfterViewInit, NgZone, ViewEncapsulation } from '@angular/core';
import { ipcRenderer, remote } from 'electron';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ResponseType } from '../shared/models/response.model'
import { AuthenticationModel } from './shared/models/authentication.model';
import { AuthenticationService } from './shared/services/authentication.service';
import { CustomErrorStateMatcher } from '../shared/helpers/errorstatematcher.helper';
@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AuthenticationComponent implements AfterViewInit {

    registrationForm: FormGroup;
    loginForm: FormGroup;

    matcher = new CustomErrorStateMatcher();

    registerSuccessMessage: string = '';
    registerErrorMessage: string = '';
    isRegisterationInProgress: boolean = false;

    loginSuccessMessage: string = '';
    loginErrorMessage: string = '';
    isLoginInProgress: boolean = false;
    ngAfterViewInit(): void {

    }

    isLoading: boolean = false;
    loaderMessage: string = "Please wait.."
    constructor(private authenticationService: AuthenticationService, private zone: NgZone, formBuilder: FormBuilder) {
        this.registrationForm = formBuilder.group({
            // define your control in you form
            userNameControl: ['',
                Validators.compose([Validators.required, Validators.email])
            ],
            passwordControl: ['', Validators.required],
            confirmPasswordControl: ['', Validators.required]
        }, {
                validator: CustomErrorStateMatcher.MatchPassword
            })

        this.loginForm = formBuilder.group({            
            userNameControl: ['',
                Validators.compose([Validators.required, Validators.email])
            ],
            passwordControl: ['', Validators.required],
        })
    }


    onRegisterSubmit() {
        this.registerErrorMessage = '';
        this.registerSuccessMessage = '';
        this.registrationForm.markAsTouched();
        if (this.registrationForm.status != "INVALID") {
            this.isRegisterationInProgress = true;
            var register = new AuthenticationModel();
            register.UserName = this.registrationForm.controls.userNameControl.value;
            register.Password = this.registrationForm.controls.confirmPasswordControl.value;            
            this.authenticationService.register(register).subscribe(
                data => {
                    console.log(data);
                    if (data.Type == ResponseType.Success) {
                        this.registrationForm.reset();
                        this.registerSuccessMessage = 'Congratulations!! Your registeration completed successfully, now login with same credentials and enjoy trade with us!!';
                    } else {
                        this.registerErrorMessage = data.Message;
                    }
                    this.isRegisterationInProgress = false;
                    
                },
                error => {
                    console.log(error);
                    this.registerErrorMessage = "Something wrong with registration process, please try again or contact to administration";
                    this.isRegisterationInProgress = false;
                }
            );
        }
    }


    onLoginSubmit() {
        this.loginErrorMessage = '';
        this.loginSuccessMessage = '';
        this.loginForm.markAsTouched();
        if (this.loginForm.status != "INVALID") {
            this.isLoginInProgress = true;
            var login = new AuthenticationModel();
            login.UserName = this.loginForm.controls.userNameControl.value;
            login.Password = this.loginForm.controls.passwordControl.value;            

            this.authenticationService.login(login).subscribe(
                data => {
                    if (data.Type == ResponseType.Success) {                        
                        this.loginForm.reset();
                        this.loginSuccessMessage = 'You have successfully loggedin, preparing trade market for you!!';
                        ipcRenderer.send('showmenu',(data.Data as any).AuthToken,false);
                    } else {
                        this.loginErrorMessage = data.Message;
                    }
                    this.isLoginInProgress = false;
                },
                error => {
                    this.loginErrorMessage = "Something wrong with user verification process, please try again or contact to administration";
                    this.isLoginInProgress = false;
                }
            );
        }
    }
}