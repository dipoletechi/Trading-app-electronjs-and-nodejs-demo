import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseModel } from '../../shared/models/response.model';
import {APIUrlHelper} from '../../shared/helpers/apiurl.helper';
@Injectable()
export class StockService {
    http: Http
    constructor(http: Http) {
        this.http = http;
    }

    getwatchlist(authToken) {
        return this.http.get(APIUrlHelper.WatchlistApiEndPoint+'/all/'+authToken).map((res: Response) => <ResponseModel>res.json());
    }

    getDefaultSymbol(authToken) {
        return this.http.get(APIUrlHelper.WatchlistApiEndPoint+'/default/'+authToken).map((res: Response) => <ResponseModel>res.json());
    }

    addsymbol(symbol,authToken) {        
        var data = JSON.stringify({ "Symbol": symbol,"AuthToken":authToken });
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(APIUrlHelper.WatchlistApiEndPoint+'/add/symbol', data, options)
            .map((res: Response) => <ResponseModel>res.json());
    }
}   