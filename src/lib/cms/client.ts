import type { Page, SiteNavigation } from "./types";

/**
 * CMS Client Interface
 *
 * Any headless CMS adapter must implement this interface.
 * The factory function below returns the active implementation
 * based on environment configuration.
 */
export interface CMSClient {
  /** Fetch a single page by its slug */
  getPage(slug: string): Promise<Page | null>;

  /** Fetch all pages (for static generation / sitemap) */
  getPages(): Promise<Page[]>;

  /** Fetch global site navigation */
  getNavigation(): Promise<SiteNavigation>;
}

/**
 * Returns the active CMS client.
 *
 * Reads CMS_PROVIDER from environment to decide which adapter to use.
 * Defaults to the mock client for local development.
 *
 * To add a new CMS:
 *   1. Create `src/lib/cms/<provider>-client.ts` implementing CMSClient
 *   2. Add a case here
 *   3. Set CMS_PROVIDER=<provider> in .env
 */
export async function getCMSClient(): Promise<CMSClient> {
  const provider = process.env.CMS_PROVIDER ?? "mock";

  switch (provider) {
    // Future implementations:
    // case "contentful":
    //   return (await import("./contentful-client")).contentfulClient;
    // case "sanity":
    //   return (await import("./sanity-client")).sanityClient;

    case "mock":
    default: {
      const { mockClient } = await import("./mock-client");
      return mockClient;
    }
  }
}
