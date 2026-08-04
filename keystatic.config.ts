import { config, fields, collection } from '@keystatic/core';

// Every collection here mirrors src/content.config.ts field-for-field.
// The one deliberate addition is `entryId` (fields.slug) on each
// collection: Keystatic's `collection()` requires slugField to reference
// a field built with fields.slug(), which stores `{ name, slug }` — a
// shape our Zod schemas (Build Spec Section 4, followed exactly) do not
// define. Zod strips unrecognized frontmatter keys by default, so
// `entryId` never reaches the validated content data; it exists purely
// so the Keystatic UI can generate/rename filenames. See Phase B report
// for this call-out — it's the one place the two source docs didn't
// anticipate a CMS-tooling constraint.
const entryId = fields.slug({ name: { label: 'Keystatic entry name (controls filename only)' } });

export default config({
  storage: { kind: 'local' },
  collections: {
    services: collection({
      label: 'Services',
      slugField: 'entryId',
      path: 'src/content/services/*',
      format: { contentField: 'body' },
      schema: {
        entryId,
        title: fields.text({ label: 'Title' }),
        slug: fields.text({ label: 'Slug' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Core', value: 'core' },
            { label: 'Concern-led', value: 'concern-led' },
          ],
          defaultValue: 'core',
        }),
        primaryTarget: fields.text({ label: 'Primary Target' }),
        mustNotCompeteFor: fields.text({
          label: 'Must Not Compete For (dev reference only, not rendered)',
        }),
        relatedServices: fields.multiRelationship({
          label: 'Related Services (2-4 per SEO doc internal link plan)',
          collection: 'services',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        faq: fields.array(
          fields.object({
            q: fields.text({ label: 'Question' }),
            a: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'Page-specific FAQ', itemLabel: (props) => props.fields.q.value || 'FAQ item' }
        ),
        body: fields.markdoc({ label: 'Body', extension: 'md' }),
      },
    }),

    cities: collection({
      label: 'Cities',
      slugField: 'entryId',
      path: 'src/content/cities/*',
      format: { contentField: 'body' },
      schema: {
        entryId,
        name: fields.text({ label: 'Name' }),
        slug: fields.text({ label: 'Slug' }),
        hasOffice: fields.checkbox({ label: 'Has Office', defaultValue: false }),
        primaryTarget: fields.text({ label: 'Primary Target' }),
        secondaryTargets: fields.array(fields.text({ label: 'Secondary Target' }), {
          label: 'Secondary Targets',
          itemLabel: (props) => props.value || 'Target',
        }),
        approvedCityServices: fields.multiRelationship({
          label: 'Approved City/Service Pages',
          collection: 'services',
        }),
        nearbyCities: fields.multiRelationship({
          label: 'Nearby Cities',
          collection: 'cities',
        }),
        neighborhoods: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            blurb: fields.text({ label: 'Blurb', multiline: true }),
          }),
          {
            label: 'Neighborhoods (sections on this hub only — never their own route)',
            itemLabel: (props) => props.fields.name.value || 'Neighborhood',
          }
        ),
        body: fields.markdoc({ label: 'Body', extension: 'md' }),
      },
    }),

    'city-services': collection({
      label: 'City/Service Pages (launch matrix only — do not add gated combinations)',
      slugField: 'entryId',
      path: 'src/content/city-services/*',
      format: { contentField: 'body' },
      schema: {
        entryId,
        city: fields.relationship({ label: 'City', collection: 'cities', validation: { isRequired: true } }),
        service: fields.relationship({
          label: 'Service',
          collection: 'services',
          validation: { isRequired: true },
        }),
        minWordCount: fields.integer({ label: 'Minimum Word Count', defaultValue: 600 }),
        uniqueContentPercent: fields.integer({ label: 'Unique Content %', defaultValue: 35 }),
        faq: fields.array(
          fields.object({
            q: fields.text({ label: 'Question' }),
            a: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'Page-specific FAQ', itemLabel: (props) => props.fields.q.value || 'FAQ item' }
        ),
        body: fields.markdoc({ label: 'Body', extension: 'md' }),
      },
    }),

    testimonials: collection({
      label: 'Testimonials',
      slugField: 'entryId',
      path: 'src/content/testimonials/*',
      format: { data: 'yaml' },
      schema: {
        entryId,
        quote: fields.text({ label: 'Quote', multiline: true }),
        attribution: fields.text({ label: 'Attribution' }),
        city: fields.relationship({ label: 'City (optional)', collection: 'cities' }),
        permissioned: fields.checkbox({
          label: 'Permissioned (must be true to ever render — do not flip without written permission)',
          defaultValue: false,
        }),
      },
    }),

    faq: collection({
      label: 'FAQ (global pool)',
      slugField: 'entryId',
      path: 'src/content/faq/*',
      format: { data: 'yaml' },
      schema: {
        entryId,
        q: fields.text({ label: 'Question' }),
        a: fields.text({ label: 'Answer', multiline: true }),
      },
    }),

    blog: collection({
      label: 'Blog',
      slugField: 'entryId',
      path: 'src/content/blog/*',
      format: { contentField: 'body' },
      schema: {
        entryId,
        title: fields.text({ label: 'Title' }),
        slug: fields.text({ label: 'Slug' }),
        publishDate: fields.date({ label: 'Publish Date' }),
        primaryService: fields.relationship({
          label: 'Primary Service',
          collection: 'services',
          validation: { isRequired: true },
        }),
        primaryLocalPage: fields.text({ label: 'Primary Local Page (route)' }),
        conversionPage: fields.text({ label: 'Conversion Page (route)' }),
        body: fields.markdoc({ label: 'Body', extension: 'md' }),
      },
    }),
  },
});
