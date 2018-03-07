import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class EditDealflowService {
    
    constructor (private _http: Http) {
      
    }

    getDealflowByName(name:String) { 
        console.log("Inside service getDealflowName");
        let headers = new Headers({ 'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/dealflow/'+name,options)
            .map(res => { console.log(res);
                return res.json();});
    }
    getUserById(id:Number) { 
        let headers = new Headers({ 'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/user/'+id,options)
            .map(res => res.json());
    }

    getAWSPresignedUrl(api_key:string){
        let headers = new Headers({ 'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/aws/presignedurl?api_key='+api_key,options);
    }
    updateDealflow_form(body:String) { 
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

    getUsersPage(page:Number, query:String){ 
        let body : any;
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/users/query/'+page+'?query='+query,options)
            .map(res => {
                // If request fails, throw an Error that will be caught
                if(res.status == 204) {
                    return res;
                } 
                // If everything went fine, return the response
                else {
                return res.json();
                }
            });
        }
    
    getCorporationsPage(page:Number, query:String){ 
        let body : any;
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/corporations/query/'+page+'?query='+query,options)
            .map(res => {
                // If request fails, throw an Error that will be caught
                if(res.status == 204) {
                    return res;
                } 
                // If everything went fine, return the response
                else {
                    return res.json();
                }
            });
    }

    uploadFileToAmazonS3(body: File, presignedUrl: string){
        const headers = new Headers({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        const options = new RequestOptions({ headers: headers });
        return this._http.put(presignedUrl, body);//, options)
           // .map((response: Response) => response.json())

    }
}