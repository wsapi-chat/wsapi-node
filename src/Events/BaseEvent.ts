import { EventType } from './Constants/EventTypes';

/**
 * Base interface for all WhatsApp Business API events
 */
export interface BaseEvent {
  /** The instance ID that received this event */
  instanceId: string;
  
  /** When this event was received by the server */
  receivedAt: Date;
  
  /** The type of event */
  eventType: EventType;
}
