import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseModel } from '../../../shared/models/response.model';
import {APIUrlHelper} from '../../../shared/helpers/apiurl.helper';
import {AuthenticationModel} from '../models/authentication.model';
@Injectable()
export class AuthenticationService {
    http: Http
    constructor(http: Http) {
        this.http = http;
    }

    getwatchlist() {
        return this.http.get(APIUrlHelper.WatchlistApiEndPoint+'/all').map((res: Response) => <ResponseModel>res.json());
    }
  
    register(register:AuthenticationModel) {        
        var data = JSON.stringify(register);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(APIUrlHelper.AutenticationApiEndPoint+'/register', data, options)
            .map((res: Response) => <ResponseModel>res.json());
    }

    verifyTokenAndGetUserDetails(token:string)
    {        
        return this.http.get(APIUrlHelper.AutenticationApiEndPoint+'/verifyTokenAndGetUserDetails/'+token).map((res: Response) => <ResponseModel>res.json());
    }

    login(login:AuthenticationModel) {        
        var data = JSON.stringify(login);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(APIUrlHelper.AutenticationApiEndPoint+'/login', data, options)
            .map((res: Response) => <ResponseModel>res.json());
    }
}   