import {Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../@theme/validators';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { RegisterService } from './register.service';

@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  styles: ['./register.scss'],
  templateUrl: './register.html',
})
export class Register {

  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;
  public loading: boolean;
  jsonObj:any[];
  constructor(fb:FormBuilder,private _registerService: RegisterService, public toastr: ToastsManager, vcr: ViewContainerRef) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
    this._registerService = _registerService;  
    this.toastr.setRootViewContainerRef(vcr);   

  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      // your code goes here
      //console.log(values);
      class User {
        public name: string;
        public email: string;
        public password: string;
      }
      /* console.log(this.name.value);
      console.log(this.email.value);
      console.log(this.password.value); */
      var json = new User();
      json.name = this.name.value;
      json.email = this.email.value;
      json.password = this.password.value;  
      //console.log(JSON.stringify(json));
      var body: any;
      this._registerService.register(JSON.stringify(json)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.showError("We could not register your email. Please contact a Plug and Play representative.", "", 4000);
      } else if(res.status == 206){
        this.showWarning("Your email address is already registered with Playbook.", "", 4000);
      } else if (res.status < 200 || res.status >= 300){
        this.showError("We could not register your email. Please contact a Plug and Play representative.", "", 4000);
      }
      // If everything went fine, return the response
      else {
        this.showSuccess("An email has been sent to your address for verification.", "Success!", 4000);
        return res.json();
        
      }
    }).subscribe(data => body = data,
      err => { console.error('Error: ' + err);
              this.loading = false;},
          () => {console.log("Completed!");
          this.loading = false;}
      );
      
    }
  }

  showSuccess(message: string, title: string, time: number) {
      this.toastr.success(message, title,{dismiss: 'click'});
  }
  showError(message: string, title: string, time: number) {
        this.toastr.error(message, title,{dismiss: 'click'});
  }
  showWarning(message: string, title: string, time: number) {
        this.toastr.warning(message, title,{dismiss: 'click'});
  }
}
