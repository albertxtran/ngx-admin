import {Injectable, ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToasterService {
    constructor(public toastr: ToastsManager){     
    }

    showSuccess(message: string, title: string, time: number) {
        this.toastr.success(message, title,{toastLife: time});
    }
    showError(message: string, title: string, time: number) {
        this.toastr.error(message, title,{toastLife: time});
    }
    showWarning(message: string, title: string, time: number) {
        this.toastr.warning(message, title,{toastLife: time});
    }
}

