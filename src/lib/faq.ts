// Page-specific FAQs should drive each landing page. The global FAQ collection
// remains available to the dedicated FAQ/resource experience, but conversion
// pages should not be padded to an arbitrary question count with generic copy.
// Keeping this helper preserves one call site/API while removing the old quota.

export interface FaqItem {
  q: string;
  a: string;
}

export async function withFallbackFaqs(pageFaqs: FaqItem[] = []): Promise<FaqItem[]> {
  return pageFaqs;
}
