import { MessageRequestBase } from './MessageRequestBase.js';

/**
 * Request to send a document message
 */
export interface MessageSendDocumentRequest extends MessageRequestBase {
  /**
   * The document to send, encoded in base64.
   */
  documentBase64?: string;

  /**
   * The URL of the document to send. (this is an alternative to documentBase64)
   */
  documentUrl?: string;

  /**
   * The name of the file being sent.
   */
  fileName: string;

  /**
   * Caption for the document, which can be displayed alongside the document.
   */
  caption?: string;
}
