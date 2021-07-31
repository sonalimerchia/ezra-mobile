declare module 'common-types' {
  export type SimpleContact = { name: string; phoneNumber: string };

  export type Contact = {
    id: string;
    name: string;
    phoneNumber: string;
    appleData: any;
    preferredNumber?: string;
    categories: string[];
  };

  export type Template = {
    id: string;
    name: string;
    message: string;
    tags: string[];
  };

  export type User = {
    categories: string[];
  };

  export type Job = {
    id: string;
    message: string;
    contacts: SimpleContact[];
    startTime: number;
    endTime?: number;
  };

  export type PeriodicalCampaign = {
    repeatType: 'periodical';
    frequency: 'week' | 'month' | 'year';
    startTime: Date;
    endTime: Date;
  };

  export type BirthdayCampaign = {
    repeatType: 'recipient';
  };

  type CommonCampaign = {
    id: string;
    name: string;
    message: string;
    contacts: Contact[];
  };

  export type Campaign = (PeriodicalCampaign | BirthdayCampaign) &
    CommonCampaign;
}
