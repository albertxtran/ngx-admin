import {Component, ViewEncapsulation, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
 
import { LoginService } from './login.service';
import { AuthenticationService } from '../authentication.service';
//import { BaMenuService } from '../../theme';
//import { Pages } from '../pages.component';
//import { PAGES_MENU } from '../pages.menu.auth';
@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.scss'],
  templateUrl: './login.html',
})
export class Login implements OnInit  { 
  public state: number = 0;
  //public routes: Routes = [];
  model: any = {};
  loading = false;
  error = '';
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public sub:any;
  public logout:boolean = false;

  
  constructor(fb:FormBuilder, private router: Router, private route: ActivatedRoute, private _loginService: LoginService, public toastr: ToastsManager,private authenticationService: AuthenticationService, vcr: ViewContainerRef) { //private _menuService: BaMenuService, 

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.toastr.setRootViewContainerRef(vcr); 

    this.sub = this.route.fragment
     .subscribe((fragment: string) => {
       // Defaults to 0 if no query param provided.       
       if(fragment == 'logout'){
        this.logout = true;
       }
     });
  }
  ngOnInit() {
        // reset login status
        if(this.logout){
          this.authenticationService.logout();
        }
    }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      /*console.log(values);
      console.log(this.email.value);
      console.log (this.password.value);*/
      this.loading = true;
       //this.authenticationService.login(this.model.username, this.model.password)
/*         this.authenticationService.login2(this.email.value, this.password.value).subscribe(result => {
               console.log(result);
                if (result === true) {
                    // login successful
                    this.router.navigate(['pages/startups']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });  */
           this.authenticationService.login(this.email.value, this.password.value)
            .subscribe(result => {
               //console.log(result);
                if (result === 200) {
                    // login successful
                    //console.log("login successful");
                    var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
                    var currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
                    // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
                    /* this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(currentUser));
                    this.router.resetConfig(this._menuService.getAuthRoutes(currentUser)); */

                    this.router.navigate(['pages/']);
                } else if(result === 206){
                    // login failed
                    this.loading = false;
                    this.state = 1;
                } else if(result === 204){
                  // login failed
                  this.error = 'Username or password is incorrect';
                  this.loading = false;
                }
            });    
      
    }
  }

  public send_verification(values:Object):void {
    this.loading = true;
    if (this.form.valid) {
  
      // your code goes here
      //console.log(values);
      class User {
        public email: string;
      }

      var json = new User();      
      json.email = this.email.value;
      //console.log(JSON.stringify(json));
      var body: any;
      this._loginService.send_verification(JSON.stringify(json)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.showError("Invalid email address. Please contact a Plug and Play representative.", "", 4000);
      } else if (res.status < 200 || res.status >= 300){
        this.showError("We cannot send an email. Please try again.", "", 4000);
      }
      // If everything went fine, return the response
      else {
        this.state = 2;
        return res.json();
      }
    }).subscribe(data => body = data,
      err => { console.error('Error: ' + err);
              this.loading = false;},
          () => {console.log("Completed!");
          this.loading = false;}
      );  
    }
    //this.state = 2;
  }

  public resend_verification(){
    this.state = 1;
  }

  public goToLogin(){
    this.state = 0;
  }

  showError(message: string, title: string, time: number) {
    this.toastr.error(message, title,{dismiss: 'click'});
  }
}