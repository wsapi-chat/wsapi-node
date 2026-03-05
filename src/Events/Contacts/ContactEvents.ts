import { BaseEvent } from '../BaseEvent';
import { Identity } from '../../Models/Entities/Users/Identity.js';

/**
 * Event fired when contact information changes
 */
export interface ContactEvent extends BaseEvent {
  eventType: 'contact';

  /** Contact's identity */
  contact: Identity;

  /** Contact's full name */
  fullName: string;

  /** Whether the contact is saved in the phone's address book */
  inPhoneAddressBook: boolean;
}
