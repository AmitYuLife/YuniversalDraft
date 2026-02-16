/**
 * CMS Content Models — CMS-agnostic type definitions.
 *
 * These interfaces describe the shape of content regardless of
 * which headless CMS (Contentful, Sanity, Storyblok, etc.) is used.
 * Each CMS adapter transforms its native response into these types.
 */

/* =========================================================================
   Shared / Utility Types
   ========================================================================= */

export interface CMSImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CMSLink {
  label: string;
  href: string;
  external?: boolean;
}

/* =========================================================================
   Block Types — individual content blocks composable within sections
   ========================================================================= */

export interface HeroBlock {
  type: "hero";
  heading: string;
  subheading?: string;
  image?: CMSImage;
  cta?: CMSLink;
  secondaryCta?: CMSLink;
}

export interface CardBlock {
  type: "card";
  title: string;
  description: string;
  image?: CMSImage;
  link?: CMSLink;
}

export interface TextBlock {
  type: "text";
  heading?: string;
  body: string;
}

export type ContentBlock = HeroBlock | CardBlock | TextBlock;

/* =========================================================================
   Section Types — page-level groupings of blocks
   ========================================================================= */

export interface Section {
  id: string;
  type: string;
  heading?: string;
  subheading?: string;
  blocks: ContentBlock[];
}

/* =========================================================================
   Page Type — top-level document
   ========================================================================= */

export interface Page {
  slug: string;
  title: string;
  description?: string;
  sections: Section[];
}

/* =========================================================================
   Navigation
   ========================================================================= */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SiteNavigation {
  items: NavItem[];
}
