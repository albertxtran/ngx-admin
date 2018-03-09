import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';
//import {BaThemePreloader} from '../../theme/services';

@Injectable()
export class Top100ListsService {
    
    constructor (private _http: Http){}
    
    getVentures(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/top100/all',options)
            .map(res => res.json());
    }

    getTop100Lists(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/top100/lists',options).map(res => {
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

    getTop100Archived(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/top100/archived',options);
    }

    removeFromTop100(id:Number) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete('/rest/plugandplay/api/v1/top100/delete/'+id,options)
            .map(res => res.json());
    }

    deleteTop100List(api_key:string, listName:string) { 
        // console.log(api_key);
        // console.log(listName);
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/top100list/delete',"{\"api_key\":\""+api_key+"\",\"listName\":\""+listName+"\"}",options);
    }

    archiveList(body:String) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/rest/plugandplay/api/v1/top100/archivelist',body,options)
            .map(res => res.json());
    }

    unarchiveList(body:String) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/rest/plugandplay/api/v1/top100/unarchivelist',body,options)
            .map(res => res.json());
    }

    addTop100List(body: String) {
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/rest/plugandplay/api/v1/top100/newlist',body,options)
            .map(res => res.json());
    }
}