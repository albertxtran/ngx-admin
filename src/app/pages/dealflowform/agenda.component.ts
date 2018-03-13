import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'agenda',
    templateUrl: 'agenda.html',
})
export class AgendaComponent {
    @Input('group')
    public agendaForm: FormGroup;
}