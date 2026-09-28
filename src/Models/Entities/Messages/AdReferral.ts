/** Optional attribution supplied by WhatsApp for Click-to-WhatsApp ads. */
export interface AdReferral {
  ctwaClid?: string;
  sourceType?: string;
  sourceId?: string;
  sourceUrl?: string;
  sourceApp?: string;
  title?: string;
  body?: string;
  mediaType?: string;
  thumbnailUrl?: string;
  conversionSource?: string;
  showAdAttribution?: boolean;
}
