import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';

@Injectable()
export class VerifyService {
    
    constructor (private _http: Http) {
      
    }

    verify(api_key:String) { 
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/verify/'+api_key,options);
    }
}



