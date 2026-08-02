/**
 * Human-readable display labels for URL segment slugs.
 * Used by the breadcrumb component and any place that renders a category/subcategory name.
 */

export const CATEGORY_LABELS: Record<string, string> = {
  'airport-rules':    'Airport Rules',
  'travel-documents': 'Travel Documents',
  'customs':          'Customs Rules India',
};

export const SUBCATEGORY_LABELS: Record<string, string> = {
  // airport-rules
  'cabin-baggage':           'Cabin Baggage',
  'checked-baggage':         'Checked Baggage',
  'restricted-items':        'Restricted Items',
  'security-screening':      'Security Screening',
  'liquids-aerosols-gels':   'Liquids, Aerosols & Gels',
  'hand-baggage-size-weight':'Hand Baggage Size & Weight',
  'airport-hub':             'Airport Guide',
  // travel-documents
  'domestic-flight-id':      'Domestic Flight ID',
  'passport':                'Passport',
  'visa-on-arrival':         'Visa on Arrival',
  'oci-card':                'OCI Card',
  'minor-travelling-alone':  'Minors Travelling',
  'international-departure': 'International Travel',
  'emergency-certificate':   'Emergency Certificate',
  // customs
  'duty-free-allowance':     'Duty-Free Allowance',
  'prohibited-items':        'Prohibited Items',
  'gold-jewellery':          'Gold & Jewellery',
  'foreign-currency':        'Foreign Currency',
  'green-red-channel':       'Green / Red Channel',
  'food-items':              'Food Items',
  'electronics':             'Electronics',
};

/** Slug → label, falls back to title-casing the slug. */
export function labelFor(slug: string): string {
  return (
    CATEGORY_LABELS[slug] ??
    SUBCATEGORY_LABELS[slug] ??
    slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  );
}
