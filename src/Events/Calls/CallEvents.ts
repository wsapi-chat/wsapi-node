import { BaseEvent } from '../BaseEvent';

/**
 * Call termination reason
 */
export type CallTerminateReason = 'rejected' | 'ended';

/**
 * Event fired when a call is offered/initiated
 */
export interface CallOfferEvent extends BaseEvent {
  eventType: 'call_offer';

  /** Call ID */
  id: string;

  /** User ID of the caller */
  caller: string;

  /** Chat ID where the call is offered */
  chatId: string;

  /** When the call was initiated (ISO 8601 format) */
  time: string;

  /** Whether this is a group call */
  isGroup?: boolean;

  /** Whether this is a video call */
  isVideo?: boolean;
}

/**
 * Event fired when a call is accepted
 */
export interface CallAcceptEvent extends BaseEvent {
  eventType: 'call_accept';

  /** Call ID */
  id: string;

  /** User ID of the caller */
  caller: string;

  /** When the call was accepted (ISO 8601 format) */
  time: string;
}

/**
 * Event fired when a call is terminated/ended
 */
export interface CallTerminateEvent extends BaseEvent {
  eventType: 'call_terminate';

  /** Call ID */
  id: string;

  /** User ID of the caller */
  caller: string;

  /** When the call was terminated (ISO 8601 format) */
  time: string;

  /** Reason for termination */
  reason: CallTerminateReason;
}
