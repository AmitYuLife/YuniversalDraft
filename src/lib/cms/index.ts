/**
 * CMS public API.
 *
 * Usage in server components / route handlers:
 *
 *   import { getCMSClient } from "@/lib/cms";
 *   const cms = await getCMSClient();
 *   const page = await cms.getPage("/");
 */

export { getCMSClient } from "./client";
export type { CMSClient } from "./client";
export type {
  Page,
  Section,
  ContentBlock,
  HeroBlock,
  CardBlock,
  TextBlock,
  CMSImage,
  CMSLink,
  NavItem,
  SiteNavigation,
} from "./types";
