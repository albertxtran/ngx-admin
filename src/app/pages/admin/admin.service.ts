import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {
    body:Object = {api_key :"f7d624c2-f89e-40b9-9e4b-ff2db471a998"}
    constructor (private _http: Http) {
      
    }

    getUsersPage(page:Number, query:String){ 
        let body : any;
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/users/query/'+page+'?query='+query,options)
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

    getUsersPageFilter(page:Number, filters:any[]){ 
        let body : any;
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let query: string = "";
        for(var i = 0; i < filters.length; i ++){
            let filter: String = filters[i].name;
            
            if(i+1 == filters.length){                
                query += filter.toLowerCase() + "=" + filters[i].value
            }else{
                query += filter.toLowerCase() + "=" + filters[i].value + "&";
            }            
        }
        //console.log("Query: "+query);
        return this._http.get('/rest/plugandplay/api/v1/users/filter/'+page+'?'+query,options)
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

    addUser(body:string) { 
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://54.145.172.103,*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/register',body,options);
    }

    getAllUsers(){
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/user/all',options)
            .map(res => res.json());
    }

    deleteUser(id:Number) { 
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/users/delete',"{\"id\":"+id+"}",options);
    }

    updateUser(body:string){
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json'});
        let options = new RequestOptions({ headers: header });
        //console.log(body);
        return this._http.post('/rest/plugandplay/api/v1/users/update',body,options);
    }

    getCorporations(){
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/corporations/all',options)
            .map(res => res.json());
    }
}