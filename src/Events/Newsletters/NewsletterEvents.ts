import { BaseEvent } from '../BaseEvent.js';

export interface NewsletterEvent extends BaseEvent {
  eventType: 'newsletter';
  id: string;
  action: string;
  name?: string;
  role?: string;
  mute?: string;
}
