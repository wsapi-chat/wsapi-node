import { EventTypes, EventType } from './Constants/EventTypes';
import { BaseEvent } from './BaseEvent';

// Import all event types
import { SessionLoggedInEvent, SessionLoggedOutEvent, SessionLoggedErrorEvent, InitialSyncFinishedEvent } from './Session/SessionEvents';
import { MessageEvent, MessageDeleteEvent, MessageHistorySyncEvent, MessageReadEvent, MessageStarEvent } from './Messages/MessageEvents';
import { ChatPresenceEvent, ChatSettingEvent, ChatPushNameEvent, ChatStatusEvent, ChatPictureEvent } from './Chats/ChatEvents';
import { ContactEvent } from './Contacts/ContactEvents';
import { UserPresenceEvent } from './Users/UserEvents';
import { CallOfferEvent, CallAcceptEvent, CallTerminateEvent } from './Calls/CallEvents';
import { GroupEvent } from './Groups/GroupEvents';

/**
 * Union type of all possible WhatsApp Business API events
 */
export type WSApiEvent =
  | SessionLoggedInEvent
  | SessionLoggedOutEvent
  | SessionLoggedErrorEvent
  | InitialSyncFinishedEvent
  | MessageEvent
  | MessageDeleteEvent
  | MessageHistorySyncEvent
  | MessageReadEvent
  | MessageStarEvent
  | ChatPresenceEvent
  | ChatSettingEvent
  | ChatPushNameEvent
  | ChatStatusEvent
  | ChatPictureEvent
  | ContactEvent
  | UserPresenceEvent
  | GroupEvent
  | CallOfferEvent
  | CallAcceptEvent
  | CallTerminateEvent;

/**
 * Raw event data structure from SSE/Webhook
 */
export interface RawEventData {
  receivedAt: string;
  instanceId: string;
  eventType: string;
  eventData: any;
}

/**
 * Factory for parsing raw WhatsApp Business API events into typed event objects
 */
export class EventFactory {
  /**
   * Map of event types to their constructors/parsers
   */
  private static readonly eventTypeMap: Record<string, (data: any, instanceId: string, receivedAt: Date, eventType: EventType) => WSApiEvent> = {
    // Session events
    [EventTypes.LOGGED_IN]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as SessionLoggedInEvent),

    [EventTypes.LOGGED_OUT]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as SessionLoggedOutEvent),

    [EventTypes.LOGGED_ERROR]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as SessionLoggedErrorEvent),

    [EventTypes.INITIAL_SYNC_FINISHED]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as InitialSyncFinishedEvent),

    // Message events
    [EventTypes.MESSAGE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as MessageEvent),

    [EventTypes.MESSAGE_DELETE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as MessageDeleteEvent),

    [EventTypes.MESSAGE_HISTORY_SYNC]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as MessageHistorySyncEvent),

    [EventTypes.MESSAGE_READ]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as MessageReadEvent),

    [EventTypes.MESSAGE_STAR]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as MessageStarEvent),

    // Chat events
    [EventTypes.CHAT_PRESENCE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as ChatPresenceEvent),

    [EventTypes.CHAT_SETTING]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as ChatSettingEvent),

    [EventTypes.CHAT_PUSH_NAME]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as ChatPushNameEvent),

    [EventTypes.CHAT_STATUS]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as ChatStatusEvent),

    [EventTypes.CHAT_PICTURE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as ChatPictureEvent),

    // Contact events
    [EventTypes.CONTACT]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as ContactEvent),

    // User events
    [EventTypes.USER_PRESENCE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as UserPresenceEvent),

    // Group events
    [EventTypes.GROUP]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as GroupEvent),

    // Call events
    [EventTypes.CALL_OFFER]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as CallOfferEvent),

    [EventTypes.CALL_ACCEPT]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as CallAcceptEvent),

    [EventTypes.CALL_TERMINATE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType
    } as CallTerminateEvent)
  };

  /**
   * Parses a raw JSON event string into a typed event object
   * @param json Raw JSON string from SSE/webhook
   * @returns Parsed typed event object
   * @throws Error if JSON is invalid or event type is unknown
   */
  public static parseEvent(json: string): WSApiEvent {
    if (!json || json.trim() === '') {
      throw new Error('JSON cannot be null or empty');
    }

    let rawData: RawEventData;
    try {
      rawData = JSON.parse(json);
    } catch (error) {
      throw new Error(`Invalid JSON format: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return this.parseRawEvent(rawData);
  }

  /**
   * Parses a raw event data object into a typed event object
   * @param rawData Raw event data object
   * @returns Parsed typed event object
   * @throws Error if required properties are missing or event type is unknown
   */
  public static parseRawEvent(rawData: RawEventData): WSApiEvent {
    // Validate required properties
    if (!rawData.receivedAt) {
      throw new Error('Missing required property: receivedAt');
    }
    
    if (!rawData.instanceId) {
      throw new Error('Missing required property: instanceId');
    }
    
    if (!rawData.eventType) {
      throw new Error('Missing required property: eventType');
    }
    
    if (rawData.eventData === undefined || rawData.eventData === null) {
      throw new Error('Missing required property: eventData');
    }

    // Parse dates
    const receivedAt = new Date(rawData.receivedAt);
    if (isNaN(receivedAt.getTime())) {
      throw new Error('Invalid receivedAt date format');
    }

    // Validate event type
    const eventParser = this.eventTypeMap[rawData.eventType];
    if (!eventParser) {
      throw new Error(`Unknown event type: ${rawData.eventType}`);
    }

    // Parse the event
    try {
      return eventParser(rawData.eventData, rawData.instanceId, receivedAt, rawData.eventType as EventType);
    } catch (error) {
      throw new Error(`Failed to parse ${rawData.eventType} event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Checks if an event type is supported
   * @param eventType Event type to check
   * @returns True if the event type is supported
   */
  public static isEventTypeSupported(eventType: string): eventType is EventType {
    return eventType in this.eventTypeMap;
  }

  /**
   * Gets all supported event types
   * @returns Array of all supported event type strings
   */
  public static getSupportedEventTypes(): EventType[] {
    return Object.keys(this.eventTypeMap) as EventType[];
  }
}
