import { EDUCATION } from "@/data/education";
import { PROFILE } from "@/data/profile";
import { SITE } from "@/data/site";
import { SOCIAL_LINKS } from "@/data/social";
import { WORK_EXPERIENCE } from "@/data/work";

/**
 * A JSON-LD node is an open-ended object keyed by Schema.org terms. We keep the
 * type loose on purpose — modelling the full Schema.org vocabulary isn't worth
 * a dependency here — but every builder below returns this shape.
 */
type JsonLdNode = Record<string, unknown>;

const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;

// `sameAs` wants web URLs, so mailto links (which aren't `external`) are dropped.
const sameAs = SOCIAL_LINKS.filter((link) => link.external).map((link) => link.href);

const currentRole = WORK_EXPERIENCE.find((job) => "current" in job && job.current);

const person: JsonLdNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: PROFILE.fullName,
  givenName: PROFILE.firstName,
  familyName: PROFILE.lastName,
  url: SITE.url,
  image: new URL(PROFILE.avatar.src, SITE.url).toString(),
  jobTitle: SITE.jobTitle,
  description: SITE.description,
  sameAs,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressCountry: SITE.country,
  },
  knowsAbout: SITE.keywords,
  ...(currentRole && {
    worksFor: { "@type": "Organization", name: currentRole.company },
  }),
  alumniOf: EDUCATION.map((entry) => ({
    "@type": "EducationalOrganization",
    name: entry.institution,
  })),
};

const website: JsonLdNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: SITE.lang,
  publisher: { "@id": PERSON_ID },
};

export const structuredData: JsonLdNode = {
  "@context": "https://schema.org",
  "@graph": [person, website],
};
