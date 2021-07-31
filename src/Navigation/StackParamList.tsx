import { Contact, Job, SimpleContact, Template } from 'common-types';

export type HomeParamTypes = {
  Home: undefined;
  ViewJob: Job;
};

export type AuthStackParamList = {
  Home: undefined;
  ViewJob: Job;
  Compose: undefined;
  Contacts: undefined;
  Templates: undefined;
  Campaigns: undefined;
};

export type UnauthStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
};

export type ComposeParamTypes = {
  Compose: undefined;
  SelectContacts: { message: string };
  Schedule: { message: string; contacts: SimpleContact[]; next: 'Home' };
};

export type ContactParamTypes = {
  ContactsHome: undefined;
  ViewContact: Contact;
};

export type TemplateParamTypes = {
  Templates: undefined;
  CreateTemplate: Template;
  UseTemplate: Template;
  SelectContacts: { message: string };
  Schedule: { message: string; contacts: SimpleContact[]; next: 'Templates' };
};

export type CampaignParamTypes = {
  Campaigns: undefined;
  EditCampaign: { id: string };
  SelectContacts: {
    name: string;
    message: string;
    next: 'ScheduleType';
    contacts?: Contact[];
  };
  ScheduleType: { name: string; message: string; contacts: Contact[] };
  SchedulePeriodical: { name: string; message: string; contacts: Contact[] };
};

type LoadingParamTypes = keyof UnauthStackParamList | keyof AuthStackParamList;

export type StackParamList = {
  Loading: { next: LoadingParamTypes };

  AuthStack: undefined;
  UnauthStack: undefined;
};
