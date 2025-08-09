/**
 * Business category information
 */
export interface ContactBusinessCategory {
  /**
   * The unique identifier of the category.
   */
  id: string;

  /**
   * The name of the category.
   */
  name: string;
}

/**
 * Business hours information
 */
export interface BusinessHours {
  /**
   * The day of the week.
   */
  dayOfWeek: string;

  /**
   * The mode (open/closed).
   */
  mode: string;

  /**
   * The opening time.
   */
  openTime: string;

  /**
   * The closing time.
   */
  closeTime: string;
}

/**
 * Contact business profile information
 */
export interface ContactBusinessProfile {
  /**
   * The unique identifier of the business profile.
   */
  id: string;

  /**
   * The business address.
   */
  address: string;

  /**
   * The business description.
   */
  description: string;

  /**
   * The business email address.
   */
  email: string;

  /**
   * The business website.
   */
  website: string;

  /**
   * The latitude of the business location.
   */
  latitude: number;

  /**
   * The longitude of the business location.
   */
  longitude: number;

  /**
   * When the business became a member.
   */
  memberSince: string;

  /**
   * Business categories.
   */
  businessCategories: ContactBusinessCategory[];

  /**
   * Business hours timezone.
   */
  businessHoursTimeZone: string;

  /**
   * Business hours.
   */
  businessHours: BusinessHours[];

  /**
   * Additional profile options.
   */
  profileOptions: Record<string, string>;
}
