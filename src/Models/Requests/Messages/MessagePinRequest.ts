export interface MessagePinRequest {
  chatId: string;
  senderId: string;
  pinned?: boolean;
  pinExpiration?: string;
}
