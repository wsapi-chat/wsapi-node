import { BaseEvent } from '../BaseEvent';

/**
 * Event fired when contact information changes
 */
export interface ContactEvent extends BaseEvent {
  eventType: 'contact';

  /** Contact's user ID (JID) */
  id: string;

  /** Contact's full name */
  fullName: string;

  /** Whether the contact is saved in the phone's address book */
  inPhoneAddressBook: boolean;
}
