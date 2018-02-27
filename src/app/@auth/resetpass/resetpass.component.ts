import {Component, ViewEncapsulation, ViewContainerRef, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../@theme/validators';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ResetpassService } from './resetpass.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'resetpass',
  encapsulation: ViewEncapsulation.None,
  styles: ['./resetpass.scss'],
  templateUrl: './resetpass.html',
})
export class Resetpass implements OnInit{
  public changed: boolean = false;
  public form:FormGroup;
  public password:AbstractControl;
  api_key: string;
  private sub: any;
  public submitted:boolean = false;
  public loading: boolean;
  jsonObj:any[];
  constructor(fb:FormBuilder,private _resetpassService: ResetpassService, public toastr: ToastsManager, vcr: ViewContainerRef, private route: ActivatedRoute) {

    this.form = fb.group({
      'password': ['', Validators.compose([Validators.required])]
    });

    this.password = this.form.controls['password'];
    this._resetpassService = _resetpassService;  
    this.toastr.setRootViewContainerRef(vcr);   
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.api_key = params['api_key']; // (+) converts string 'id' to a number
    })};

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      // your code goes here
      //console.log(values);
      class User {
        public password: string;
      }
      /* console.log(this.name.value);
      console.log(this.email.value);
      console.log(this.password.value); */
      var json = new User();      
      json.password = this.password.value;
      //this.api_key = this.route.params['api_key'];
      //json.api_key = params['api_key'];//"f7d624c2-f89e-40b9-9e4b-ff2db471a998";
      //console.log(JSON.stringify(json));
      var body: any;
      this._resetpassService.resetpass(this.api_key, JSON.stringify(json)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.showError("Invalid account. Please contact a Plug and Play representative.", "", 4000);
      } else if (res.status < 200 || res.status >= 300){
        this.showError("We cannot reset your password. Please try again.", "", 4000);
      }
      // If everything went fine, return the response
      else {
        this.showSuccess("Your password has been changed.", "Success!", 4000);
        this.changed = true;
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
