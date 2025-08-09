import { EventTypes, EventType } from './Constants/EventTypes';
import { BaseEvent } from './BaseEvent';

// Import all event types
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
    
    [EventTypes.CHAT_PRESENCE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : new Date()
    } as ChatPresenceEvent),
    
    [EventTypes.CHAT_SETTING]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      changedAt: data.changedAt ? new Date(data.changedAt) : new Date()
    } as ChatSettingEvent),
    
    [EventTypes.MESSAGE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      time: data.time ? new Date(data.time) : new Date()
    } as MessageEvent),
    
    [EventTypes.MESSAGE_DELETE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      deletedAt: data.deletedAt ? new Date(data.deletedAt) : new Date()
    } as MessageDeleteEvent),
    
    [EventTypes.MESSAGE_HISTORY_SYNC]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      syncStartTime: data.syncStartTime ? new Date(data.syncStartTime) : new Date(),
      syncEndTime: data.syncEndTime ? new Date(data.syncEndTime) : new Date()
    } as MessageHistorySyncEvent),
    
    [EventTypes.MESSAGE_READ]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      readAt: data.readAt ? new Date(data.readAt) : new Date()
    } as MessageReadEvent),
    
    [EventTypes.MESSAGE_STAR]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      starredAt: data.starredAt ? new Date(data.starredAt) : new Date()
    } as MessageStarEvent),
    
    [EventTypes.CONTACT]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : new Date()
    } as ContactEvent),
    
    [EventTypes.USER_PUSH_NAME]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      changedAt: data.changedAt ? new Date(data.changedAt) : new Date()
    } as UserPushNameEvent),
    
    [EventTypes.USER_PICTURE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      changedAt: data.changedAt ? new Date(data.changedAt) : new Date()
    } as UserPictureEvent),
    
    [EventTypes.USER_PRESENCE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      lastSeen: data.lastSeen ? new Date(data.lastSeen) : new Date()
    } as UserPresenceEvent),
    
    [EventTypes.USER_STATUS]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      changedAt: data.changedAt ? new Date(data.changedAt) : new Date()
    } as UserStatusEvent),
    
    [EventTypes.CALL_OFFER]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      time: data.time ? new Date(data.time) : new Date()
    } as CallOfferEvent),
    
    [EventTypes.CALL_ACCEPT]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      acceptedAt: data.acceptedAt ? new Date(data.acceptedAt) : new Date()
    } as CallAcceptEvent),
    
    [EventTypes.CALL_TERMINATE]: (data, instanceId, receivedAt, eventType) => ({
      ...data,
      instanceId,
      receivedAt,
      eventType,
      terminatedAt: data.terminatedAt ? new Date(data.terminatedAt) : new Date()
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
