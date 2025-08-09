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
}
