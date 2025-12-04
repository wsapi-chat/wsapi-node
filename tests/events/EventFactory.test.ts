import { describe, it, expect } from 'vitest';
import { EventFactory, type RawEventData } from '../../src/Events/EventFactory';
import { EventTypes } from '../../src/Models/Constants/EventTypes';
import type { SessionLoggedInEvent, SessionLoggedOutEvent, SessionLoggedErrorEvent } from '../../src/Events/Session/SessionEvents';
import type { MessageEvent, MessageDeleteEvent, MessageHistorySyncEvent, MessageReadEvent, MessageStarEvent } from '../../src/Events/Messages/MessageEvents';
import type { ChatPresenceEvent, ChatSettingEvent } from '../../src/Events/Chats/ChatEvents';
import type { ContactEvent } from '../../src/Events/Contacts/ContactEvents';
import type { UserPushNameEvent, UserPictureEvent, UserPresenceEvent, UserStatusEvent } from '../../src/Events/Users/UserEvents';
import type { CallOfferEvent, CallAcceptEvent, CallTerminateEvent } from '../../src/Events/Calls/CallEvents';

describe('EventFactory', () => {
  const instanceId = 'instance123';
  const receivedAt = '2025-01-01T12:00:00Z';

  describe('parseEvent', () => {
    it('should throw error for null or empty JSON', () => {
      expect(() => EventFactory.parseEvent('')).toThrow('JSON cannot be null or empty');
      expect(() => EventFactory.parseEvent('   ')).toThrow('JSON cannot be null or empty');
    });

    it('should throw error for invalid JSON', () => {
      expect(() => EventFactory.parseEvent('invalid json')).toThrow('Invalid JSON format');
    });

    it('should parse valid JSON event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.LOGGED_IN,
        eventData: { deviceId: 'device123' },
      };

      const event = EventFactory.parseEvent(JSON.stringify(rawEvent)) as SessionLoggedInEvent;

      expect(event.eventType).toBe(EventTypes.LOGGED_IN);
      expect(event.instanceId).toBe(instanceId);
      expect(event.deviceId).toBe('device123');
    });
  });

  describe('parseRawEvent', () => {
    it('should throw error for missing receivedAt', () => {
      const rawEvent = {
        instanceId,
        eventType: EventTypes.LOGGED_IN,
        eventData: {},
      } as RawEventData;

      expect(() => EventFactory.parseRawEvent(rawEvent)).toThrow('Missing required property: receivedAt');
    });

    it('should throw error for missing instanceId', () => {
      const rawEvent = {
        receivedAt,
        eventType: EventTypes.LOGGED_IN,
        eventData: {},
      } as RawEventData;

      expect(() => EventFactory.parseRawEvent(rawEvent)).toThrow('Missing required property: instanceId');
    });

    it('should throw error for missing eventType', () => {
      const rawEvent = {
        receivedAt,
        instanceId,
        eventData: {},
      } as RawEventData;

      expect(() => EventFactory.parseRawEvent(rawEvent)).toThrow('Missing required property: eventType');
    });

    it('should throw error for missing eventData', () => {
      const rawEvent = {
        receivedAt,
        instanceId,
        eventType: EventTypes.LOGGED_IN,
      } as RawEventData;

      expect(() => EventFactory.parseRawEvent(rawEvent)).toThrow('Missing required property: eventData');
    });

    it('should throw error for invalid receivedAt date format', () => {
      const rawEvent: RawEventData = {
        receivedAt: 'invalid-date',
        instanceId,
        eventType: EventTypes.LOGGED_IN,
        eventData: {},
      };

      expect(() => EventFactory.parseRawEvent(rawEvent)).toThrow('Invalid receivedAt date format');
    });

    it('should throw error for unknown event type', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: 'unknown_event',
        eventData: {},
      };

      expect(() => EventFactory.parseRawEvent(rawEvent)).toThrow('Unknown event type: unknown_event');
    });
  });

  describe('Session Events', () => {
    it('should parse logged_in event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.LOGGED_IN,
        eventData: { deviceId: 'device123' },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as SessionLoggedInEvent;

      expect(event.eventType).toBe(EventTypes.LOGGED_IN);
      expect(event.instanceId).toBe(instanceId);
      expect(event.receivedAt).toBeInstanceOf(Date);
      expect(event.deviceId).toBe('device123');
    });

    it('should parse logged_out event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.LOGGED_OUT,
        eventData: {},
      };

      const event = EventFactory.parseRawEvent(rawEvent) as SessionLoggedOutEvent;

      expect(event.eventType).toBe(EventTypes.LOGGED_OUT);
      expect(event.instanceId).toBe(instanceId);
    });

    it('should parse logged_error event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.LOGGED_ERROR,
        eventData: { error: 'Connection failed', errorCode: 'ERR_CONNECTION' },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as SessionLoggedErrorEvent;

      expect(event.eventType).toBe(EventTypes.LOGGED_ERROR);
      expect(event.error).toBe('Connection failed');
      expect(event.errorCode).toBe('ERR_CONNECTION');
    });
  });

  describe('Message Events', () => {
    it('should parse message event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.MESSAGE,
        eventData: {
          id: 'msg123',
          chatId: '1234567890@s.whatsapp.net',
          sender: { id: '1234567890@s.whatsapp.net', name: 'Test' },
          senderName: 'Test User',
          time: '2025-01-01T11:00:00Z',
          isGroup: false,
          isStatus: false,
          type: 'text',
          text: 'Hello World',
          expiration: 'off',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as MessageEvent;

      expect(event.eventType).toBe(EventTypes.MESSAGE);
      expect(event.id).toBe('msg123');
      expect(event.chatId).toBe('1234567890@s.whatsapp.net');
      expect(event.senderName).toBe('Test User');
      expect(event.time).toBeInstanceOf(Date);
      expect(event.isGroup).toBe(false);
      expect(event.type).toBe('text');
      expect(event.text).toBe('Hello World');
    });

    it('should parse message_delete event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.MESSAGE_DELETE,
        eventData: {
          messageId: 'msg123',
          chatId: '1234567890@s.whatsapp.net',
          deletedBy: '1234567890@s.whatsapp.net',
          deletedAt: '2025-01-01T11:30:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as MessageDeleteEvent;

      expect(event.eventType).toBe(EventTypes.MESSAGE_DELETE);
      expect(event.messageId).toBe('msg123');
      expect(event.deletedBy).toBe('1234567890@s.whatsapp.net');
      expect(event.deletedAt).toBeInstanceOf(Date);
    });

    it('should parse message_history_sync event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.MESSAGE_HISTORY_SYNC,
        eventData: {
          chatId: '1234567890@s.whatsapp.net',
          messageCount: 100,
          syncStartTime: '2025-01-01T10:00:00Z',
          syncEndTime: '2025-01-01T10:05:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as MessageHistorySyncEvent;

      expect(event.eventType).toBe(EventTypes.MESSAGE_HISTORY_SYNC);
      expect(event.messageCount).toBe(100);
      expect(event.syncStartTime).toBeInstanceOf(Date);
      expect(event.syncEndTime).toBeInstanceOf(Date);
    });

    it('should parse message_read event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.MESSAGE_READ,
        eventData: {
          messageId: 'msg123',
          chatId: '1234567890@s.whatsapp.net',
          readBy: '1234567890@s.whatsapp.net',
          readAt: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as MessageReadEvent;

      expect(event.eventType).toBe(EventTypes.MESSAGE_READ);
      expect(event.messageId).toBe('msg123');
      expect(event.readBy).toBe('1234567890@s.whatsapp.net');
      expect(event.readAt).toBeInstanceOf(Date);
    });

    it('should parse message_star event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.MESSAGE_STAR,
        eventData: {
          messageId: 'msg123',
          chatId: '1234567890@s.whatsapp.net',
          isStarred: true,
          starredBy: '1234567890@s.whatsapp.net',
          starredAt: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as MessageStarEvent;

      expect(event.eventType).toBe(EventTypes.MESSAGE_STAR);
      expect(event.isStarred).toBe(true);
      expect(event.starredBy).toBe('1234567890@s.whatsapp.net');
      expect(event.starredAt).toBeInstanceOf(Date);
    });
  });

  describe('Chat Events', () => {
    it('should parse chat_presence event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CHAT_PRESENCE,
        eventData: {
          chatId: '1234567890@s.whatsapp.net',
          userId: '1234567890@s.whatsapp.net',
          status: 'composing',
          lastUpdated: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as ChatPresenceEvent;

      expect(event.eventType).toBe(EventTypes.CHAT_PRESENCE);
      expect(event.chatId).toBe('1234567890@s.whatsapp.net');
      expect(event.status).toBe('composing');
      expect(event.lastUpdated).toBeInstanceOf(Date);
    });

    it('should parse chat_setting event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CHAT_SETTING,
        eventData: {
          chatId: '1234567890@s.whatsapp.net',
          setting: 'mute',
          value: true,
          changedBy: '1234567890@s.whatsapp.net',
          changedAt: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as ChatSettingEvent;

      expect(event.eventType).toBe(EventTypes.CHAT_SETTING);
      expect(event.setting).toBe('mute');
      expect(event.value).toBe(true);
      expect(event.changedAt).toBeInstanceOf(Date);
    });
  });

  describe('Contact Events', () => {
    it('should parse contact event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CONTACT,
        eventData: {
          id: '1234567890@s.whatsapp.net',
          name: 'Test Contact',
          phoneNumber: '+1234567890',
          isBusiness: false,
          lastUpdated: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as ContactEvent;

      expect(event.eventType).toBe(EventTypes.CONTACT);
      expect(event.id).toBe('1234567890@s.whatsapp.net');
      expect(event.name).toBe('Test Contact');
      expect(event.isBusiness).toBe(false);
      expect(event.lastUpdated).toBeInstanceOf(Date);
    });
  });

  describe('User Events', () => {
    it('should parse user_push_name event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.USER_PUSH_NAME,
        eventData: {
          id: '1234567890@s.whatsapp.net',
          pushName: 'New Name',
          previousPushName: 'Old Name',
          changedAt: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as UserPushNameEvent;

      expect(event.eventType).toBe(EventTypes.USER_PUSH_NAME);
      expect(event.pushName).toBe('New Name');
      expect(event.previousPushName).toBe('Old Name');
      expect(event.changedAt).toBeInstanceOf(Date);
    });

    it('should parse user_picture event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.USER_PICTURE,
        eventData: {
          id: '1234567890@s.whatsapp.net',
          pictureUrl: 'https://example.com/picture.jpg',
          isRemoved: false,
          changedAt: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as UserPictureEvent;

      expect(event.eventType).toBe(EventTypes.USER_PICTURE);
      expect(event.pictureUrl).toBe('https://example.com/picture.jpg');
      expect(event.isRemoved).toBe(false);
      expect(event.changedAt).toBeInstanceOf(Date);
    });

    it('should parse user_presence event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.USER_PRESENCE,
        eventData: {
          id: '1234567890@s.whatsapp.net',
          status: 'online',
          lastSeen: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as UserPresenceEvent;

      expect(event.eventType).toBe(EventTypes.USER_PRESENCE);
      expect(event.status).toBe('online');
      expect(event.lastSeen).toBeInstanceOf(Date);
    });

    it('should parse user_status event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.USER_STATUS,
        eventData: {
          id: '1234567890@s.whatsapp.net',
          status: 'Hey there! I am using WhatsApp.',
          previousStatus: 'Available',
          changedAt: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as UserStatusEvent;

      expect(event.eventType).toBe(EventTypes.USER_STATUS);
      expect(event.status).toBe('Hey there! I am using WhatsApp.');
      expect(event.previousStatus).toBe('Available');
      expect(event.changedAt).toBeInstanceOf(Date);
    });
  });

  describe('Call Events', () => {
    it('should parse call_offer event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CALL_OFFER,
        eventData: {
          id: 'call123',
          caller: '1234567890@s.whatsapp.net',
          chatId: '1234567890@s.whatsapp.net',
          isGroup: false,
          time: '2025-01-01T11:00:00Z',
          isVideo: false,
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as CallOfferEvent;

      expect(event.eventType).toBe(EventTypes.CALL_OFFER);
      expect(event.id).toBe('call123');
      expect(event.caller).toBe('1234567890@s.whatsapp.net');
      expect(event.isVideo).toBe(false);
      expect(event.time).toBeInstanceOf(Date);
    });

    it('should parse call_accept event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CALL_ACCEPT,
        eventData: {
          id: 'call123',
          acceptedBy: '1234567890@s.whatsapp.net',
          chatId: '1234567890@s.whatsapp.net',
          acceptedAt: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as CallAcceptEvent;

      expect(event.eventType).toBe(EventTypes.CALL_ACCEPT);
      expect(event.id).toBe('call123');
      expect(event.acceptedBy).toBe('1234567890@s.whatsapp.net');
      expect(event.acceptedAt).toBeInstanceOf(Date);
    });

    it('should parse call_terminate event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CALL_TERMINATE,
        eventData: {
          id: 'call123',
          terminatedBy: '1234567890@s.whatsapp.net',
          chatId: '1234567890@s.whatsapp.net',
          reason: 'ended',
          duration: 120,
          terminatedAt: '2025-01-01T11:02:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as CallTerminateEvent;

      expect(event.eventType).toBe(EventTypes.CALL_TERMINATE);
      expect(event.id).toBe('call123');
      expect(event.reason).toBe('ended');
      expect(event.duration).toBe(120);
      expect(event.terminatedAt).toBeInstanceOf(Date);
    });
  });

  describe('isEventTypeSupported', () => {
    it('should return true for supported event types', () => {
      expect(EventFactory.isEventTypeSupported(EventTypes.LOGGED_IN)).toBe(true);
      expect(EventFactory.isEventTypeSupported(EventTypes.MESSAGE)).toBe(true);
      expect(EventFactory.isEventTypeSupported(EventTypes.CALL_OFFER)).toBe(true);
    });

    it('should return false for unsupported event types', () => {
      expect(EventFactory.isEventTypeSupported('unknown_event')).toBe(false);
      expect(EventFactory.isEventTypeSupported('')).toBe(false);
    });
  });

  describe('getSupportedEventTypes', () => {
    it('should return all supported event types', () => {
      const supportedTypes = EventFactory.getSupportedEventTypes();

      expect(supportedTypes).toContain(EventTypes.LOGGED_IN);
      expect(supportedTypes).toContain(EventTypes.LOGGED_OUT);
      expect(supportedTypes).toContain(EventTypes.LOGGED_ERROR);
      expect(supportedTypes).toContain(EventTypes.MESSAGE);
      expect(supportedTypes).toContain(EventTypes.MESSAGE_DELETE);
      expect(supportedTypes).toContain(EventTypes.MESSAGE_HISTORY_SYNC);
      expect(supportedTypes).toContain(EventTypes.MESSAGE_READ);
      expect(supportedTypes).toContain(EventTypes.MESSAGE_STAR);
      expect(supportedTypes).toContain(EventTypes.CHAT_PRESENCE);
      expect(supportedTypes).toContain(EventTypes.CHAT_SETTING);
      expect(supportedTypes).toContain(EventTypes.CONTACT);
      expect(supportedTypes).toContain(EventTypes.USER_PUSH_NAME);
      expect(supportedTypes).toContain(EventTypes.USER_PICTURE);
      expect(supportedTypes).toContain(EventTypes.USER_PRESENCE);
      expect(supportedTypes).toContain(EventTypes.USER_STATUS);
      expect(supportedTypes).toContain(EventTypes.CALL_OFFER);
      expect(supportedTypes).toContain(EventTypes.CALL_ACCEPT);
      expect(supportedTypes).toContain(EventTypes.CALL_TERMINATE);
      expect(supportedTypes.length).toBe(18);
    });
  });

  describe('Date parsing edge cases', () => {
    it('should use current date when date fields are missing', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CHAT_PRESENCE,
        eventData: {
          chatId: '1234567890@s.whatsapp.net',
          userId: '1234567890@s.whatsapp.net',
          status: 'online',
          // lastUpdated is missing
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as ChatPresenceEvent;

      expect(event.lastUpdated).toBeInstanceOf(Date);
    });
  });
});
