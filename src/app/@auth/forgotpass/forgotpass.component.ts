import {Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../@theme/validators';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ForgotpassService } from './forgotpass.service';
import { ToasterService } from '../../@theme/providers/toaster.service';


@Component({
  selector: 'forgotpass',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./forgotpass.scss'],
  templateUrl: './forgotpass.html',
})
export class Forgotpass {
  public verified: boolean=false;
  public form:FormGroup;
  public email:AbstractControl;
  
  public submitted:boolean = false;
  public loading: boolean;
  jsonObj:any[];
  constructor(fb:FormBuilder,private _forgotpassService: ForgotpassService, public _toasterService: ToasterService, vcr: ViewContainerRef) {

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])]
    });

    this.email = this.form.controls['email'];
    this._forgotpassService = _forgotpassService;  
    this._toasterService.toastr.setRootViewContainerRef(vcr);  
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      // your code goes here
      //console.log(values);
      class User {
        public email: string;
        public api_key: string;
      }
      /* console.log(this.name.value);
      console.log(this.email.value);
      console.log(this.password.value); */
      var json = new User();      
      json.email = this.email.value;
      json.api_key = "f7d624c2-f89e-40b9-9e4b-ff2db471a998";
      //console.log(JSON.stringify(json));
      var body: any;
      this._forgotpassService.forgotpass(JSON.stringify(json)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this._toasterService.showError("Invalid email address. Please contact a Plug and Play representative.", "", 4000);
      } else if (res.status < 200 || res.status >= 300){
        this._toasterService.showError("We cannot reset your password. Please try again.", "", 4000);
      }
      // If everything went fine, return the response
      else {
        this._toasterService.showSuccess("An email has been sent to your address to reset your password.", "Success!", 4000);
        this.verified = !this.verified;
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

  requested(){
    this.verified = !this.verified;
  }

/*   showSuccess(message: string, title: string, time: number) {
      this.toastr.success(message, title,{dismiss: 'click'});
  }
  showError(message: string, title: string, time: number) {
        this.toastr.error(message, title,{dismiss: 'click'});
  }
  showWarning(message: string, title: string, time: number) {
        this.toastr.warning(message, title,{dismiss: 'click'});
  } */
}
