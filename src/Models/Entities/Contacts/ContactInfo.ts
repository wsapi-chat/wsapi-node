import { Identity } from '../Users/Identity.js';

export interface ContactInfo extends Identity {
    fullName?: string;
    firstName?: string;
    pushName?: string;
    businessName?: string;
    inPhoneAddressBook?: boolean;
}
