// Page-specific FAQs should drive the section. Global FAQs are only used
// as a light fallback when a page has too little practical information to
// make the accordion useful; we do not force every interior page to five
// questions because that creates repetitive filler across templates.
import { getCollection } from 'astro:content';

export interface FaqItem {
  q: string;
  a: string;
}

export const MIN_FAQS = 3;

export async function withFallbackFaqs(pageFaqs: FaqItem[] = []): Promise<FaqItem[]> {
  if (pageFaqs.length >= MIN_FAQS) return pageFaqs;

  const globalFaqs = await getCollection('faq');
  const existingQuestions = new Set(pageFaqs.map((f) => f.q));
  const fallbacks = globalFaqs
    .map((entry) => ({ q: entry.data.q, a: entry.data.a }))
    .filter((f) => !existingQuestions.has(f.q));

  const merged = [...pageFaqs];
  for (const fallback of fallbacks) {
    if (merged.length >= MIN_FAQS) break;
    merged.push(fallback);
  }
  return merged;
}
