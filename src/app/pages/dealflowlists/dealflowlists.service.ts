import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';
//import {BaThemePreloader} from '../../theme/services';

@Injectable()
export class DealflowListsService {
    
    constructor (private _http: Http){}
    
    getVentures(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/dealflow/all',options)
            .map(res => res.json());
    }

    getDealflowLists(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/dealflow/lists',options).map(res => {
                // If request fails, throw an Error that will be caught
                if(res.status == 204) {
                    console.log(res.status);
                    return res;
                } 
                // If everything went fine, return the response
                else {
                    return res;
                }
            });
            //.map(res => res.json());
    }

    getDealflowArchived(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/dealflow/archived',options);
    }

    removeFromDealflow(id:Number) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete('/rest/plugandplay/api/v1/dealflow/delete/'+id,options)
            .map(res => res.json());
    }

    archiveList(body:String) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/rest/plugandplay/api/v1/dealflow/archivelist',body,options)
            .map(res => res.json());
    }

    unarchiveList(body:String) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/rest/plugandplay/api/v1/dealflow/unarchivelist',body,options)
            .map(res => res.json());
    }

    addDealflowList(body: String) {
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/rest/plugandplay/api/v1/dealflow/newlist',body,options)
            .map(res => res.json());
    }
}