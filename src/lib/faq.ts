// Tops up a page's own FAQ list with entries from the global `faq` content
// collection (general therapy process, superbill/insurance, session
// logistics — src/content/faq/) so no interior page renders with fewer
// than MIN_FAQS. Page-specific FAQs always come first and are never
// dropped; fallbacks fill in behind them, skipping any question the page
// already asks verbatim.
import { getCollection } from 'astro:content';

export interface FaqItem {
  q: string;
  a: string;
}

export const MIN_FAQS = 5;

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
