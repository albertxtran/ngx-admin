import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {
    
    constructor (private _http: Http) {
      
    }
    
    getVenture(id:Number) { 
        let headers = new Headers({ 'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/ventures/'+id,options)
            .map(res => res.json());
    }
    
    getTop100Lists(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/top100/lists',options)
            .map(res => res.json());
    }

    getTop20Lists(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/top20/lists',options)
            .map(res => res.json());
    }
    /*getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.StartupsData);
      }, 2000);
    });
  }*/
  
    addToTop100(id:Number,listName:String) { 
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/ventures/addtop100',"{\"id\":"+id+",\"listName\":\""+listName+"\"}",options);
    }

    addToTop20(id:Number,listName:String) { 
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/ventures/addtop20',"{\"id\":"+id+",\"listName\":\""+listName+"\"}",options);
    }

    removeFromTop100(id:Number) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: headers });
        return this._http.delete('/rest/plugandplay/api/v1/top100/delete/'+id,options)
            .map(res => res.json());
    }
}