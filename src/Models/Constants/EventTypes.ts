export const EventTypes = {
  // Session events
  LOGGED_IN: 'logged_in',
  LOGGED_OUT: 'logged_out',
  LOGGED_ERROR: 'logged_error',
  INITIAL_SYNC_FINISHED: 'initial_sync_finished',

  // Chat events
  CHAT_PRESENCE: 'chat_presence',
  CHAT_SETTING: 'chat_setting',
  CHAT_PUSH_NAME: 'chat_push_name',
  CHAT_STATUS: 'chat_status',
  CHAT_PICTURE: 'chat_picture',

  // Message events
  MESSAGE: 'message',
  MESSAGE_DELETE: 'message_delete',
  MESSAGE_HISTORY_SYNC: 'message_history_sync',
  MESSAGE_READ: 'message_read',
  MESSAGE_STAR: 'message_star',

  // Contact events
  CONTACT: 'contact',

  // Group events
  GROUP: 'group',

  // User events
  USER_PRESENCE: 'user_presence',

  // Call events
  CALL_OFFER: 'call_offer',
  CALL_ACCEPT: 'call_accept',
  CALL_TERMINATE: 'call_terminate',

  // Newsletter events
  NEWSLETTER: 'newsletter',
} as const;

export type EventType = typeof EventTypes[keyof typeof EventTypes];
