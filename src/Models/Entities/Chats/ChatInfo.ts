export interface ChatListItem {
  id: string;
  lid?: string;
  isGroup?: boolean;
  isArchived?: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
  muteEndTime?: string;
  pushName?: string;
  businessName?: string;
  fullName?: string;
  lastActivity?: string;
}

export type ChatInfo = ChatListItem;
