import { MessageRequestBase } from './MessageRequestBase.js';

/**
 * Request to send a location message
 */
export interface MessageSendLocationRequest extends MessageRequestBase {
  /**
   * Latitude of the location.
   */
  latitude: number;

  /**
   * Longitude of the location.
   */
  longitude: number;

  /**
   * Optional. The address of the location. This can be a full address or a description of the location.
   */
  address?: string;

  /**
   * Optional. The name of the location. This can be a place name or a custom name for the location.
   */
  name?: string;

  /**
   * Optional. A URL to a map or a static image of the location. This can be used to provide additional context or visual representation of the location.
   */
  url?: string;
}
