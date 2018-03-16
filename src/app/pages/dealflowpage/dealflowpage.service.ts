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
        console.log("in remove servie: id = " + id + " dealflow_name = " + dealflow_name);
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

    updateDealflowState(id: Number, state: String){
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        let body = "{\"id\":"+id+",\"state\":\""+state+"\"}";
        return this._http.post('/rest/plugandplay/api/v1/dealflow/updatestate/',body,options)
            .map(res => res.json());
    }

    updateDealflow_event_agenda(body:String) { 
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://64.245.2.167,*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/dealflowform/update',body,options)
        .map(res => {
            // If request fails, throw an Error that will be caught
            if(res.status == 204) {
                console.log(res.status);
                return res;
            } 
            // If everything went fine, return the response
            else {
            return res.json();
            }
        });
    }

    updateDealflow(body:String){
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://64.245.2.167,*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/dealflow/update',body,options)
        .map(res => {
            // If request fails, throw an Error that will be caught
            if(res.status == 204) {
                console.log(res.status);
                return res;
            } 
            // If everything went fine, return the response
            else {
            return res.json();
            }
        });
    }

    selectPriority(id: Number, dealflow_name: String, priority: String){
        console.log("inside select Priority: " + id + dealflow_name + priority);
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        let body = "{\"venture_id\":"+id+",\"dealflow_name\":"+dealflow_name+",\"priority\":"+priority+"}";
        return this._http.post('/rest/plugandplay/api/v1/dealflow/updatePriority/',body,options)
            .map(res => res.json());
    }
    movePosition(body:String) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/rest/plugandplay/api/v1/dealflow/move',body,options)
            .map(res => res.json());
    }
}