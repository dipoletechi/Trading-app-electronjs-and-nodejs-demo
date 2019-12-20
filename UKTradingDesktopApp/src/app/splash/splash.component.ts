import { Component, ViewChild, AfterViewInit, ViewEncapsulation, EventEmitter, NgZone } from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import { AuthenticationService } from '../authentication/shared/services/authentication.service';
import { ResponseType } from '../shared/models/response.model'

@Component({
    selector: 'app-splash',
    templateUrl: './splash.component.html',
    styleUrls: ['./splash.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class SplashComponent implements AfterViewInit {
    message: string = "Preparing information...";
    isLoading: boolean = false;
    loaderMessage: string = 'Loading..';
    constructor(private authenticationService: AuthenticationService) {
        var authToken = remote.getGlobal("userAuthToken");
        console.log('token info', authToken);
        if (authToken != undefined && authToken != '' && authToken != null) {

            //get token user information and redirect to menu screen
            //If token expire or not verified redirect to registration screen
            authenticationService.verifyTokenAndGetUserDetails(authToken).subscribe(
                data => {
                    if (data.Type == ResponseType.Success) {
                        var email = (data.Data as any).Email;
                        this.message = "Information verified, you are logging as '" + email + "'";
                        ipcRenderer.send('showmenu', authToken, true);
                    } else {
                        //open authentication panel
                        this.message = "System need to authenticate you, please login";
                        ipcRenderer.send('authentication', true);
                    }
                },
                error => {
                    this.message = "System need to authenticate you, please login";
                    ipcRenderer.send('authentication', true);
                }
            );
        }
        else {
            this.message = "System need to authenticate you, please login";
             ipcRenderer.send('authentication',true);                        
            //redirect to registration screen
        }
    }

    ngAfterViewInit(): void {

    }
}

