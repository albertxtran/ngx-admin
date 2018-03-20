import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { ToasterService } from '../../@theme/providers/toaster.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { ConfirmDealflowService } from './confirmdealflow.service';


@Component({
  selector: 'confirmdealflow',
  styleUrls: ['./confirmdealflow.scss'],
  templateUrl: './confirmdealflow.html',
})
export class ConfirmDealflowComponent implements OnInit, OnDestroy {
  id: number;
  attendee_array: any[];
  private sub: any;
  dealflowState: string;
  dealflowpage: any;
  dealflowstartup: any;
  dealflow_startup: any[];
  timeSlots: any[]= [];
  lists: any[];
  dealflow: any;
  venturesList: any[] = [];
  dealflowname: String;
  public error: boolean;
  public loading: boolean;
  public loading20: boolean;
  public creatingpdf: boolean;
  public pageload: boolean = false;
  role: Observable<any>;
  currentUser: any;
  timeStart: String;
  timeEnd: String;
  agendaJSON: any;
  displayedColumns = ['time','confirmation'];
  venture_id: number;
  

constructor(private route: ActivatedRoute, private _confirmDealflowService: ConfirmDealflowService, public _toasterService: ToasterService, vcr: ViewContainerRef, private router: Router) {
      this.currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!').toString(CryptoJS.enc.Utf8))
      // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
      // this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(this.currentUser));
      // this.router.resetConfig(this._menuService.getAuthRoutes(this.currentUser));
      this.role = this.currentUser.role;
      this._confirmDealflowService = _confirmDealflowService; 
      this._toasterService.toastr.setRootViewContainerRef(vcr);  
      pdfMake.vfs = pdfFonts.pdfMake.vfs;   

      this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.dealflowname = params['dealflowname'] || 0;
        this.venture_id = params['venture_id'] || 0;
      });


      this.pageload = true;
      //this.getLists();
}
  
ngOnInit() {
  this.loading = true;
  const getFakeHttpRequest$ = () => Observable.of('response !').delay(3000);

  const polling$ = new Subject();

  Observable
    // need to tick the first time
    .of(null)
    // everytime our polling$ subject will emit, we'll do again what's next
    .merge(polling$)
    // register to a fake request
    .switchMap(_ =>
      getFakeHttpRequest$()
        .do(_ => {
          // once we're here, the request is done
          // no mater how long it was to get a response ...
          this.getLists();

          // ... we wait 5s and then send a new value to polling$ subject
          // in order to trigger a new request
          setTimeout(_ => polling$.next(null), 5000)
        })
    )
    .subscribe()
}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  
  getLists() {
    this.error = false;
    this._confirmDealflowService.getDealflowByName(this.dealflowname).map(res => {
    // If request fails, throw an Error that will be caught
    if(res.status == 204) {
      this.loading = false;
      this.error = true;
      console.log("Search did not return any results.") 
    } else if (res.status < 200 || res.status >= 300){
      this.loading = false;
      throw new Error('This request has failed ' + res.status);
    }
    // If everything went fine, return the response
    else {
      this.dealflow = res;
      var tmp: any= JSON.stringify(this.dealflow.event_Start)[1] + JSON.stringify(this.dealflow.event_Start)[2];
      if(tmp > 21){
        this.timeStart = (tmp - 12) + ":" + JSON.stringify(this.dealflow.event_Start)[4] + JSON.stringify(this.dealflow.event_Start)[5] + " PM" ;
      }
      else if(tmp > 12){
        this.timeStart = "0" + (tmp - 12) + ":" + JSON.stringify(this.dealflow.event_Start)[4] + JSON.stringify(this.dealflow.event_Start)[5] + " PM" ;
      }
      else if(tmp == 12){
        this.timeStart = tmp + ":" + JSON.stringify(this.dealflow.event_Start)[4] + JSON.stringify(this.dealflow.event_Start)[5] + " PM" ;
      }
      else{
        this.timeStart = tmp + ":" + JSON.stringify(this.dealflow.event_Start)[4] + JSON.stringify(this.dealflow.event_Start)[5] + " AM" ;
      }
      tmp = JSON.stringify(this.dealflow.event_Stop)[1] + JSON.stringify(this.dealflow.event_Stop)[2];
      if(tmp > 21){
        this.timeEnd = (tmp - 12) + ":" + JSON.stringify(this.dealflow.event_Stop)[4] + JSON.stringify(this.dealflow.event_Stop)[5] + " PM" ;
      }
      else if(tmp > 12){
        this.timeEnd = "0" + (tmp - 12) + ":" + JSON.stringify(this.dealflow.event_Stop)[4] + JSON.stringify(this.dealflow.event_Stop)[5] + " PM" ;
      }
      else if(tmp == 12){
        this.timeEnd = tmp + ":" + JSON.stringify(this.dealflow.event_Stop)[4] + JSON.stringify(this.dealflow.event_Stop)[5] + " PM" ;
      }
      else{
        this.timeEnd = tmp + ":" + JSON.stringify(this.dealflow.event_Stop)[4] + JSON.stringify(this.dealflow.event_Stop)[5] + " AM" ;
      }
      this.dealflowState = this.dealflow.dealflow_State;


      this.attendee_array = JSON.parse(res.attendees);
      this._confirmDealflowService.getDealflowStartup(this.dealflowname).subscribe(data => {
        this.dealflow_startup = data;
        this.getTimeSlots();
      });    
      return res;
    }
  }).subscribe();
  //}).subscribe((res)=>{ this.getNames(res)});

}

getTimeSlots(){
  this.timeSlots = [];
  this.dealflow_startup.forEach(data =>{
    if(data.venture_id == this.venture_id){
      if(data.dealflow_Invites != null){
        this.agendaJSON = JSON.parse(data.dealflow_Invites);

        var i = 0;
        var lowest = this.agendaJSON[0];
        var count = 0;
        this.agendaJSON.forEach(element => {
          count = 0;
          JSON.parse(this.dealflow.event_Agenda).forEach(slots => {
            if((slots.start == element.start && slots.end == element.end)){
              count = 1;
            }
          });
          if(!count){
            this.agendaJSON.splice(i,1);
          }
          i++;
        });
        var length = this.agendaJSON.length;
        for(var j = 0; j < length; j++){
          i = 0;
          count = 0;
          lowest = this.agendaJSON[0];
          this.agendaJSON.forEach(element => {
            if(element.start < lowest.start){
              lowest = element;
              count = i;
            }
            i++;
          });
          var tmp: any= JSON.stringify(lowest.start)[1] + JSON.stringify(lowest.start)[2];
          if(tmp > 21){
            lowest.start = (tmp - 12) + ":" + JSON.stringify(lowest.start)[4] + JSON.stringify(lowest.start)[5] + " PM" ;
          }
          else if(tmp > 12){
            lowest.start = "0" + (tmp - 12) + ":" + JSON.stringify(lowest.start)[4] + JSON.stringify(lowest.start)[5] + " PM" ;
          }
          else if(tmp == 12){
            lowest.start = tmp + ":" + JSON.stringify(lowest.start)[4] + JSON.stringify(lowest.start)[5] + " PM" ;
          }
          else{
            lowest.start = tmp + ":" + JSON.stringify(lowest.start)[4] + JSON.stringify(lowest.start)[5] + " AM" ;
          }
          tmp = JSON.stringify(lowest.end)[1] + JSON.stringify(lowest.end)[2];
          if(tmp > 21){
            lowest.end = (tmp - 12) + ":" + JSON.stringify(lowest.end)[4] + JSON.stringify(lowest.end)[5] + " PM" ;
          }
          else if(tmp > 12){
            lowest.end = "0" + (tmp - 12) + ":" + JSON.stringify(lowest.end)[4] + JSON.stringify(lowest.end)[5] + " PM" ;
          }
          else if(tmp == 12){
            lowest.end = tmp + ":" + JSON.stringify(lowest.end)[4] + JSON.stringify(lowest.end)[5] + " PM" ;
          }
          else{
            lowest.end = tmp + ":" + JSON.stringify(lowest.end)[4] + JSON.stringify(lowest.end)[5] + " AM" ;
          }
          this.timeSlots.push(lowest);
          this.agendaJSON.splice(count,1);
        }
      }
    }
  });
  this.loading = false;
}

confirmTime(start: string, end: string){
  var tmpTime: any = start[0] + start[1];
  var tmp: any= start[6] + start[7];
  if(tmp == 'AM'){
    if(tmpTime == 12){
      start = (parseInt(tmpTime) - 12) + ":" + start[3] + start[4];
    }
    else{
      start = tmpTime + ":" + start[3] + start[4];
    }
  }
  else{
    if(tmpTime == 12){
      start = tmpTime + ":" + start[3] + start[4];
    }
    else{
      start = (parseInt(tmpTime) + 12) + ":" + start[3] + start[4];
    }
  }
  tmpTime =  end[0] + end[1];
  tmp = end[6] + end[7];
  if(tmp == 'AM'){
    if(tmpTime == 12){
      end = (parseInt(tmpTime) - 12) + ":" + end[3] + end[4];
    }
    else{
      end = tmpTime + ":" + end[3] + end[4];
    }
  }
  else{
    if(tmpTime == 12){
      end = tmpTime + ":" + end[3] + end[4];
    }
    else{
      end = (parseInt(tmpTime) + 12) + ":" + end[3] + end[4];
    }
  }
  JSON.parse(this.dealflow.event_Agenda).forEach(element => {
    if(element.start == start && element.end == end){
      console.log("found matching agenda: " + JSON.stringify(element));
      if(element.status != "Confirmed"){

      }
      else{
        this._toasterService.showError("This timeslot has been taken.","Sorry",4000)
      }
    }
  });
}

}