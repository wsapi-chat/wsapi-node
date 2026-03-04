import { describe, it, expect } from 'vitest';
import { EventFactory, type RawEventData } from '../../src/Events/EventFactory';
import { EventTypes } from '../../src/Models/Constants/EventTypes';
import type { SessionLoggedInEvent, SessionLoggedOutEvent, SessionLoggedErrorEvent, InitialSyncFinishedEvent } from '../../src/Events/Session/SessionEvents';
import type { MessageEvent, MessageDeleteEvent, MessageHistorySyncEvent, MessageReadEvent, MessageStarEvent } from '../../src/Events/Messages/MessageEvents';
import type { ChatPresenceEvent, ChatSettingEvent, ChatPushNameEvent, ChatStatusEvent, ChatPictureEvent } from '../../src/Events/Chats/ChatEvents';
import type { ContactEvent } from '../../src/Events/Contacts/ContactEvents';
import type { UserPresenceEvent } from '../../src/Events/Users/UserEvents';
import type { GroupEvent } from '../../src/Events/Groups/GroupEvents';
import type { CallOfferEvent, CallAcceptEvent, CallTerminateEvent } from '../../src/Events/Calls/CallEvents';
import type { NewsletterEvent } from '../../src/Events/Newsletters/NewsletterEvents';

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
        eventData: { reason: 'user_logged_out' },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as SessionLoggedOutEvent;

      expect(event.eventType).toBe(EventTypes.LOGGED_OUT);
      expect(event.instanceId).toBe(instanceId);
      expect(event.reason).toBe('user_logged_out');
    });

    it('should parse logged_error event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.LOGGED_ERROR,
        eventData: { error: 'Connection failed', id: 'device123' },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as SessionLoggedErrorEvent;

      expect(event.eventType).toBe(EventTypes.LOGGED_ERROR);
      expect(event.error).toBe('Connection failed');
      expect(event.id).toBe('device123');
    });

    it('should parse initial_sync_finished event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.INITIAL_SYNC_FINISHED,
        eventData: {},
      };

      const event = EventFactory.parseRawEvent(rawEvent) as InitialSyncFinishedEvent;

      expect(event.eventType).toBe(EventTypes.INITIAL_SYNC_FINISHED);
      expect(event.instanceId).toBe(instanceId);
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
          sender: { id: '1234567890@s.whatsapp.net', user: '1234567890', isMe: false },
          time: '2025-01-01T11:00:00Z',
          isGroup: false,
          isStatus: false,
          type: 'text',
          text: 'Hello World',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as MessageEvent;

      expect(event.eventType).toBe(EventTypes.MESSAGE);
      expect(event.id).toBe('msg123');
      expect(event.chatId).toBe('1234567890@s.whatsapp.net');
      expect(event.sender.id).toBe('1234567890@s.whatsapp.net');
      expect(event.time).toBe('2025-01-01T11:00:00Z');
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
          id: 'msg123',
          chatId: '1234567890@s.whatsapp.net',
          sender: { id: '1234567890@s.whatsapp.net', user: '1234567890', isMe: false },
          time: '2025-01-01T11:30:00Z',
          isDeletedForAll: true,
          isDeletedForMe: false,
          isStatus: false,
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as MessageDeleteEvent;

      expect(event.eventType).toBe(EventTypes.MESSAGE_DELETE);
      expect(event.id).toBe('msg123');
      expect(event.chatId).toBe('1234567890@s.whatsapp.net');
      expect(event.time).toBe('2025-01-01T11:30:00Z');
      expect(event.isDeletedForAll).toBe(true);
    });

    it('should parse message_history_sync event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.MESSAGE_HISTORY_SYNC,
        eventData: {
          messages: [
            {
              instanceId: 'instance123',
              receivedAt: '2025-01-01T12:00:00Z',
              eventType: 'message',
              eventData: {
                id: 'msg1',
                time: '2025-01-01T10:00:00Z',
                chatId: '1234567890@s.whatsapp.net',
                sender: { id: '1234567890@s.whatsapp.net', user: '1234567890', isMe: false },
                type: 'text',
                text: 'Hello',
              },
            },
          ],
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as MessageHistorySyncEvent;

      expect(event.eventType).toBe(EventTypes.MESSAGE_HISTORY_SYNC);
      expect(event.messages).toBeDefined();
    });

    it('should parse message_read event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.MESSAGE_READ,
        eventData: {
          chatId: '1234567890@s.whatsapp.net',
          sender: { id: '1234567890@s.whatsapp.net', user: '1234567890', isMe: false },
          messageSender: { id: '9876543210@s.whatsapp.net', user: '9876543210', isMe: true },
          messageIds: ['msg123'],
          time: '2025-01-01T11:00:00Z',
          receiptType: 'read',
          isGroup: false,
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as MessageReadEvent;

      expect(event.eventType).toBe(EventTypes.MESSAGE_READ);
      expect(event.chatId).toBe('1234567890@s.whatsapp.net');
      expect(event.receiptType).toBe('read');
      expect(event.time).toBe('2025-01-01T11:00:00Z');
    });

    it('should parse message_star event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.MESSAGE_STAR,
        eventData: {
          id: 'msg123',
          chatId: '1234567890@s.whatsapp.net',
          sender: { id: '1234567890@s.whatsapp.net', user: '1234567890', isMe: false },
          time: '2025-01-01T11:00:00Z',
          isStarred: true,
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as MessageStarEvent;

      expect(event.eventType).toBe(EventTypes.MESSAGE_STAR);
      expect(event.isStarred).toBe(true);
      expect(event.id).toBe('msg123');
      expect(event.time).toBe('2025-01-01T11:00:00Z');
    });
  });

  describe('Chat Events', () => {
    it('should parse chat_presence event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CHAT_PRESENCE,
        eventData: {
          id: '1234567890@s.whatsapp.net',
          sender: { id: '1234567890@s.whatsapp.net', user: '1234567890', isMe: false },
          state: 'typing',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as ChatPresenceEvent;

      expect(event.eventType).toBe(EventTypes.CHAT_PRESENCE);
      expect(event.id).toBe('1234567890@s.whatsapp.net');
      expect(event.state).toBe('typing');
    });

    it('should parse chat_setting event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CHAT_SETTING,
        eventData: {
          id: '1234567890@s.whatsapp.net',
          settingType: 'mute',
          mute: {
            isMuted: true,
            muteEndTime: '2025-01-02T12:00:00Z',
          },
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as ChatSettingEvent;

      expect(event.eventType).toBe(EventTypes.CHAT_SETTING);
      expect(event.settingType).toBe('mute');
      expect(event.mute?.isMuted).toBe(true);
    });

    it('should parse chat_push_name event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CHAT_PUSH_NAME,
        eventData: {
          user: { id: '1234567890@s.whatsapp.net', phone: '1234567890' },
          pushName: 'John Doe',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as ChatPushNameEvent;

      expect(event.eventType).toBe(EventTypes.CHAT_PUSH_NAME);
      expect(event.user.id).toBe('1234567890@s.whatsapp.net');
      expect(event.pushName).toBe('John Doe');
    });

    it('should parse chat_status event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CHAT_STATUS,
        eventData: {
          user: { id: '1234567890@s.whatsapp.net', phone: '1234567890' },
          status: 'Available',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as ChatStatusEvent;

      expect(event.eventType).toBe(EventTypes.CHAT_STATUS);
      expect(event.user.id).toBe('1234567890@s.whatsapp.net');
      expect(event.status).toBe('Available');
    });

    it('should parse chat_picture event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CHAT_PICTURE,
        eventData: {
          id: '1234567890@s.whatsapp.net',
          sender: { id: '1234567890@s.whatsapp.net', user: '1234567890', isMe: false },
          pictureId: 'picture_123',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as ChatPictureEvent;

      expect(event.eventType).toBe(EventTypes.CHAT_PICTURE);
      expect(event.id).toBe('1234567890@s.whatsapp.net');
      expect(event.pictureId).toBe('picture_123');
    });
  });

  describe('Contact Events', () => {
    it('should parse contact event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CONTACT,
        eventData: {
          contact: { id: '1234567890@s.whatsapp.net', phone: '1234567890' },
          fullName: 'Test Contact',
          inPhoneAddressBook: true,
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as ContactEvent;

      expect(event.eventType).toBe(EventTypes.CONTACT);
      expect(event.contact.id).toBe('1234567890@s.whatsapp.net');
      expect(event.fullName).toBe('Test Contact');
      expect(event.inPhoneAddressBook).toBe(true);
    });
  });

  describe('Group Events', () => {
    it('should parse group event with topic change', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.GROUP,
        eventData: {
          id: '1234567890-1234567890@g.us',
          sender: { id: '1234567890@s.whatsapp.net', user: '1234567890', isMe: false },
          description: { topic: 'New Group Description' },
          timestamp: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as GroupEvent;

      expect(event.eventType).toBe(EventTypes.GROUP);
      expect(event.id).toBe('1234567890-1234567890@g.us');
      expect(event.description?.topic).toBe('New Group Description');
    });

    it('should parse group event with member join', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.GROUP,
        eventData: {
          id: '1234567890-1234567890@g.us',
          sender: { id: '1234567890@s.whatsapp.net', phone: '1234567890', isMe: false },
          join: [{ id: '9876543210@s.whatsapp.net', phone: '9876543210' }],
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as GroupEvent;

      expect(event.eventType).toBe(EventTypes.GROUP);
      expect(event.join).toHaveLength(1);
      expect(event.join![0].id).toBe('9876543210@s.whatsapp.net');
    });

    it('should parse group event with member leave', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.GROUP,
        eventData: {
          id: '1234567890-1234567890@g.us',
          sender: { id: '9876543210@s.whatsapp.net', phone: '9876543210', isMe: false },
          leave: [{ id: '9876543210@s.whatsapp.net', phone: '9876543210' }],
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as GroupEvent;

      expect(event.eventType).toBe(EventTypes.GROUP);
      expect(event.leave).toHaveLength(1);
      expect(event.leave![0].id).toBe('9876543210@s.whatsapp.net');
    });
  });

  describe('User Events', () => {
    it('should parse user_presence event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.USER_PRESENCE,
        eventData: {
          user: { id: '1234567890@s.whatsapp.net', phone: '1234567890' },
          status: 'available',
          lastSeen: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as UserPresenceEvent;

      expect(event.eventType).toBe(EventTypes.USER_PRESENCE);
      expect(event.user.id).toBe('1234567890@s.whatsapp.net');
      expect(event.status).toBe('available');
      expect(event.lastSeen).toBe('2025-01-01T11:00:00Z');
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
          caller: { id: '1234567890@s.whatsapp.net', phone: '1234567890' },
          chatId: '1234567890@s.whatsapp.net',
          time: '2025-01-01T11:00:00Z',
          isGroup: false,
          isVideo: false,
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as CallOfferEvent;

      expect(event.eventType).toBe(EventTypes.CALL_OFFER);
      expect(event.id).toBe('call123');
      expect(event.caller.id).toBe('1234567890@s.whatsapp.net');
      expect(event.chatId).toBe('1234567890@s.whatsapp.net');
      expect(event.isVideo).toBe(false);
      expect(event.time).toBe('2025-01-01T11:00:00Z');
    });

    it('should parse call_accept event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CALL_ACCEPT,
        eventData: {
          id: 'call123',
          caller: { id: '1234567890@s.whatsapp.net', phone: '1234567890' },
          time: '2025-01-01T11:00:00Z',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as CallAcceptEvent;

      expect(event.eventType).toBe(EventTypes.CALL_ACCEPT);
      expect(event.id).toBe('call123');
      expect(event.caller.id).toBe('1234567890@s.whatsapp.net');
      expect(event.time).toBe('2025-01-01T11:00:00Z');
    });

    it('should parse call_terminate event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.CALL_TERMINATE,
        eventData: {
          id: 'call123',
          caller: { id: '1234567890@s.whatsapp.net', phone: '1234567890' },
          time: '2025-01-01T11:02:00Z',
          reason: 'ended',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as CallTerminateEvent;

      expect(event.eventType).toBe(EventTypes.CALL_TERMINATE);
      expect(event.id).toBe('call123');
      expect(event.caller.id).toBe('1234567890@s.whatsapp.net');
      expect(event.reason).toBe('ended');
      expect(event.time).toBe('2025-01-01T11:02:00Z');
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

      // Session events
      expect(supportedTypes).toContain(EventTypes.LOGGED_IN);
      expect(supportedTypes).toContain(EventTypes.LOGGED_OUT);
      expect(supportedTypes).toContain(EventTypes.LOGGED_ERROR);
      expect(supportedTypes).toContain(EventTypes.INITIAL_SYNC_FINISHED);

      // Message events
      expect(supportedTypes).toContain(EventTypes.MESSAGE);
      expect(supportedTypes).toContain(EventTypes.MESSAGE_DELETE);
      expect(supportedTypes).toContain(EventTypes.MESSAGE_HISTORY_SYNC);
      expect(supportedTypes).toContain(EventTypes.MESSAGE_READ);
      expect(supportedTypes).toContain(EventTypes.MESSAGE_STAR);

      // Chat events
      expect(supportedTypes).toContain(EventTypes.CHAT_PRESENCE);
      expect(supportedTypes).toContain(EventTypes.CHAT_SETTING);
      expect(supportedTypes).toContain(EventTypes.CHAT_PUSH_NAME);
      expect(supportedTypes).toContain(EventTypes.CHAT_STATUS);
      expect(supportedTypes).toContain(EventTypes.CHAT_PICTURE);

      // Other events
      expect(supportedTypes).toContain(EventTypes.CONTACT);
      expect(supportedTypes).toContain(EventTypes.GROUP);
      expect(supportedTypes).toContain(EventTypes.USER_PRESENCE);
      expect(supportedTypes).toContain(EventTypes.CALL_OFFER);
      expect(supportedTypes).toContain(EventTypes.CALL_ACCEPT);
      expect(supportedTypes).toContain(EventTypes.CALL_TERMINATE);

      // Newsletter events
      expect(supportedTypes).toContain(EventTypes.NEWSLETTER);

      // Should have 21 event types total
      expect(supportedTypes.length).toBe(21);
    });
  });

  describe('Newsletter Events', () => {
    it('should parse newsletter event', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.NEWSLETTER,
        eventData: {
          id: 'newsletter123@newsletter',
          action: 'update',
          name: 'Test Newsletter',
          role: 'subscriber',
          mute: false,
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as NewsletterEvent;

      expect(event.eventType).toBe(EventTypes.NEWSLETTER);
      expect(event.id).toBe('newsletter123@newsletter');
      expect(event.action).toBe('update');
      expect(event.name).toBe('Test Newsletter');
      expect(event.role).toBe('subscriber');
      expect(event.mute).toBe(false);
    });
  });

  describe('eventId support', () => {
    it('should pass eventId through to parsed events', () => {
      const rawEvent: RawEventData = {
        receivedAt,
        instanceId,
        eventType: EventTypes.MESSAGE,
        eventId: 'evt-123',
        eventData: {
          id: 'msg123',
          chatId: '1234567890@s.whatsapp.net',
          sender: { id: '1234567890@s.whatsapp.net', phone: '1234567890', isMe: false },
          time: '2025-01-01T11:00:00Z',
          isGroup: false,
          isStatus: false,
          type: 'text',
          text: 'Hello',
        },
      };

      const event = EventFactory.parseRawEvent(rawEvent) as MessageEvent;

      expect(event.eventId).toBe('evt-123');
    });
  });
});
