// Typed mirror of vercel.json's `redirects` array, per Build Spec Section 8
// ("Keep src/data/redirects.ts as a typed mirror so a build-time script can
// diff the two and fail CI if they drift apart"). The diff/CI script itself
// is not part of this scaffolding phase.
//
// Source: SAGE_Local_SEO_Site_Architecture_Complete.pdf, Section E
// ("Developer Handoff JSON" -> legacy_redirects). That JSON code block is
// truncated in the source PDF itself (confirmed via raw pdftotext
// extraction, not just page rendering) for several entries' destinations
// and/or status codes. Per user decision, truncated-beyond-recovery
// entries are omitted here rather than guessed at:
//
// - /mental-health-therapy-counseling-san-bernardino — source has
//   "to": null, an unusable redirect target.
// - /carole-patterson — doc's own Wave-0 blocker list (item 4) says this
//   URL's disposition "needs Kristin's direct input, not an SEO default";
//   the note field is also truncated.
// - /therapists-of-san-diego-blog/ptsd and
//   /sage-therapy-center-recent-updates/ptsd — both destinations truncate
//   to "/blog/coping-with-" with no way to recover the exact slug. The
//   doc's cannibalization table (Section D) says these are duplicate PTSD
//   content that must resolve to ONE canonical /blog/{slug}/ — same
//   category of unresolved gap, same treatment.
//
// All four are tracked as CONFIRM items in the Phase B report, not
// silently dropped.

export interface LegacyRedirect {
  source: string;
  destination: string;
  permanent: boolean;
}

export const legacyRedirects: LegacyRedirect[] = [
  { source: '/mental-health-therapy-counseling-encinitas', destination: '/encinitas/', permanent: true },
  { source: '/mental-health-therapy-counseling-encinitas/', destination: '/encinitas/', permanent: true },
  { source: '/mental-health-therapy-counseling-san-marcos', destination: '/san-marcos/', permanent: true },
  { source: '/mental-health-therapy-counseling-san-marcos/', destination: '/san-marcos/', permanent: true },
  { source: '/mental-health-therapy-counseling-san-diego', destination: '/carlsbad/', permanent: true },
  { source: '/mental-health-therapy-counseling-san-diego/', destination: '/carlsbad/', permanent: true },
  { source: '/mental-health-therapy-counseling-oceanside', destination: '/oceanside/', permanent: true },
  { source: '/mental-health-therapy-counseling-oceanside/', destination: '/oceanside/', permanent: true },
  { source: '/mental-health-therapy-counseling-vista', destination: '/vista/', permanent: true },
  { source: '/mental-health-therapy-counseling-vista/', destination: '/vista/', permanent: true },
  { source: '/mental-health-therapy-counseling-del-mar', destination: '/del-mar/', permanent: true },
  { source: '/mental-health-therapy-counseling-solana-beach', destination: '/solana-beach/', permanent: true },
  { source: '/mental-health-therapy-counseling-san-clemente', destination: '/', permanent: true },
  { source: '/mental-health-therapy-counseling-carmel-valley', destination: '/carlsbad/', permanent: true },
  { source: '/mental-health-therapy-counseling-escondido', destination: '/carlsbad/', permanent: true },
  { source: '/services/individual-therapy', destination: '/services/individual-therapy/', permanent: true },
  { source: '/services/teen-counseling', destination: '/services/teen-counseling/', permanent: true },
  {
    source: '/services/pre-marital-marriage-counseling',
    destination: '/services/premarital-marriage-counseling/',
    permanent: true,
  },
  { source: '/services/parenting-family-therapy', destination: '/services/family-therapy/', permanent: true },
  { source: '/specialties', destination: '/services/', permanent: true },
  { source: '/meet-kristin', destination: '/about/', permanent: true },
  {
    source: '/therapists-of-san-diego-kristin-mooreheadmalley',
    destination: '/about/',
    permanent: true,
  },
  { source: '/schedule-a-session', destination: '/schedule-a-session/', permanent: true },
  { source: '/testimonials', destination: '/about/#testimonials', permanent: true },
  { source: '/office-pics', destination: '/contact/', permanent: true },
  { source: '/sage-therapy-center-office-pics', destination: '/contact/', permanent: true },
  { source: '/sage-therapy-center-blog', destination: '/blog/', permanent: true },
  { source: '/therapists-of-san-diego-approach', destination: '/about/', permanent: true },
  { source: '/28daysofselflove', destination: '/resources/28-days-of-self-love/', permanent: true },
];
