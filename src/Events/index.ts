// Session events
export { SessionLoggedInEvent, SessionLoggedOutEvent, SessionLoggedErrorEvent } from './Session/SessionEvents';

// Message events
export { 
  MessageEvent, 
  MessageDeleteEvent, 
  MessageHistorySyncEvent, 
  MessageReadEvent, 
  MessageStarEvent 
} from './Messages/MessageEvents';

// Chat events
export { ChatPresenceEvent, ChatSettingEvent } from './Chats/ChatEvents';

// Contact events
export { ContactEvent } from './Contacts/ContactEvents';

// User events
export { 
  UserPushNameEvent, 
  UserPictureEvent, 
  UserPresenceEvent, 
  UserStatusEvent 
} from './Users/UserEvents';

// Call events
export { CallOfferEvent, CallAcceptEvent, CallTerminateEvent } from './Calls/CallEvents';

// Base event and constants
export { BaseEvent } from './BaseEvent';
export { EventTypes, EventType } from './Constants/EventTypes';

// Event Factory
export { EventFactory, RawEventData } from './EventFactory';

// Import all event types for union type
import { SessionLoggedInEvent, SessionLoggedOutEvent, SessionLoggedErrorEvent } from './Session/SessionEvents';
import { MessageEvent, MessageDeleteEvent, MessageHistorySyncEvent, MessageReadEvent, MessageStarEvent } from './Messages/MessageEvents';
import { ChatPresenceEvent, ChatSettingEvent } from './Chats/ChatEvents';
import { ContactEvent } from './Contacts/ContactEvents';
import { UserPushNameEvent, UserPictureEvent, UserPresenceEvent, UserStatusEvent } from './Users/UserEvents';
import { CallOfferEvent, CallAcceptEvent, CallTerminateEvent } from './Calls/CallEvents';

/**
 * Union type of all possible WhatsApp Business API events
 */
export type WSApiEvent = 
  | SessionLoggedInEvent
  | SessionLoggedOutEvent
  | SessionLoggedErrorEvent
  | MessageEvent
  | MessageDeleteEvent
  | MessageHistorySyncEvent
  | MessageReadEvent
  | MessageStarEvent
  | ChatPresenceEvent
  | ChatSettingEvent
  | ContactEvent
  | UserPushNameEvent
  | UserPictureEvent
  | UserPresenceEvent
  | UserStatusEvent
  | CallOfferEvent
  | CallAcceptEvent
  | CallTerminateEvent;
