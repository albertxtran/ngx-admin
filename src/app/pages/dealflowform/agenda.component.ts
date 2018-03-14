import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@Component({
    moduleId: module.id,
    selector: 'agenda',
    templateUrl: 'agenda.html',
})
export class AgendaComponent {
    @Input('group')
    public agendaForm: FormGroup;

    agendaTypes: string[]= ['Tour', 'PNP Presentation', 'Startup', 'Lunch', 'Break', 'Wrap Up', 'Other'];
}