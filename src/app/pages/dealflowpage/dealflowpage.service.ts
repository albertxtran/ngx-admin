import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';

@Injectable()
export class DealflowPageService {
    
    constructor (private _http: Http) {
      
    }

    getDealflowByName(name:String) { 
        let headers = new Headers({ 'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/dealflow/'+name,options)
            .map(res => res.json());
    }

    getUserById(id:Number) { 
        let headers = new Headers({ 'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/user/'+id,options)
            .map(res => res.json());
    }

    getDealflowStartup(name:String){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/dealflow_startup/'+name,options)
            .map(res => res.json());
    }

    removeFromDealflow(id:Number,dealflow_name:String) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        let body = "{\"id\":"+id+",\"dealflow_name\":\""+dealflow_name+"\"}";
        return this._http.post('/rest/plugandplay/api/v1/dealflow/delete/',body,options)
            .map(res => res.json());
    }

    getVenturesById(id:Number){
        let headers = new Headers({ 'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/ventures/'+id,options)
            .map(res => res.json());
    }

}