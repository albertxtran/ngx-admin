import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'attendee',
    templateUrl: 'attendee.component.html',
})
export class AttendeeComponent {
    @Input('group')
    public attendeeForm: FormGroup;
}