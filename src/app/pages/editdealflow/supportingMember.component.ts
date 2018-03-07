import { Component, Input } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { EditDealflowService } from './editdealflow.service';
import { Observable } from 'rxjs/Rx';
import { EditDealflowComponent } from './editdealflow.component';
import 'rxjs/add/operator/do';

@Component({
    moduleId: module.id,
    selector: 'supportingMember',
    templateUrl: 'supportingMember.component.html',
    providers: [EditDealflowService],
})

export class SupportingMemberComponent {
    searchString: String;
    asyncUsers: Object;
    page: Number;

    @Input('group')
    public supportingMemberForm: FormGroup;

    constructor(private _editDealflowService: EditDealflowService) { //inject services
        this._editDealflowService = _editDealflowService; 
    }

getSuggestions(event: any){
    this.searchString = event.target.value;
    this.page = 1;
    this.asyncUsers = null;

    if(this.searchString.length > 2){
        //this.asyncUsers = this._editDealflowService.getUsersPage(1, this.searchString);//CompleterService.remote('/rest/plugandplay/api/v1/users/query/1?query=','',null);
        //console.log(JSON.stringify(this.asyncUsers));
        this._editDealflowService.getUsersPage(this.page, this.searchString)
            .do(res => {
                if(res.status == 204) {               
                } else {
                    this.asyncUsers=res.data;
                }                
            }).map(res => res.data).subscribe();  
    }
}

    nameSelected(event: any)
    {
        //document.getElementById('supportingId').value = id;
        //var selectNum = event.target.value.substr(0,str.indexOf(' '));
        //var selectName = event.target.value.substr(str.indexOf(' ')+1);
        var tmpList = event.target.value.split(" ");
        var selectEmail = tmpList[tmpList.length - 1];
        var idName = event.target.name;

        if(this.asyncUsers != null)
        {
            Object.keys(this.asyncUsers).forEach(eachObj => {
                if(selectEmail == this.asyncUsers[eachObj].email)
                {
                    event.target.value = this.asyncUsers[eachObj].name;
                    //(<HTMLInputElement>document.getElementById(idName)).value = this.asyncUsers[eachObj].id;
                    //this.id.nativeElement.value = this.asyncUsers[eachObj].id;
                    this.supportingMemberForm.controls[idName].setValue(this.asyncUsers[eachObj].id);
                }
              });
        }
        this.asyncUsers = null;
    }
    
}