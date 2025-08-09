import { BaseEvent } from '../BaseEvent';

/**
 * Event fired when a call is offered/initiated
 */
export interface CallOfferEvent extends BaseEvent {
  /** Call ID */
  id: string;
  
  /** User ID of the caller */
  caller: string;
  
  /** Chat ID where the call is happening */
  chatId: string;
  
  /** Whether this is a group call */
  isGroup: boolean;
  
  /** When the call was initiated */
  time: Date;
  
  /** Whether this is a video call */
  isVideo: boolean;
}

/**
 * Event fired when a call is accepted
 */
export interface CallAcceptEvent extends BaseEvent {
  /** Call ID */
  id: string;
  
  /** User ID who accepted the call */
  acceptedBy: string;
  
  /** Chat ID where the call is happening */
  chatId: string;
  
  /** When the call was accepted */
  acceptedAt: Date;
}

/**
 * Event fired when a call is terminated/ended
 */
export interface CallTerminateEvent extends BaseEvent {
  /** Call ID */
  id: string;
  
  /** User ID who terminated the call */
  terminatedBy: string;
  
  /** Chat ID where the call was happening */
  chatId: string;
  
  /** Reason for termination (ended, rejected, missed, etc.) */
  reason: string;
  
  /** Call duration in seconds */
  duration?: number;
  
  /** When the call was terminated */
  terminatedAt: Date;
}
