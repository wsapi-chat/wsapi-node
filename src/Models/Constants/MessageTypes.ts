export const MessageTypes = {
  TEXT: 'text',
  MEDIA: 'media',
  REACTION: 'reaction',
  CONTACT: 'contact',
  CONTACT_ARRAY: 'contact-array'
} as const;

export type MessageType = typeof MessageTypes[keyof typeof MessageTypes];
