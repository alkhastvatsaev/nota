import type { FaqItem } from "./faq";

export type LandingSection = {
  h2: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: string[];
};

export type LandingPageContent = {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  sections: LandingSection[];
  faq: FaqItem[];
  showProductGallery?: boolean;
};
