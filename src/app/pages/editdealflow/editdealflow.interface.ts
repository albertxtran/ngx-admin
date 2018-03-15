export interface EditDealflow {
    id: number,
    corporate_id : number,
    lead_id : number,
    api_key : string,
    account_manager_id: number,
    venture_associate_id : number,
    champion_id : number,
    supportingMembers: SupportingMember[],
    attendees: Attendee[];
    event_summary: string,
    event_date : string,
    event_start: string,
    event_stop: string,
    event_location: string,
    event_agenda: string,
    verticals : string,
    specific_interests : string,
    purpose : string,
    relationship : string, 
    virtual_join : boolean, //optional
    extra_detail : string, //optional
    document: string
}

export interface Attendee {
    name: string;
    position: string;
    email: string;
}

export interface SupportingMember {
    supporting_member1: Number;
    supporting_member2: Number;
    supporting_member3: Number;
    supporting_member1_name: string;
    supporting_member2_name: string;
    supporting_member3_name: string;
}

export interface Agenda {
    start: string;
    end: string;
    type: string;
    comment: string;
    startup: string;
    status: string;
}