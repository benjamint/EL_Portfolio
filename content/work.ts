export type Metric = { value: string; label: string };

export type Decision = { title: string; body: string; tradeoff: string };

export type Section =
  | { kind: "text"; heading: string; body: string[] }
  | { kind: "list"; heading: string; intro?: string; items: string[] }
  | { kind: "decisions"; heading: string; items: Decision[] }
  | { kind: "screen"; id: string; caption: string }
  | { kind: "outcomes"; heading: string; metrics: Metric[]; note?: string; body?: string[] };

export type CaseStudy = {
  slug: string;
  title: string;
  headline: string;
  kicker: string;
  tags: string[];
  summary: string;
  metrics: Metric[];
  metricsLabel?: string;
  meta: { label: string; value: string }[];
  sections: Section[];
  next?: string;
  say?: string;
  preview?: string;
  tone?: string;
  hero?: number;
};

export const work: CaseStudy[] = [
  {
    slug: "merchant-ram",
    preview: "ram-review-queue",
    tone: "green",
    say: "Start here. Risk analysts now run 80%+ of their work in this tool instead of the vendor's portal.",
    title: "Merchant RAM",
    headline: "Moving merchant compliance out of a vendor portal and into one queue",
    kicker: "Peach Payments · 2026",
    tags: ["Internal tools", "KYC / KYB", "AML"],
    summary:
      "Internal tooling for Peach's Risk and Compliance team: onboarding verification, ongoing AML screening, re-KYC/KYB and enforcement, designed so analysts work in Peach rather than in the verification vendor's platform.",
    metrics: [
      { value: "80%+", label: "of risk activities now run in the dashboard" },
      { value: "29% → 44%", label: "merchants cleared automatically" },
      { value: "−56%", label: "onboarding support tickets (127 → 56)" },
      { value: "5.2 → 1.9 days", label: "time in the verification phase" },
    ],
    meta: [
      { label: "Role", value: "Lead product designer" },
      { label: "Team", value: "Product, Compliance, Payments Risk & Onboarding, Engineering, verification vendor" },
      { label: "Surfaces", value: "Internal dashboard, merchant dashboard, email" },
      { label: "Status", value: "Milestone 1 live · Milestone 2 rolling out" },
    ],
    sections: [
      {
        kind: "text",
        heading: "Context",
        body: [
          "Peach Payments onboards small and medium merchants in South Africa, and every one of them has to be verified, screened and kept up to date under local anti-money-laundering rules. Verification ran through a third-party provider. Peach's own team handled everything around it: chasing documents, answering merchants, deciding who could trade.",
          "That split showed up in support. In one four-week period, merchants raised 127 onboarding tickets, and in May onboarding made up 60% of all SME support tickets.",
        ],
      },
      {
        kind: "list",
        heading: "The problem",
        intro: "An analyst opening their day couldn't answer three questions in one place:",
        items: [
          "Which merchants need me today, and why?",
          "What exactly do I need from this merchant, and nothing more?",
          "What happened last time, and who decided?",
        ],
      },
      {
        kind: "list",
        heading: "Constraints",
        items: [
          "Eight entity types, from sole proprietors to trusts, NPCs and closed corporations, each needing different documents.",
          "Daily sanctions, PEP and adverse-media screening for the merchant and up to ten kinds of linked people: directors, UBOs, trustees, settlors and more.",
          "Re-KYC/KYB cycles set by risk rating: every year for high risk, every three for medium, every five for low.",
          "Positive PEP matches need senior-management sign-off; sanctions matches go to Compliance.",
          "Every action, override and reminder must be auditable.",
          "The vendor stays the verification engine. Peach stays the place where people work.",
        ],
      },
      {
        kind: "text",
        heading: "How I worked",
        body: [
          "I ran workshops with Risk, Compliance, Operations, Sales, Product and Engineering to map how a merchant moves from sign-up to trading, and what happens when something changes later. I built the flows as working coded prototypes on our design system, so reviews were about real states and edge cases rather than static frames.",
          "After launch, the team reviewed the same funnel every month in Lightdash: verification rate, retries, time to go live and support volume.",
        ],
      },
      { kind: "screen", id: "ram-pipeline", caption: "Onboarding pipeline. Every merchant's current phase and time in phase, so stuck applications surface on their own." },
      {
        kind: "decisions",
        heading: "Key decisions",
        items: [
          {
            title: "Peach is the workplace; the vendor is the engine",
            body: "Analysts were switching between the vendor's portal, email and our dashboard to close a single case. I designed every queue item to be actionable inside Peach, with case creation, status and closure synced back to the vendor.",
            tradeoff: "Two-way case sync was more engineering work than linking out to the vendor.",
          },
          {
            title: "The queue shows the action, not just the merchant",
            body: "Each row carries the review type, the exact required action (for example UBO verification), whether it was scheduled or triggered, the assignee and how overdue it is. The default view is what needs a person now; the full list of merchants due for review is one filter away.",
            tradeoff: "A narrower default view means less of an overview at a glance.",
          },
          {
            title: "Findings are separate from reviews",
            body: "Registry change detection (a new director on the company registry, an address that no longer matches, drift in beneficial ownership) lands in its own findings list, graded Blocking or Advisory. A finding only asks the merchant for what changed, instead of restarting a full re-KYB.",
            tradeoff: "Two places to look, so each finding links straight to its review.",
          },
          {
            title: "Enforcement is a visible timeline",
            body: "A merchant who doesn't respond moves through a fixed six-week path: notice, three reminders, a final warning, then enforcement such as settlement restrictions or suspension. Analysts can pause, extend or override at any step, but must give a reason.",
            tradeoff: "More states to design, build and test.",
          },
          {
            title: "Every action leaves a trace",
            body: "Screening alerts, risk-rating changes, reminders, suspensions and overrides all write to an audit log with the actor, the before and after values, and the reason.",
            tradeoff: "Extra steps for analysts, which we kept to a single reason field.",
          },
        ],
      },
      { kind: "screen", id: "ram-review-queue", caption: "Review queue. Required action, source and overdue state on every row; default view is what needs a person." },
      { kind: "screen", id: "ram-drawer", caption: "Review detail. What triggered it, what's being requested, and the full audit trail without leaving the queue." },
      { kind: "screen", id: "ram-findings", caption: "Re-verification findings from registry change detection, graded Blocking or Advisory." },
      { kind: "screen", id: "ram-enforcement", caption: "The six-week follow-up path, from first notice to enforcement." },
      {
        kind: "outcomes",
        heading: "Outcomes",
        metrics: [
          { value: "80%+", label: "of risk activities run in the dashboard, across all but one analyst" },
          { value: "29% → 44%", label: "merchants cleared automatically" },
          { value: "127 → 56", label: "onboarding support tickets per four-week period" },
          { value: "60% → 34%", label: "onboarding's share of SME support tickets (May → October)" },
          { value: "5.2 → 1.9 days", label: "time in the verification in-progress phase" },
          { value: "2.21 → 1.33", label: "bank checks per merchant" },
        ],
        note: "Measured in monthly reviews in 2026. Some gains came alongside a switch of verification provider; the design work is what put verification, follow-up and decisions in one place.",
      },
      {
        kind: "list",
        heading: "What's still open",
        items: [
          "Business-address checks still need a retry 48% of the time, and bank verification retries remain high.",
          "Conversion is trending down even as support friction falls. We're adding step-level drop-off tracking so we can see where merchants give up, not only where they retry.",
          "Milestone 2 (ongoing screening, re-KYC/KYB and enforcement) is rolling out, with team training scheduled for November 2026.",
        ],
      },
    ],
    next: "riskops",
  },
  {
    slug: "riskops",
    preview: "risk-fraud-board",
    tone: "rust",
    say: "Fraud tools with three ways to block a bad actor, right where the analyst spots it.",
    title: "RiskOps",
    headline: "One place for risk teams to watch, block and investigate",
    kicker: "Peach Payments · 2026",
    tags: ["Internal tools", "Fraud", "Transaction controls"],
    summary:
      "A RiskOps workspace in Peach's internal dashboard: watchlists, blocklists, confirmed-fraud cases, website compliance and AI support escalations, plus controls to block merchants, accounts and transactions where the risk is spotted.",
    metricsLabel: "Scope",
    metrics: [
      { value: "3", label: "entry points to block or set rules" },
      { value: "5", label: "fraud signal sources in one case list" },
      { value: "6", label: "RiskOps workspaces" },
    ],
    meta: [
      { label: "Role", value: "Lead product designer" },
      { label: "Team", value: "Product, Payments Risk, Compliance, Support, Engineering" },
      { label: "Surfaces", value: "Internal dashboard" },
      { label: "Status", value: "Rolling out in phases, 2026" },
    ],
    sections: [
      {
        kind: "text",
        heading: "Context",
        body: [
          "Fraud signals reach a payment gateway from everywhere: bank alerts, card-scheme fraud reports, customers, merchants and internal checks. At Peach these arrived in different channels, and there was no single view of which merchants were being watched, which were blocked, and why.",
          "Large merchant groups made it worse. A problem sub-merchant could hide inside a bigger merchant's volume.",
        ],
      },
      {
        kind: "decisions",
        heading: "Key decisions",
        items: [
          {
            title: "Block where you notice it",
            body: "Analysts spot risk in three places, so controls live in all three: blocklisting straight from the transactions list (a Peach-only action), rules on a merchant's own risk tab, and a new Transaction Controls page for platform-wide rules.",
            tradeoff: "Three entry points needed one shared rule model and component, so a rule looks and behaves the same wherever it's created.",
          },
          {
            title: "Watch before you block",
            body: "A watchlist for heightened monitoring (elevated chargebacks, unusual payout patterns) sits apart from the blacklist of merchants blocked from processing. Each entry carries a reason and a timestamp.",
            tradeoff: "One more state to manage, in exchange for fewer blocks made on suspicion alone.",
          },
          {
            title: "Fraud cases are a triage flow",
            body: "Confirmed-fraud reports from every source land in one list: New, Investigating, Closed, or merged as Duplicates. Each case shows whether it has been matched to a merchant. Teams can switch between a table and a board, and import scheme reports in bulk.",
            tradeoff: "Two views to maintain; we kept them on the same data and filters.",
          },
          {
            title: "AI first, human on escalation",
            body: "Merchant support starts with an AI assistant. When it can't resolve something, the chat escalates with a stated reason, priority and wait time, and an agent claims it.",
            tradeoff: "The escalation reason had to be specific enough to act on, which meant designing the bot's hand-off message as carefully as the queue.",
          },
        ],
      },
      { kind: "screen", id: "risk-entry-points", caption: "Three entry points, one rule model." },
      { kind: "screen", id: "risk-fraud-board", caption: "Confirmed fraud as a triage board, with source and merchant match on every card." },
      { kind: "screen", id: "risk-support", caption: "Escalated support chats: reason, priority and wait time up front." },
      {
        kind: "outcomes",
        heading: "Outcome",
        metrics: [],
        body: [
          "Risk teams can now see which merchants, accounts and transactions need to be blocked or monitored, in one place. Sub-merchants can no longer hide inside a larger merchant group.",
          "Next, we're instrumenting time-to-block and false positives, so the next round of design is driven by numbers rather than visibility alone.",
        ],
      },
    ],
    next: "embedded-checkout",
  },
  {
    slug: "embedded-checkout",
    preview: "checkout-widget",
    tone: "navy",
    say: "Removing one redirect lifted merchant conversion 17% in the first month.",
    title: "Embedded Checkout",
    headline: "Raising merchant conversion by removing the payment redirect",
    kicker: "Peach Payments · 2024",
    tags: ["Payments", "Checkout", "Mobile"],
    summary:
      "An embedded, merchant-branded checkout that replaces the redirect to a third-party payment page, built for mobile-first shoppers across Peach's markets.",
    metrics: [
      { value: "+17%", label: "merchant conversion in the first month" },
      { value: "−23%", label: "payment drop-offs across partner merchants" },
      { value: "70%", label: "of target merchants integrated within 6 weeks" },
    ],
    meta: [
      { label: "Role", value: "Senior product designer, design lead on the squad" },
      { label: "Team", value: "PM, Engineering manager, QA, Compliance, Merchant success" },
      { label: "Surfaces", value: "Web widget, SDK / iFrame, mobile web" },
      { label: "Status", value: "Live" },
    ],
    sections: [
      {
        kind: "text",
        heading: "Context",
        body: [
          "Many merchants lost customers at the payment step. The old flow redirected shoppers to a separate payment page, which broke trust and caused drop-off, especially on mobile, where about 80% of traffic came from.",
        ],
      },
      {
        kind: "text",
        heading: "Research",
        body: [
          "I reviewed checkout analytics, ran a heuristic review of the redirect flow, and benchmarked embedded checkouts from Stripe, Adyen and Paystack. I interviewed 8 merchants and 12 shoppers. Three themes came out: shoppers didn't want to be redirected, they wanted fewer fields and clear status messages, and merchants wanted the checkout to look like their brand.",
        ],
      },
      {
        kind: "decisions",
        heading: "Key decisions",
        items: [
          {
            title: "Embedded, not redirected",
            body: "Keeping the shopper on the merchant's site kept trust and reduced cognitive load at the riskiest step.",
            tradeoff: "Stricter PCI DSS requirements on the integration, which shaped an SDK and iFrame approach agreed with Compliance.",
          },
          {
            title: "Mobile first",
            body: "With roughly 80% of traffic on mobile, the widget was designed at phone width first, including failure, timeout and retry states.",
            tradeoff: "Less room for long lists of payment methods, solved with merchant-controlled ordering.",
          },
          {
            title: "Merchant branding",
            body: "Merchants control logo, colours and payment-method order, so checkout feels native to their site.",
            tradeoff: "A flexible theming engine took longer to build.",
          },
        ],
      },
      { kind: "screen", id: "checkout-widget", caption: "The embedded widget: branded header, merchant-ordered payment methods, trust footer." },
      {
        kind: "outcomes",
        heading: "Outcomes",
        metrics: [
          { value: "+17%", label: "merchant conversion in the first month" },
          { value: "−23%", label: "payment drop-offs" },
          { value: "70%", label: "of target merchants integrated within 6 weeks" },
        ],
      },
    ],
    next: "float-card",
  },
  {
    slug: "float-card",
    hero: 1,
    preview: "float-card",
    tone: "ink",
    say: "A credit card instead of a cash loan, so small businesses spend credit on what it was approved for.",
    title: "Float virtual card",
    headline: "Replacing cash loans with credit at the point of purchase",
    kicker: "Float (YC) · 2021",
    tags: ["Credit", "Cards", "0 → 1"],
    summary:
      "A credit-backed virtual card for SMEs in Ghana and Nigeria, so businesses spend credit on what it was approved for, rather than receiving a cash loan.",
    metrics: [
      { value: "70+", label: "SMEs interviewed in Ghana and Nigeria" },
      { value: "70%", label: "active use among approved SMEs in 3 months" },
      { value: "30%", label: "faster business transactions than cash credit" },
    ],
    meta: [
      { label: "Role", value: "Product design lead" },
      { label: "Team", value: "Product, Risk, Compliance, Engineering, card-issuing partners" },
      { label: "Surfaces", value: "Web app" },
      { label: "Status", value: "Launched 2021" },
    ],
    sections: [
      {
        kind: "text",
        heading: "Context",
        body: [
          "Float lent working capital to SMEs and faced rising defaults, especially in Nigeria, where borrowed cash was often spent on something other than its stated purpose. Once the money was disbursed, nobody could see where it went.",
          "Interviews with more than 70 SMEs confirmed it: businesses borrowed for one thing and spent on another, owners lacked tools to track spending, and trust in traditional finance was low.",
        ],
      },
      {
        kind: "decisions",
        heading: "Key decisions",
        items: [
          {
            title: "Credit at the point of need",
            body: "Instead of a lump sum, approved businesses get a virtual card with spending limits, so credit is used at the moment of a genuine business purchase.",
            tradeoff: "Card issuing, KYC and PCI DSS added partner dependencies we had to design around.",
          },
          {
            title: "Instant issuance",
            body: "Approved SMEs could create a card and start spending within minutes of onboarding, with limits set per card.",
            tradeoff: "Limits and controls had to be simple enough for owners, strict enough for Risk.",
          },
        ],
      },
      { kind: "screen", id: "float-card", caption: "Card creation: who it's for, spending limit type and limit, issued in minutes." },
      {
        kind: "list",
        heading: "Beyond the product",
        items: [
          "Introduced design sprints and critiques: design delivery time fell 40%.",
          "Set up a research repository and merchant interview framework.",
          "Designed an MVP validation framework that cut time-to-market for new features by 30%.",
        ],
      },
    ],
    next: "merchant-ram",
  },
];

export const built = [
  {
    name: "Kuukup",
    say: "Book a private chef in Ghana. Ben designed and built it solo.",
    url: "https://www.kuukup.com/",
    image: "/images/kuukup.jpg",
    line: "A marketplace to book a private chef, order chef-made meals and join chef-hosted dinners. An idea I took from concept to a working product on my own, from product definition through design and build.",
    tags: ["Marketplace", "Solo build"],
  },
  {
    name: "Glowy",
    say: "A home for women founders in beauty and wellness, with an AI business advisor built in.",
    url: "https://www.gloowy.org/",
    image: "/images/glowy.jpg",
    line: "A home for ambitious African women founders in beauty and wellness: a founder community, expert mentorship, an AI business advisor and business learning, plus portfolio profiles and booking requests. Built with React and Supabase.",
    tags: ["Community", "Marketplace", "Solo build"],
  },
  {
    name: "Peach design system",
    say: "Every frontend engineer at Peach builds with this system.",
    url: null as string | null,
    image: "/images/design-system.jpg" as string | null,
    line: "A multi-product design system now in the codebase and used by every frontend engineer, codified as AI context so the team generates on-system UI in Claude, Cursor and Figma Make.",
    tags: ["Design systems", "AI workflow"],
  },
];

export function getCase(slug: string) {
  return work.find((w) => w.slug === slug);
}
