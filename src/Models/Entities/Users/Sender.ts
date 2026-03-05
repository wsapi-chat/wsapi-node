import { Identity } from './Identity.js';

export interface Sender extends Identity {
  isMe: boolean;
}
