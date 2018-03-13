import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToasterService } from '../../@theme/providers/toaster.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import {MatCheckboxModule} from '@angular/material/checkbox';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { DealflowPageService } from './dealflowpage.service';

interface Ventures {
  tags ? : String;
  stage ? : String;
  verticals ? : String;
  blurb ? : String;
  location ? : String;
  companyName ? : String;
  website ? : String;
  pnpContact ? : String;
  contactName ? : String;
  phoneNumber ? : String;
  totalMoneyRaised ? : String;
  b2bb2c ? : String;
  employees ? : String;
  city ? : String;
  competition ? : String;
  advantage ? : String;
  background ? : String;
  founded ? : String;
  partnerInterests ? : String;
  caseStudy ? : String;
  comments ? : String;
  dateOfInvestment ? : String;
  pnpOffice ? : String;
  oneLiner ? : String;
  investors ? : String;
  howDidYouHear ? : String;
  intlBusinessOpp ? : String;
}
@Component({
  selector: 'dealflowpage',
  styleUrls: ['./dealflowpage.scss'],
  templateUrl: './dealflowpage.html',
})
export class DealflowPageComponent implements OnInit, OnDestroy {
  id: number;
  attendee_array: any[];
  private sub: any;
  dealflowpage: any;
  dealflowstartup: any;
  dealflow_startup: any[];
  timeSlots: any[];
  lists: any[];
  dealflow: any;
  venturesList: any[] = [];
  primaryStartups: any[] = [];
  secondaryStartups: any[] = [];
  rejectedStartups: any[]= [];
  lead_name: String;
  account_manager_name: String;
  venture_associate_name: String;
  champion_name: String;
  supporting_member1_name: String = "";
  supporting_member2_name: String = "";
  supporting_member3_name: String = "";
  lead_email: String;
  account_manager_email: String;
  venture_associate_email: String;
  champion_email: String;
  supporting_member1_email: String = "";
  supporting_member2_email: String = "";
  supporting_member3_email: String = "";
  dealflowname: String;
  public error: boolean;
  public loading: boolean;
  public loading20: boolean;
  public creatingpdf: boolean;
  public pageload: boolean = false;
  role: string;
  currentUser: any;
  primaryCheckAll: boolean = false;
  secondaryCheckAll: boolean = false;
  sendList: any[]= [];

  

constructor(private route: ActivatedRoute, private _dealflowPageService: DealflowPageService, public _toasterService: ToasterService, vcr: ViewContainerRef, private router: Router) {
      this.currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!').toString(CryptoJS.enc.Utf8))
      // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
      // this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(this.currentUser));
      // this.router.resetConfig(this._menuService.getAuthRoutes(this.currentUser));
      this.role = this.currentUser.role;
      this._dealflowPageService = _dealflowPageService; 
      this._toasterService.toastr.setRootViewContainerRef(vcr);    
      pdfMake.vfs = pdfFonts.pdfMake.vfs;   

      this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.dealflowname = params['dealflowname'] || 0;
      });
      this._dealflowPageService.getDealflowStartup(this.dealflowname).subscribe(data => {this.dealflow_startup = data
        console.log(this.dealflow_startup.length);
      },
          error => console.error('Error: ' + error)
      );    
      this.pageload = true;
      this.getLists();
}
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
    getLists() {
      this.loading = true;
      this.error = false;
      this._dealflowPageService.getDealflowByName(this.dealflowname).map(res => {
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
        console.log("this is the dealflow time slots " + this.dealflow.event_Agenda);
        this.timeSlots = this.dealflow.event_Agenda.split(/\r?\n/);
        this.attendee_array = JSON.parse(res.attendees);
        console.log("this is the dealflow info: " + JSON.stringify(this.dealflow));
        return res;
      }
    }).subscribe((res)=>{ this.getUserById(res.lead_Id, 1, res)});
    //}).subscribe((res)=>{ this.getNames(res)});
 
  }

  getUserById(user_id:Number, name: number, dealflow: any){
    this.error = false;
    this._dealflowPageService.getUserById(user_id).map(res => {
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
      if(name == 1)
      {
        this.lead_name = res.name;
        this.lead_email = res.email;
        user_id = dealflow.accountManager_Id;
      }
      else if (name == 2)
      {
        this.account_manager_name = res.name;
        this.account_manager_email = res.email;
        user_id = dealflow.ventureAssociate_Id;
      }
      else if (name == 3)
      {
        this.venture_associate_name = res.name;
        this.venture_associate_email = res.email;  
        user_id = dealflow.champion_Id;    
      }
      else if (name == 4)
      {
        this.champion_name = res.name;
        this.champion_email = res.email;
        user_id = JSON.parse(dealflow.supporting_Members)[0].supporting_member1;
      }
      name++;
      if(name < 5){
        this.getUserById(user_id, name, dealflow);
      }
      else if (JSON.parse(dealflow.supporting_Members)[0].supporting_member1){
        this.getUserById2(JSON.parse(dealflow.supporting_Members)[0].supporting_member1, 1,dealflow);
      }
      else{
        if(this.dealflow_startup.length > 0){
          this.getVenturesById(this.dealflow_startup[0].venture_id, 0, this.dealflow_startup.length);
        }
        else{
          this.loading = false;
        }
      }
    }
  }).subscribe();

}

  getUserById2(user_id:Number, name: number, dealflow: any){
    this.error = false;
    this._dealflowPageService.getUserById(user_id).map(res => {
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
      if(name == 1)
      {
        this.supporting_member1_name = res.name;
        this.supporting_member1_email = res.email;
        if(JSON.parse(dealflow.supporting_Members)[0].supporting_member2){
          name++;
          this.getUserById2(JSON.parse(dealflow.supporting_Members)[0].supporting_member2, name,dealflow);
        }
        else{
          if(this.dealflow_startup.length > 0){
            this.getVenturesById(this.dealflow_startup[0].venture_id, 0, this.dealflow_startup.length);
          }
          else{
            this.loading = false;
          }
        }
      }
      else if (name == 2)
      {
        this.supporting_member2_name = res.name;
        this.supporting_member2_email = res.email;
        if(JSON.parse(dealflow.supporting_Members)[0].supporting_member3){
          name++;
          this.getUserById2(JSON.parse(dealflow.supporting_Members)[0].supporting_member3, name,dealflow);
        }
        else{
          if(this.dealflow_startup.length > 0){
            this.getVenturesById(this.dealflow_startup[0].venture_id, 0, this.dealflow_startup.length);
          }
          else{
            this.loading = false;
          }
        }
      }
      else if (name == 3)
      {
        this.supporting_member3_name = res.name;
        this.supporting_member3_email = res.email;   
        if(this.dealflow_startup.length > 0){
          this.getVenturesById(this.dealflow_startup[0].venture_id, 0, this.dealflow_startup.length);
        }
        else{
          this.loading = false;
        }
      }
      return res;
    }
  }).subscribe();

}

getVenturesById(id: Number, count: number, length: number){
  console.log("at get ventures by id");
  this.loading = true;
  this._dealflowPageService.getVenturesById(id).map(res => {
    // If request fails, throw an Error that will be caught
    if(res.status == 204) {
      this.loading = false;
      this.error = true;
      console.log("Search did not return any results.");
    } else if (res.status < 200 || res.status >= 300){
      this.loading = false;
      throw new Error('This request has failed ' + res.status);
    }
    // If everything went fine, return the response
    else {
      console.log("return of getVenturesById: " + JSON.stringify(res));
      this.venturesList.push(res);
      console.log("this is the ventures info: " + JSON.stringify(this.venturesList[count]));
      count++;
      if(count == length){
        for(var i = 0; i < count; i++){
          if(this.dealflow_startup[i].dealflow_Priority === "Primary")
          {
            this.primaryStartups.push(this.venturesList[i]);
          }
          else if(this.dealflow_startup[i].dealflow_Priority === "Secondary")
          {
            this.secondaryStartups.push(this.venturesList[i]);
          }
          else if(this.dealflow_startup[i].dealflow_Priority === "Rejected")
          {
            this.rejectedStartups.push(this.venturesList[i]);
          }
        }
        this.loading = false;
      }
      else{
        this.getVenturesById(this.dealflow_startup[count].venture_id, count, length);
      }
      return res;
    }
  }).subscribe();
}

removeDealflow(id:Number, dealflowname:String) {
  console.log("Remove "+id);
  this._dealflowPageService.removeFromDealflow(id,dealflowname).subscribe(data => this.dealflowstartup = data,
  error => {
    this._toasterService.showError("Could not remove Dealflow, please try again!", "Error", 4000)}, 
    () =>{
      let trigger = false;
      for(var i = 0; i < this.venturesList.length; i++){
        
        if(this.venturesList[i].id == id){
          //console.log("Delete company: "+this.companies[i].id)
          this.venturesList.splice(i,1);
          trigger = true;
          this._toasterService.showSuccess("SUCCESS","Removed Startup from Dealflow",4000);
        }
        if(trigger == true){
          for(var j = 0; j < this.venturesList[i].dealflow.length; j++){
            /*console.log(this.companies[i].dealflow[j].listName) 
            console.log(this.companies[i].dealflow[j].order)*/ 
            if(this.venturesList[i].dealflow[j].listName == this.dealflowname){
                this.venturesList[i].dealflow[j].order = this.venturesList[i].dealflow[j].order - 1;
            }        
          }
          
        }

      }
    }
  );
}

SubmitTop20(){
  console.log("submit to top 20" + this.dealflow.id);
  this._dealflowPageService.updateDealflowState(this.dealflow.id,"Review").map(res => {
    // If request fails, throw an Error that will be caught
    if (res.status < 200 || res.status >= 300){
      this.loading = false;
      throw new Error('This request has failed ' + res.status);
    }
    else {
      this._toasterService.showSuccess("Top20 Submitted","The list is now available for review",4000);
      return res;
    }
  }).subscribe();
}

checkUncheck(obj: any){
  console.log("in check uncheck");
    var idx = this.sendList.indexOf(obj.id);
    if (idx > -1) {
      this.sendList.splice(idx, 1);
    }
    else {
      this.sendList.push(obj.id);
    }
    console.log(this.sendList);
}

allPrimary(){
  if(this.primaryCheckAll){
    this.primaryStartups.forEach(startup =>{
      var idx = this.sendList.indexOf(startup.id);
      if (idx <= -1) {
        this.sendList.push(startup.id);
      }
    });
  }
  else{
    this.primaryStartups.forEach(startup => {
      var idx = this.sendList.indexOf(startup.id);
      if (idx > -1) {
        this.sendList.splice(idx, 1);
      }
    });
  }
  console.log(this.sendList);
}

allSecondary(){
  if(this.secondaryCheckAll){
    this.secondaryStartups.forEach(startup =>{
      var idx = this.sendList.indexOf(startup.id);
      if (idx <= -1) {
        this.sendList.push(startup.id);
      }
    });
  }
  else{
    this.secondaryStartups.forEach(startup => {
      var idx = this.sendList.indexOf(startup.id);
      if (idx > -1) {
        this.sendList.splice(idx, 1);
      }
    });
  }
  console.log(this.sendList);
}

exportToPDF() {
  console.log("beginning of export to pdf");
  this.creatingpdf = true;
  var teamSize = 10;
  if(this.dealflowpage.background != null){
  if(this.dealflowpage.background.length > 500){
    teamSize = 9;

  }else if(this.dealflowpage.background.length > 1000){
    teamSize = 8;
  }
  }  
  var advSize = 10;
  if(this.dealflowpage.advantage != null){
  if(this.dealflowpage.advantage.length > 500){
    advSize = 9;

  }else if(this.dealflowpage.advantage.length > 1000){
    advSize = 8;
  }
  }
  var caseSize = 10;
  if(this.dealflowpage.caseStudy != null){
  if(this.dealflowpage.caseStudy.length > 500){
    caseSize = 9;

  }else if(this.dealflowpage.caseStudy.length > 1000){
    caseSize = 8;
  }
  }
  var summarySize = 12;
  if(this.dealflowpage.blurb != null){
  if(this.dealflowpage.blurb.length > 500){
    summarySize = 11;

  }else if(this.dealflowpage.blurb.length > 1000){
    summarySize = 10;
  }  
  }
  var blurbFinal: any;
  if(this.dealflowpage.blurb == null || this.dealflowpage.blurb == ""){
    blurbFinal = "Information not provided by the startup"
  }else{
    blurbFinal = this.dealflowpage.blurb;
  }
  var verticalsFinal: any;
  if(this.dealflowpage.verticals == null || this.dealflowpage.verticals == ""){
    verticalsFinal = "Information not provided by the startup"
  }else{
    verticalsFinal = this.dealflowpage.verticals;
  }
  var headquartesFinal: any;
  if(this.dealflowpage.city == null || this.dealflowpage.city == ""){
    headquartesFinal = "Information not provided by the startup"
  }else{
    headquartesFinal = this.dealflowpage.city;
  }
  var stageFinal: any;
  if(this.dealflowpage.stage == null || this.dealflowpage.stage == ""){
    stageFinal = "Information not provided by the startup"
  }else{
    stageFinal = this.dealflowpage.stage;
  }
  var employeesFinal: any;
  if(this.dealflowpage.employees == null || this.dealflowpage.employees == ""){
    employeesFinal = "Information not provided by the startup"
  }else{
    employeesFinal = this.dealflowpage.employees;
  }
  var raisedFinal: any;
  if(this.dealflowpage.totalMoneyRaised == null || this.dealflowpage.totalMoneyRaised == ""){
    raisedFinal = "Information not provided by the startup"
  }else{
    raisedFinal = this.dealflowpage.totalMoneyRaised;
  }
  var teamFinal: any;
  if(this.dealflowpage.background == null || this.dealflowpage.background == ""){
    teamFinal = "Information not provided by the startup"
  }else{
    teamFinal = this.dealflowpage.background;
  }
  var compadvFinal: any;
  if(this.dealflowpage.advantage == null || this.dealflowpage.advantage == ""){
    compadvFinal = "Information not provided by the startup"
  }else{
    compadvFinal = this.dealflowpage.advantage;
  }
  var casestudyFinal: any;
  if(this.dealflowpage.caseStudy == null || this.dealflowpage.caseStudy == ""){
    casestudyFinal = "Information not provided by the startup"
  }else{
    casestudyFinal = this.dealflowpage.caseStudy;
  }
  var websiteFinal: any;
  if(this.dealflowpage.website == null || this.dealflowpage.website == ""){
    websiteFinal = "Information not provided by the startup"
  }else{
    websiteFinal = this.dealflowpage.website;
  }
  var tagsFinal: any;  
  if(this.dealflowpage.tags == null || this.dealflowpage.tags == ""){
    tagsFinal = "Information not provided by the startup"
  }else{
    tagsFinal = this.dealflowpage.tags;
  }

  pdfMake.fonts = {
    DINPro: {
      normal: 'DINPro.otf',
      bold: 'DINPro-Bold.otf'
    }
  }
  /* pdfMake.fonts = {
        FreigSanPro: {
          normal: 'FreigSanProLig.otf',
          bold: 'FreigSanProSem.otf'
        }
  }  */
  var dd = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: [40, 115, 40, 80],
    background: [{
        image: 'pnpHeader'
    }],
    header: [{columns: [
      {
        width: 685,
        text: this.dealflowpage.dealflowName,
        style: 'header',
        alignment: 'left',
        color:'white',
        margin: [50,25,0,0]
      },{
        margin: [0,20,0,0],
        maxHeight: 32,
        image: 'pnpGreen'
      }]},{
        columns: [{    
            width: '*',          
            text: verticalsFinal,
            style: 'verticle'
        },{
          width: '*',
          text: ''
        }]         
    }],
    content: [      
      {
      canvas: [
        {
            
            type: 'line',
            lineColor: '#f0d351',
            x1: 10,
            y1: 10,
            x2: 750,
            y2: 10,
            lineWidth: 4,
        }
    ]},{
    columns: [{width:'*',margin: [10,10,20,0],text: 'SUMMARY', style: 'titleBig'}],
    },{
    columns: [{width:'*',margin: [10,5,20,0],text: blurbFinal, style: 'paragraphSummary'}]
    },
    {
      columns: [{
      margin: [10,10,10,0],
      table: {
        widths: [90, 245],
        body: [
					[
						{
							border: [false, true, true, true],
							fillColor: '#f6f6f6',
              text: 'HEADQUARTERS',
              style: 'title'
						},
						{
							border: [true, true, false, true],
              text: headquartesFinal,
              style: 'paragraph'
              
            }
          ],
          [
						{
							border: [false, true, true, true],
							fillColor: '#f6f6f6',
							text: 'STAGE',
              style: 'title'
						},
						{
							border: [true, true, false, true],
							text: stageFinal,
              style: 'paragraph'
            }
          ],
          [
						{
							border: [false, true, true, true],
							fillColor: '#f6f6f6',
							text: 'NO. OF EMPLOYEES',
              style: 'title'
						},
						{
							border: [true, true, false, true],
							text: employeesFinal,
              style: 'paragraph'
            }
          ],
          [
						{
							border: [false, true, true, true],
							fillColor: '#f6f6f6',
							text: 'RAISED',
              style: 'title'
						},
						{
							border: [true, true, false, true],
							text: raisedFinal,
              style: 'paragraph'
            }
          ],
          [
						{
							border: [false, true, true, true],
							fillColor: '#f6f6f6',
							text: 'TEAM',
              style: 'title'
						},
						{
							border: [true, true, false, true],
							text: teamFinal,
              style: 'paragraphTeam'
            }
          ]
        ]
      },
      layout: {
        defaultBorder: false,
        hLineWidth: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
        },
        vLineWidth: function(i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
        },
        hLineColor: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? '#729dc0' : '#729dc0';
        },
        vLineColor: function(i, node) {
                return (i === 0 || i === node.table.widths.length) ? '#729dc0' : '#729dc0';
        },
      }
      },
      {
        margin: [10,10,20,0],
        table: {
          widths: [85, 250],
          body: [
            [
              {
                border: [false, true, true, true],
                fillColor: '#f6f6f6',
                text: 'COMPETITIVE ADV.',
                style: 'title'
              },
              {
                border: [true, true, false, true],
                text: compadvFinal,
                style: 'paragraphAdv'
                
              }
            ],
            [
              {
                border: [false, true, true, true],
                fillColor: '#f6f6f6',
                text: 'USE CASES / CASE STUDY',
                style: 'title'
              },
              {
                border: [true, true, false, true],
                text: casestudyFinal,
                style: 'paragraphCase'
              }
            ]
          ]
        },
        layout: {
          defaultBorder: false,
          hLineWidth: function(i, node) {
                  return (i === 0 || i === node.table.body.length) ? 2 : 1;
          },
          vLineWidth: function(i, node) {
                  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
          },
          hLineColor: function(i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#729dc0' : '#729dc0';
          },
          vLineColor: function(i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#729dc0' : '#729dc0';
          },
        }
        }
    
    ]
    },{
      columns: [{width:'*',margin: [10,10,20,0],text: 'dealflowpage WEBSITE', style: 'titleBigBlue'},{width:'*',margin: [10,10,20,0],text: 'TAGS', style: 'titleBigBlue'}],      
    },{
      columns: [{width:'*',margin: [11,0,20,0],text: websiteFinal, style: 'paragraphBlue'},{width:'*',margin: [11,0,20,0],text: tagsFinal, style: 'paragraphBlue'}],      
    }
    ],    
/*     pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
      return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
    }, */
    styles: {
      header: {
        font: 'DINPro',
        fontSize: 20,
        bold: true,
        alignment: 'center',
      },
      verticle: {
        font: 'DINPro',
        fontSize: 12,
        bold: true,
        alignment: 'left',
        color: '#1bb386',
        margin: [50,0,0,0]
      },
      logo: {
        alignment: 'center',
        maxHeight:50,
      },
      title: {
        font: 'DINPro',
        fontSize: 12,
        bold: true,
        alignment: 'right'
      },
      titleBig: {
        font: 'DINPro',
        fontSize: 14,
        bold: true,
        alignment: 'left'
      },
      titleBigBlue: {
        font: 'DINPro',
        fontSize: 14,
        bold: true,
        color: '#293b47',
        alignment: 'left'
      },      
      paragraph: {
        font: 'DINPro',
        fontSize: 12,
        alignment: 'left',
        margin: [0, 2.5, 0, 0]
      },
      paragraphSummary: {
        font: 'DINPro',
        fontSize: summarySize,
        alignment: 'left',
        margin: [0, 2.5, 0, 0]
      },
      paragraphTeam: {
        font: 'DINPro',
        fontSize: teamSize,
        alignment: 'left',
        margin: [0, 2.5, 0, 0]
      },
      paragraphAdv: {
        font: 'DINPro',
        fontSize: advSize,
        alignment: 'left',
        margin: [0, 2.5, 0, 0]
      },
      paragraphCase: {
        font: 'DINPro',
        fontSize: caseSize,
        alignment: 'left',
        margin: [0, 2.5, 0, 0]
      },
      paragraphBlue: {
        font: 'DINPro',
        fontSize: 10,
        alignment: 'left',
        color: '#1b272f',
        margin: [0, 0, 0, 0]
      },
      website: {
        font: 'DINPro',
        fontSize: 12,
        alignment: 'center',
        color: 'black',
        decoration: 'underline',
        margin: [0, 1, 0, 15]
      }
    },
    images: {
      pnpHeader: "data:image/png;base64,/9j/4QlQaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/90ABABq/+4ADkFkb2JlAGTAAAAAAf/AABEIAGoDSgMAEQABEQECEQH/xAC+AAAABwEBAQEAAAAAAAAAAAAAAgMEBQYHCAEKCQEAAQUBAQEBAAAAAAAAAAAABAACAwUGAQcICRAAAQMDAgQEBAMHAgUDAwMFAQIDBAUGEQAhBxIxQRMi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",
      pnpGreen: "data:image/png;base64,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"
    }


  };
  console.log("at the end of creating pdf");
  pdfMake.createPdf(dd).download(this.dealflowpage.dealflowName+' Executive Summary.pdf');
  this.creatingpdf = false; 
}

}