
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class GuardService {

    isAuthenticated(): Observable<boolean> {
        var currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!').toString(CryptoJS.enc.Utf8));
        if (currentUser.role == "admin"){
            return Observable.of(true);
        } else {
            return Observable.of(false);
        }
    }
}