// Presentational only — maps each service slug to a Lucide icon name for
// ServiceGrid cards. Not content data (nothing here is rendered as copy),
// so it lives alongside the other plain data files rather than in the
// content collections.
export const serviceIcons: Record<string, string> = {
  'individual-therapy': 'lucide:user-round',
  'couples-counseling': 'lucide:heart',
  'family-therapy': 'lucide:users',
  'teen-counseling': 'lucide:backpack',
  'premarital-marriage-counseling': 'lucide:heart-handshake',
  'emdr-therapy': 'lucide:eye',
  'abuse-support': 'lucide:shield',
  'addiction-counseling': 'lucide:life-buoy',
  'anger-management': 'lucide:flame',
  'anxiety-therapy': 'lucide:wind',
  'grief-counseling': 'lucide:cloud-rain',
  'depression-therapy': 'lucide:sun',
  'divorce-separation-counseling': 'lucide:split',
  'eating-disorder-support': 'lucide:heart-pulse',
  'holistic-therapy': 'lucide:leaf',
  'lgbtq-affirming-therapy': 'lucide:rainbow',
  'personal-growth-therapy': 'lucide:sprout',
  'sex-therapy': 'lucide:flower-2',
  'stress-management': 'lucide:waves',
  'trauma-ptsd-therapy': 'lucide:shield-check',
};

export const defaultServiceIcon = 'lucide:sparkles';
