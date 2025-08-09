import { BaseEvent } from '../BaseEvent';

/**
 * Event fired when contact information changes
 */
export interface ContactEvent extends BaseEvent {
  /** Contact ID */
  id: string;
  
  /** Contact name */
  name?: string;
  
  /** Contact phone number */
  phoneNumber?: string;
  
  /** Contact profile picture URL */
  profilePicture?: string;
  
  /** Whether this contact is a business account */
  isBusiness?: boolean;
  
  /** Contact status/about */
  status?: string;
  
  /** When the contact was last updated */
  lastUpdated: Date;
}
