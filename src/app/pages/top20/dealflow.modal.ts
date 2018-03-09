import { Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
export interface CustomModal {
  lists: any[];
  corporation: String;
}
interface CheckForm {
    companyName ? : string; // the "?" makes the property optional, 
    checked ? : boolean; //  so you can start with an empty object
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog" style="overflow: scroll;overflow-y: auto;max-height: 90%;">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">Create a Dealflow!</h4>
                   </div>
                   <div  class="modal-body" style="padding-top:5px;padding-bottom:5px;">
                       <label for="input01">Corporation Name:</label>
                       <input style="color: #373a3c;border: 1px solid;border-color: #00abff;line-height: inherit;" type="text" [(ngModel)]="corporation" [ngModelOptions]="{standalone: true}" class="form-control" id="input01" placeholder="Corporation Name">
                   </div>
                  <div>
                      <label style="margin: 0px;padding-left: 15px;" for="single">Corporation Logo:</label>
                      <input type="file" style="padding-left: 16px;display: block;padding-top: 5px;padding-bottom: 10px;" name="single" accept=".jpg,.jpeg,.png" (change)="changeListener($event)">            
                  </div>
                   <form #frm="ngForm" > 
                     <div *ngFor="let item of formArray; let i=index" class="col-md-6">
                     <div  class="modal-body" style="padding-top:5px;padding-bottom:5px;">
                     
                     <input type="checkbox" class="css-checkbox" id="{{item?.companyName}}" name={{item?.companyName}} [(ngModel)]="formArray[i].checked" value="{{item.companyName}}" >
                     <label for="{{item?.companyName}}" name="checkbox-lbl" class="css-label lite-green-check">{{item.companyName}}</label>                                          
                     </div>
                     </div>
                   </form>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()">Export</button>
                   </div>
                 </div>
              </div>`
})
export class DealflowModalComponent extends DialogComponent<CustomModal, CheckForm[]> implements CustomModal, OnInit {
  lists: any[];
  corporation: String;
  formArray: CheckForm[] = [];
  image: string;
  @ViewChild('frm') form;

  constructor(dialogService: DialogService) {
    super(dialogService);    
  }
  ngOnInit(){
     for(var i = 0; i < this.lists.length; i++){
      var obj:CheckForm = {};
        obj.companyName = this.lists[i].companyName;
        obj.checked = false;
        this.formArray.push(obj);
    }
  }
  changeListener($event) : void {
    this.readThis($event.target);

  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      //console.log(this.image);
    }
    myReader.readAsDataURL(file);

  }

  ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
  }

  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
   /* for(var i = 0; i < this.formArray.length; i++){
      console.log(this.formArray[i])
    }*/
      type MyArrayType = Array<{image: string, text: string, link: string, style: string}>;
      //var pdfContent: MyArrayType = [];
      var pdfContent: any[] = [];      
      
      for(var i = 0; i < this.formArray.length; i++){
        for(var j = 0; j < this.lists.length; j ++){
          if(this.formArray[i].checked == true && this.formArray[i].companyName == this.lists[j].companyName){
            //console.log(this.lists[i].thumbnail);
            var thumb: any = '';
            if(this.lists[j].thumbnail){
              //pdfContent.push({columns:[{width:50,stack:[{image: 'data:image/jpg;base64,'+this.lists[j].thumbnail, width: 50}]},{alignment: 'left',text: this.lists[j].companyName, style: 'title', margin: [10, 5, 0, 5]}]})
              thumb = {columns:[{width:50,stack:[{image: 'data:image/jpg;base64,'+this.lists[j].thumbnail, width: 50}]},{alignment: 'left',text: this.lists[j].companyName, style: 'title', margin: [10, 5, 0, 5]}]}; 
            } else {
              //pdfContent.push({alignment: 'left',text: this.lists[j].companyName, style: 'titlePlain'})
              thumb = {alignment: 'left',text: this.lists[j].companyName, style: 'titlePlain'};
            }            

            var row = new Array();
            row.push([thumb,{ image: '', text: this.lists[j].blurb, link: '', style: 'paragraph' },{ image: '', text: this.lists[j].website, link: this.lists[j].website, style: 'website'}]);
            pdfContent.push(row);
            //pdfContent.push({ image: '', text: this.lists[j].blurb, link: '', style: 'paragraph' })
            //pdfContent.push({ image: '', text: this.lists[j].website, link: this.lists[j].website, style: 'website'})
          }
      }
      }
        var dateObj = new Date();
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month =  monthNames[dateObj.getMonth()];
        var year = dateObj.getFullYear().toString();
        var day = dateObj.getDate();
        var ordinalDay = this.ordinal_suffix_of(day);
        var footer:any;
        if(this.image != null){
          footer = {
            image: this.image,
            maxHeight:50,
            alignment: 'center'
          } 
        }else{
          footer = {}
        }
      /* pdfMake.fonts = {
        FreigSanPro: {
          normal: 'FreigSanProLig.otf',
          bold: 'FreigSanProSem.otf'
        }
      } */
      var docDefinition = {
          pageMargins: [40, 30, 40, 80],
          footer:
          footer
          /* {
                // usually you would use a dataUri instead of the name for client-side printing
                // sampleImage.jpg however works inside playground so you can play with it
                image: this.image,
                maxHeight: 50,
                alignment: 'center'
             }*/,
           /*{ columns: [
            { width: '*', text: '' },
            {
                // usually you would use a dataUri instead of the name for client-side printing
                // sampleImage.jpg however works inside playground so you can play with it
                image: this.image,
                maxHeight: 50,
                alignment: 'center'
            },
             { width: '*', text: '' }
            ]
           },*/
          /*footer: {  columns: [
            { width: '*', text: '' },
            {
                // usually you would use a dataUri instead of the name for client-side printing
                // sampleImage.jpg however works inside playground so you can play with it
                image: this.image,
                width: 100,
                margin: [0, 5, 0, 20]
            },
             { width: '*', text: '' }
            ]
          },*/
          /* defaultStyle: {
            font: 'FreigSanPro'
          }, */
          content: [
            {
              // if you specify width, image will scale proportionally
              image: 'pnpLogo',
              width: 200,
              alignment: 'center'
            },
            { text: this.corporation, style: 'header' },
            { text: month+' '+ordinalDay+', '+year, style: 'date'},
            {
              // if you reuse the same image in multiple nodes,
              // you should put it to to images dictionary and reference it by name
              image: 'circles',
              width: 80,
              alignment: 'center',
              margin: [0, 5, 0, 20]
            },
            {
              table: {
                dontBreakRows: true,
                body: pdfContent               
              },
              layout: 'noBorders'
            },          
            /*,
            {
              // under NodeJS (or in case you use virtual file system provided by pdfmake)
              // you can also pass file names here
              image: 'assets/img/pnp-logo.png',
              width: 200
            }*/
          ],
          pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
            return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
          },
          styles: {
            header: {
              //font: 'FreigSanPro',
              fontSize: 16,
              bold: true,
              alignment: 'center'
            },
            date: {
              //font: 'FreigSanPro',
              fontSize: 14,
              bold: true,
              alignment: 'center',
              margin: [0, 10, 0, 10]
            },
            title: {
              //font: 'FreigSanPro',
              fontSize: 12,
              bold: true,
              alignment: 'left'
            },
            titlePlain: {
              //font: 'FreigSanPro',
              fontSize: 12,
              bold: true,
              alignment: 'left',
              margin: [0, 20, 0, 2.5]
            },
            paragraph: {
              //font: 'FreigSanPro',
              fontSize: 10,
              alignment: 'left',
              margin: [0, 5, 0, 1]
            },
            website: {
              //font: 'FreigSanPro',
              fontSize: 9,
              alignment: 'left',
              color: 'blue',
              margin: [0, 1, 0, 20]
            }
          },

          images: {
            pnpLogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB9AAAAI3CAYAAADDQcDkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/"
            + "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dAAAAAAAAAJJooAMAAAAAAABAEg10AAAAAAAAAEiigQ4AAAAAAAAASTTQAQAAAAAAACCJBjoAAAAAAAAAJNFABwAAAAAAAIAkGugAAAAAAAAAkEQDHQAAAAAAAACSaKADAAAAAAAAQBINdAAAAAAAAABIooEOAAAAAAAAAEk00AEAAAAAAAAgiQY6AAAAAAAAACTRQAcAAAAAAACAJBroAAAAAAAAAJBEAx0AAAAAAAAAkmigAwAAAAAAAEASDXQAAAAAAAAASKKBDgAAAAAAAABJNNABAAAAAAAAIIkGOgAAAAAAAAAk0UAHAAAAAAAAgCQa6AAAAAAAAACQRAMdAAAAAAAAAJJooAMAAAAAAABAEg10AAAAAAAAAEiigQ4AAAAAAAAASTTQAQAAAAAAACCJBjoAAAAAAAAAJNFABwAAAAAAAIAkGugAAAAAAAAAkEQDHQAAAAAAAACSaKADAAAAAAAAQBINdAAAAAAAAABIooEOAAAAAAAAAEk00AEAAAAAAAAgiQY6AAAAAAAAACTRQAcAAAAAAACAJBroAAAAAAAAAJBEAx0AAAAAAAAAkmigAwAAAAAAAEASDXQAAAAAAAAASKKBDgAAAAAAAABJNNABAAAAAAAAIIkGOgAAAAAAAAAk0UAHAAAAAAAAgCQa6AAAAAAAAACQRAMdAAAAAAAAAJJooAMAAAAAAABAEg10AAAAAAAAAEiigQ4AAAAAAAAASTTQAQAAAAAAACCJBjoAAAAAAAAAJNFABwAAAAAAAIAkGugAAAAAAAAAkEQDHQAAAAAAAACSaKADAAAAAAAAQBINdAAAAAAAAABIooEOAAAAAAAAAEk00AEAAAAAAAAgiQY6AAAAAAAAACTRQAcAAAAAAACAJBroAAAAAAAAAJBEAx0AAAAAAAAAkmigAwAAAAAAAEASDXQAAAAAAAAASKKBDgAAAAAAAABJNNABAAAAAAAAIIkGOgAAAAAAAAAk0UAHAAAAAAAAgCQa6AAAAAAAAACQRAMdAAAAAAAAAJJooAMAAAAAAABAEg10AAAAAAAAAEiigQ4AAAAAAAAASTTQAQAAAAAAACCJBjoAAAAAAAAAJNFABwAAAAAAAIAkGugAAAAAAAAAkEQDHQAAAAAAAACSaKADAAAAAAAAQBINdAAAAAAAAABIooEOAAAAAAAAAEk00AEAAAAAAAA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"
            + "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"
            + "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"
            + "AY6ANyuGBiSrISiGtfRcPzafO6TXAmFuQwAALBFTysf/yiFd7ZscJs6aQU00AHgdhbRdKzFdTZfeDgXiq8WuEPae1eZuQwAAHAYXeXjd9PE/SzNZaBFGugAcHvrbJpZPwlFsa6y+aLDQihuPZ//IhTFzuXOXAYAACrRVT7+pRTey9jgNg3SCmigA8DdrJOcJfkPoSjOTzdFjqL3bl4m+fd4L3pJ/pLNF0HWQgEAAFRiqHz8Cym8t9auJ8ykFNBAB4D7eZ3kX+IRX6UUan/I5osNa+G4l3k2DVuPdD/8XP73bL7UAAAAUJNZ5eNfS+G9LRrbnhMpBTTQAeBhBUIfj8A+pI+PbD8XigdbZnPHwJ+E4iAusnnk4VwoAACACvWVj3+Uwntbms9AazTQAeBh1tncLfr7uBt9n66zafT28cj2bXuV5J/jbvR9WWVz1/lp3PEAAADUq698/EspFLtPdNIK06aBDgDbMd4Ui+7e3b2Lm1i/EoqdFr9DNo1dXwzZnY9fApkLBQAAULFZkqMG6mDuZ2xwm3pphWnTQAeA7Vnnl7t3L4Rj61bZ3Ol/qrDdm3l++WLItXBszU83x4lXcdc5AABQv77y8V9J4YOszWmgNb8TAgDYumU2Td4hmwbZUyF5kNVNHM+F4mCF8Kskr7N5XcHL1H9nwaH8lOTVxcXFUigAAICG9A3UvdzfosFtmkkrTJs70AFgd8Zsmui/j/dJ38cqyR+yee/UuXAc3DqbRnqXzR3pHu1+ex/vOD+LpycAAADtmVU+/lEKH6y1awRuhoGJ00AHgP0UYkM2DbSfhOObLrN593YXjfMSrfNLI/0P8eWQL1ll80WD/xWNcwAAoG1D5eNXr4nh53TSCtOlgQ4A+y0mzrJpqP1HvGPrU6skf8nmSwZDNu/epnzn+eXLIX+Ju9Kvs/mSzO9vCu1X8ShAAACgfV3l419K4YON5jXQEg10ANi/dTbvk+6T/Eum23j82Gz8eLf5S0VrtZY3+esmOKc/ncezbL4kM5oSAADAhBxXPv6FFD7YusFtGqQVpuu7n3/+WRQAKvT8+XNBaE+f5PTm10mj27jK5u7yMe4yn8qcHm5+tXTQuvpkDo93/csXFxdmBgBMs4ab3ayPWjLKbNNr+Zkw8A2LbBqng2PZ5LV4jlumnhs9hsZiv7i4uFjbrTgkDXSASmmgT6LwGD75VWtDfXVTiH78tZTaSRvyS1O9Tx13KVxnc1Fo/OT3BxVxGugAAAAAUK7fCQEAFGmdzd2t80/+bMim6fjxV2lN9VU2DcaPv8Z4/zO/Nt78en3z77NP5nP3ye+HaKx/bJQvb36Nqevb5gAAAADAFmigA0A9xvzjY8W6/NJ4nH3y+yzbb7Cv8kszcfzk93W8L4z7WX9hXn86t5NfP4rs0z+/62d9Ok8XN39m/gIAAAAAf6eBDgB1W+aXu2W/psvdm47raCxy+LmdeB8dAAAAALAn3oEOAAAAAAAAAEn+SQgAAAAAAAAAQAMdAAAAAAAAAJJooAMAAAAAAABAEg10AAAAAAAAAEiigQ4AAAAAAAAASTTQAQAAAAAAACCJBjoAAAAAAAAAJNFABwAAAAAAAIAkGugAAAAAAAAAkEQDHQAAAAAAAACSaKADAAAAAAAAQBINdAAAAAAAAABIooEOAAAAAAAAAEk00AEAAAAAAAAgiQY6AAAAAAAAACTRQAcAAAAAAACAJBroAAAAAAAAAJBEAx0AAAAAAAAAkmigAwAAAAAAAEASDXQAAAAAAAAASKKBDgAAAAAAAABJNNABAAAAAAAAIIkGOgAAAAAAAAAk0UAHAAAAAAAAgCQa6AAAAAAAAACQRAMdAAAAAAAAAJJooAMAAAAAAABAEg10AAAAAAAAAEiigQ4AAAAAAAAASTTQAQAAAAAAACCJBjoAAAAAAAAAJNFABwAAAAAAAIAkGugAAAAAAAAAkEQDHQAAAAAAAACSaKADAAAAAAAAQBINdAAAAAAAAABIooEOAAAAAAAAAEk00AEAAAAAAAAgiQY6AAAAAAAAACTRQAcAAAAAAACAJBroAAAAAAAAAJBEAx0AAAAAAAAAkmigAwAAAAAAAEASDXQAAAAAAAAASKKBDgAAAAAAAABJNNABAAAAAAAAIIkGOgAAAAAAAAAk0UAHAAAAAAAAgCQa6AAAAAAAAACQRAMdAAAAAAAAAJJooAMAAAAAAABAEg10AAAAAAAAAEiigQ4AAAAAAAAASTTQAQAAAAAAACCJBjoAAAAAAAAAJNFABwAAAAAAAIAkGugAAAAAAAAAkEQDHQAAAAAAAACSaKADAAAAAAAAQBINdAAAAAAAAABIooEOAAAAAAAAAEk00AEAAAAAAAAgiQY6AAAAAAAAACTRQAcAAAAAAACAJBroAAAAAAAAAJBEAx0AAAAAAAAAkmigAwAAAAAAAEASDXQAAAAAAAAASKKBDgAAAAAAAABJNNABAAAAAAAAIIkGOgAAAAAAAAAk0UAHAAAAAAAAgCQa6AAAAAAAAACQRAMdAAAAAAAAAJJooAMAAAAAAABAEg10AAAAAAAAAEiigQ4AAAAAAAAASTTQAQAAAAAAACCJBjoAAAAAAAAAJNFABwAAAAAAAIAkGugAAAAAAAAAkEQDHQAAAAAAAACSaKADAAAAAAAAQBINdAAAAAAAAABIooEOAAAAAAAAAEk00AEAAAAAAAAgiQY6AAAAAAAAACTRQAcAAAAAAACAJBroAAAAAAAAAJBEAx0AAAAAAAAAkmigAwAAAAAAAEASDXQAAAAAAAAASKKBDgAAAAAAAABJNNABAAAAAAAAIIkGOgAAAAAAAAAk0UAHAAAAAAAAgCQa6AAAAAAAAACQRAMdAAAAAAAAAJJooAMAAAAAAABAEg10AAAAAAAAAEiigQ4AAAAAAAAASTTQAQAAAAAAACCJBjoAAAAAAAAAJNFABwAAAAAAAIAkGugAAAAAAAAAkEQDHQAAAAAAAACSaKADAAAAAAAAQBINdAAAAAAAAABIooEOAAAAAAAAAEk00AEAAAAAAAAgiQY6AAAAAAAAACTRQAcAAAAAAACAJBroAAAAAAAAAJBEAx0AAAAAAAAAkiT//wASHTiis/CZ7QAAAABJRU5ErkJggg==",
            circles: "data:image/png;base64,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"
          }
        };
        var dateObj = new Date();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var month =  monthNames[dateObj.getUTCMonth()];
        var year = dateObj.getUTCFullYear().toString();
        var date = month + year.substr(-2);
        pdfMake.createPdf(docDefinition).download(this.corporation+' '+date+'.pdf');
    this.result = this.formArray;
    this.close();
  }
}