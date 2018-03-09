import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';
//import {BaThemePreloader} from '../../theme/services';

@Injectable()
export class Top20Service {
    
    constructor (private _http: Http){}
    
    getTop20ForList(listName:String){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        //console.log("Getting list "+listName)
        let body = "{\"listName\":\""+listName+"\"}";
        return this._http.post('/rest/plugandplay/api/v1/top20/all',body,options).map(res => {
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

    removeFromTop20(id:Number,listName:String) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        let body = "{\"id\":"+id+",\"listName\":\""+listName+"\"}";
        return this._http.post('/rest/plugandplay/api/v1/top20/delete/',body,options)
            .map(res => res.json());
    }

    movePosition(body:String) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/rest/plugandplay/api/v1/top20/move',body,options)
            .map(res => res.json());
    }

    /*addTop20List(body: String) {
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/rest/plugandplay/api/v1/top20/newlist',body,options)
            .map(res => res.json());
    }*/

    //54.145.172.103
    //        BaThemePreloader.registerLoader(this.getVentures());
    /*getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.StartupsData);
      }, 2000);
    });
    }*/
}