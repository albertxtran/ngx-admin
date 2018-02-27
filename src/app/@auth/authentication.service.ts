import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
//import { Https } from '@angular/https';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {
        // set token if saved in local storage (We get the token from the database so we do not need this anymore)
        // Decrypt 
        /* var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
        var currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); */
        /* var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token; */        
    }

    isAuthenticated(): Observable<boolean> {
        if (localStorage.getItem('currentUser')){
            return Observable.of(true);
        } else {
            return Observable.of(false);
        }
    }

    login(username: string, password: string){
        let header = new Headers({'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header});
       
        return this.http.post('/rest/plugandplay/api/v1/login', JSON.stringify({ email: username, password: password }), options )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                if (response.status == 200) {
                    let token = response.json() && response.json().token;
                    // set token property
                    //this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ id: response.json().id, name: response.json().name, email: response.json().email, password: response.json().password, role: response.json().role, ref_id: response.json().ref_id, pnpOffice: response.json().pnpOffice, token: token, api_key: response.json().api_key, cref_id: response.json().cref_id }), 'pnp4life!');
                    localStorage.setItem('currentUser', ciphertext);   
                    return 200;
                } else if (response.status == 206){
                    return 206;
                }else{
                    // return false to indicate failed login
                    return 204;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        if(localStorage.getItem('currentUser') != null){
            localStorage.clear();
            sessionStorage.clear();
        }

    }
}