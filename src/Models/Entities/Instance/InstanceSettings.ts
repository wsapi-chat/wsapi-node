/**
 * Valid event filter types that can be used to filter webhook events
 */
export type EventFilterType =
  | 'message'
  | 'message_read'
  | 'message_delete'
  | 'message_star'
  | 'message_history_sync'
  | 'chat_setting'
  | 'chat_presence'
  | 'chat_push_name'
  | 'chat_status'
  | 'chat_picture'
  | 'contact'
  | 'group'
  | 'user_presence'
  | 'call_offer'
  | 'call_terminate'
  | 'call_accept'
  | 'logged_error'
  | 'logged_out'
  | 'logged_in'
  | 'initial_sync_finished';

/**
 * Instance settings for the WhatsApp Business API.
 */
export interface InstanceSettings {
  /** The name of the instance */
  name: string;

  /** The description of the instance */
  description?: string;

  /** The webhook URL for receiving events */
  webhookUrl?: string;

  /** The webhook authorization header name */
  webhookAuthHeader?: string;

  /** The webhook authorization header value */
  webhookAuthValue?: string;

  /** Whether the instance is in pull mode */
  pullMode: boolean;

  /**
   * Optional list of event types to receive via webhook.
   * If null or not set, all events are received.
   */
  eventFilters?: EventFilterType[] | null;
}
