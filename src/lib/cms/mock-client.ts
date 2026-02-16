import type { CMSClient } from "./client";
import type { Page, SiteNavigation } from "./types";

/* =========================================================================
   Mock Data — used for development before a real CMS is connected
   ========================================================================= */

const pages: Page[] = [
  {
    slug: "/",
    title: "YuLife — Employee Benefits That People Love",
    description:
      "YuLife transforms employee benefits with a fresh approach that rewards healthy living.",
    sections: [
      {
        id: "hero",
        type: "hero",
        blocks: [
          {
            type: "hero",
            heading: "Employee benefits that inspire wellbeing",
            subheading:
              "YuLife transforms employee benefits into a force for good — rewarding your team for healthy habits, every single day.",
            cta: { label: "Get a demo", href: "/contact" },
            secondaryCta: { label: "Learn more", href: "#features" },
          },
        ],
      },
      {
        id: "features",
        type: "cards",
        heading: "Why teams choose YuLife",
        subheading:
          "A benefits platform that employees actually use and love.",
        blocks: [
          {
            type: "card",
            title: "Life Insurance",
            description:
              "Group life insurance designed to protect your people and their families, with built-in wellbeing rewards.",
          },
          {
            type: "card",
            title: "Health & Wellbeing",
            description:
              "From mental health support to fitness challenges, we make it easy for your team to thrive.",
          },
          {
            type: "card",
            title: "Employee Engagement",
            description:
              "Gamified rewards turn healthy habits into real perks — boosting engagement across your organisation.",
          },
        ],
      },
      {
        id: "cta",
        type: "text",
        blocks: [
          {
            type: "text",
            heading: "Ready to transform your benefits?",
            body: "Join hundreds of forward-thinking companies already using YuLife to engage and protect their teams.",
          },
        ],
      },
    ],
  },
  {
    slug: "/products",
    title: "Products — YuLife",
    description: "Explore YuLife's suite of employee benefits products.",
    sections: [
      {
        id: "hero",
        type: "hero",
        blocks: [
          {
            type: "hero",
            heading: "Products designed for modern teams",
            subheading:
              "From life insurance to wellness programs, our products make employee benefits engaging and effective.",
          },
        ],
      },
      {
        id: "products",
        type: "cards",
        heading: "Our Product Suite",
        blocks: [
          {
            type: "card",
            title: "Group Life Insurance",
            description:
              "Comprehensive life cover with instant payouts and built-in wellbeing rewards that make a difference.",
            link: { label: "Learn more", href: "/products/life-insurance" },
          },
          {
            type: "card",
            title: "Critical Illness Cover",
            description:
              "Financial protection when it matters most, with support for over 50 critical conditions.",
            link: { label: "Learn more", href: "/products/critical-illness" },
          },
          {
            type: "card",
            title: "Income Protection",
            description:
              "Safeguard your team's income with comprehensive protection that covers sickness and injury.",
            link: { label: "Learn more", href: "/products/income-protection" },
          },
          {
            type: "card",
            title: "Wellness Platform",
            description:
              "A gamified app that rewards healthy habits with perks your team will actually use.",
            link: { label: "Learn more", href: "/products/wellness" },
          },
        ],
      },
    ],
  },
  {
    slug: "/solutions",
    title: "Solutions — YuLife",
    description: "YuLife solutions tailored to your industry and team size.",
    sections: [
      {
        id: "hero",
        type: "hero",
        blocks: [
          {
            type: "hero",
            heading: "Solutions for every organisation",
            subheading:
              "Whether you're a startup or an enterprise, we have a benefits solution that fits your needs.",
          },
        ],
      },
      {
        id: "solutions",
        type: "cards",
        heading: "Built for Your Industry",
        blocks: [
          {
            type: "card",
            title: "Tech & Startups",
            description:
              "Attract top talent with benefits that reflect your innovative culture and fast-paced environment.",
          },
          {
            type: "card",
            title: "Enterprise",
            description:
              "Scale benefits across thousands of employees with robust admin tools and dedicated support.",
          },
          {
            type: "card",
            title: "SMEs",
            description:
              "Affordable, flexible benefits that grow with your business — no long-term commitments required.",
          },
        ],
      },
    ],
  },
  {
    slug: "/pricing",
    title: "Pricing — YuLife",
    description: "Simple, transparent pricing for YuLife employee benefits.",
    sections: [
      {
        id: "hero",
        type: "hero",
        blocks: [
          {
            type: "hero",
            heading: "Transparent pricing that scales",
            subheading:
              "No hidden fees, no surprises. Just straightforward pricing that works for teams of any size.",
            cta: { label: "Get a quote", href: "/contact" },
          },
        ],
      },
      {
        id: "pricing-cards",
        type: "cards",
        heading: "Choose Your Plan",
        blocks: [
          {
            type: "card",
            title: "Starter",
            description:
              "Perfect for small teams. Includes group life insurance and access to the wellness app. Starting at £3 per employee per month.",
          },
          {
            type: "card",
            title: "Growth",
            description:
              "For growing companies. All Starter features plus critical illness cover and enhanced rewards. Starting at £5 per employee per month.",
          },
          {
            type: "card",
            title: "Enterprise",
            description:
              "For large organisations. Full product suite with dedicated support and custom integrations. Contact us for pricing.",
          },
        ],
      },
    ],
  },
  {
    slug: "/about",
    title: "About — YuLife",
    description: "Learn about YuLife's mission to transform employee benefits.",
    sections: [
      {
        id: "hero",
        type: "hero",
        blocks: [
          {
            type: "hero",
            heading: "Rethinking employee benefits",
            subheading:
              "We believe benefits should inspire people, not just protect them. That's why we built YuLife.",
          },
        ],
      },
      {
        id: "mission",
        type: "text",
        blocks: [
          {
            type: "text",
            heading: "Our Mission",
            body: "YuLife was founded to transform insurance from a grudge purchase into something people love and engage with every day. We combine financial protection with wellness rewards to create benefits that make a real difference.",
          },
        ],
      },
      {
        id: "values",
        type: "cards",
        heading: "Our Values",
        blocks: [
          {
            type: "card",
            title: "People First",
            description:
              "Everything we do starts with understanding what employees and employers truly need.",
          },
          {
            type: "card",
            title: "Innovation",
            description:
              "We challenge the status quo and constantly push boundaries to deliver better experiences.",
          },
          {
            type: "card",
            title: "Impact",
            description:
              "We measure success by the positive impact we have on people's health, happiness, and financial security.",
          },
        ],
      },
    ],
  },
  {
    slug: "/blog",
    title: "Blog — YuLife",
    description: "Insights on employee benefits, wellbeing, and workplace culture.",
    sections: [
      {
        id: "hero",
        type: "hero",
        blocks: [
          {
            type: "hero",
            heading: "Insights & Resources",
            subheading:
              "Expert advice on employee benefits, wellbeing strategies, and building better workplaces.",
          },
        ],
      },
      {
        id: "articles",
        type: "cards",
        heading: "Latest Articles",
        blocks: [
          {
            type: "card",
            title: "5 Ways to Boost Employee Engagement in 2026",
            description:
              "Discover proven strategies to increase engagement and retention in your organisation.",
            link: { label: "Read article", href: "/blog/boost-engagement-2026" },
          },
          {
            type: "card",
            title: "The ROI of Employee Wellbeing Programs",
            description:
              "How investing in wellbeing delivers measurable returns for your business.",
            link: { label: "Read article", href: "/blog/wellbeing-roi" },
          },
          {
            type: "card",
            title: "Understanding Group Life Insurance",
            description:
              "A comprehensive guide to group life insurance and why it matters for your team.",
            link: { label: "Read article", href: "/blog/group-life-guide" },
          },
        ],
      },
    ],
  },
];

const navigation: SiteNavigation = {
  items: [
    { label: "Products", href: "/products" },
    { label: "Solutions", href: "/solutions" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
};

/* =========================================================================
   Mock Client Implementation
   ========================================================================= */

export const mockClient: CMSClient = {
  async getPage(slug: string) {
    return pages.find((p) => p.slug === slug) ?? null;
  },

  async getPages() {
    return pages;
  },

  async getNavigation() {
    return navigation;
  },
};
