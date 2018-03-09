import {Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../@theme/validators';
import { ToasterService } from '../../@theme/providers/toaster.service';

import { VerifyService } from './verify.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'verify',
  styleUrls: ['./verify.scss'],
  templateUrl: './verify.html',
})
export class Verify {

  public submitted:boolean = false;
  jsonObj:any[];
  api_key: string;
  private sub: any;
  private verified: boolean = false;
  private processed: boolean;

  constructor(fb:FormBuilder,private _verifyService: VerifyService, public _toasterService: ToasterService , vcr: ViewContainerRef, private route: ActivatedRoute) {

/*     this.form = fb.group({
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
    this.repeatPassword = this.passwords.controls['repeatPassword']; */
    this._verifyService = _verifyService;  
    this._toasterService.toastr.setRootViewContainerRef(vcr);    

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.api_key = params['api_key']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.       //JSON.stringify(data)
       var body;
       this._verifyService.verify(this.api_key).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this._toasterService.showError("We could not verify your email. Please contact a Plug and Play representative.", "", 4000);
      } else if(res.status == 206){
        this._toasterService.showWarning("Your email address is already verifyed with Playbook.", "", 4000);
      } else if (res.status < 200 || res.status >= 300){
        this._toasterService.showError("We could not verify your email. Please contact a Plug and Play representative.", "", 4000);
      }
      // If everything went fine, return the response
      else {
        this.verified = true;        
        this._toasterService.showSuccess("Your email has been verified.", "Success!", 4000);       
        return res.json();
        
      }
    }).subscribe(data => body = data,
      err => {console.error('Error: ' + err)
                this.processed = true},
          () => {console.log("Completed!"),
                this.processed = true;}
          
      );
    });

  }
}
