// Base message request interface
export { type MessageRequestBase } from './MessageRequestBase.js';

// Message sending requests
export { type MessageSendTextRequest } from './MessageSendTextRequest.js';
export { type MessageSendImageRequest } from './MessageSendImageRequest.js';
export { type MessageSendVideoRequest } from './MessageSendVideoRequest.js';
export { type MessageSendAudioRequest } from './MessageSendAudioRequest.js';
export { type MessageSendVoiceRequest } from './MessageSendVoiceRequest.js';
export { type MessageSendDocumentRequest } from './MessageSendDocumentRequest.js';
export { type MessageSendStickerRequest } from './MessageSendStickerRequest.js';
export { type MessageSendContactRequest } from './MessageSendContactRequest.js';
export { type MessageSendLocationRequest } from './MessageSendLocationRequest.js';
export { type MessageSendLinkRequest } from './MessageSendLinkRequest.js';
export { type MessageSendReactionRequest } from './MessageSendReactionRequest.js';

// Message management requests
export { type MessageMarkAsReadRequest } from './MessageMarkAsReadRequest.js';
export { type MessageStarRequest } from './MessageStarRequest.js';
export { type MessageDeleteRequest } from './MessageDeleteRequest.js';
export { type MessageDeleteForMeRequest } from './MessageDeleteForMeRequest.js';
