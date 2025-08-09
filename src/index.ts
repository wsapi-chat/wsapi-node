// Core API infrastructure
export { ApiException } from './ApiClient/ApiException.js';
export { type ApiResponse, ApiResponseImpl } from './ApiClient/ApiResponse.js';
export { HttpClient, type HttpClientOptions } from './ApiClient/HttpClient.js';
export { HttpClientExtensions } from './ApiClient/HttpClientExtensions.js';
export { type ProblemDetails } from './ApiClient/ProblemDetails.js';

// Main WSApi Client
export { WSApiClient } from './ApiClient/WSApiClient.js';
export { type IWSApiClient, type WSApiClientOptions } from './ApiClient/IWSApiClient.js';

// API Clients
export { type IMessagesClient } from './ApiClient/IMessagesClient.js';
export { MessagesClient } from './ApiClient/MessagesClient.js';
export { type IGroupsClient } from './ApiClient/IGroupsClient.js';
export { GroupsClient } from './ApiClient/GroupsClient.js';
export { type IContactsClient } from './ApiClient/IContactsClient.js';
export { ContactsClient } from './ApiClient/ContactsClient.js';
export { type IChatsClient } from './ApiClient/IChatsClient.js';
export { ChatsClient } from './ApiClient/ChatsClient.js';
export { type IAccountClient } from './ApiClient/IAccountClient.js';
export { AccountClient } from './ApiClient/AccountClient.js';
export { type IUsersClient } from './ApiClient/IUsersClient.js';
export { UsersClient } from './ApiClient/UsersClient.js';
export { type IMediaClient } from './ApiClient/IMediaClient.js';
export { MediaClient } from './ApiClient/MediaClient.js';
export { type IInstanceClient } from './ApiClient/IInstanceClient.js';
export { InstanceClient } from './ApiClient/InstanceClient.js';
export { type ISessionClient } from './ApiClient/ISessionClient.js';
export { SessionClient } from './ApiClient/SessionClient.js';
export { type ICallsClient } from './ApiClient/ICallsClient.js';
export { CallsClient } from './ApiClient/CallsClient.js';

// Models (Constants, Requests, Entities)
export * from './Models/index.js';

// SSE (Server-Sent Events)
export * from './SSE/index.js';

// Events (Event Factory and specific event types)
export { EventFactory, type RawEventData, type WSApiEvent } from './Events/EventFactory.js';
export { type BaseEvent } from './Events/BaseEvent.js';

// Session events
export type { SessionLoggedInEvent, SessionLoggedOutEvent, SessionLoggedErrorEvent } from './Events/Session/SessionEvents.js';

// Message events  
export type { MessageEvent, MessageDeleteEvent, MessageHistorySyncEvent, MessageReadEvent, MessageStarEvent } from './Events/Messages/MessageEvents.js';

// Chat events
export type { ChatPresenceEvent, ChatSettingEvent } from './Events/Chats/ChatEvents.js';

// Contact events
export type { ContactEvent } from './Events/Contacts/ContactEvents.js';

// User events
export type { UserPushNameEvent, UserPictureEvent, UserPresenceEvent, UserStatusEvent } from './Events/Users/UserEvents.js';

// Call events
export type { CallOfferEvent, CallAcceptEvent, CallTerminateEvent } from './Events/Calls/CallEvents.js';
