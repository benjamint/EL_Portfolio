export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  role: string;
  period: string;
  color: string;
  image: string;
  tags: string[];
  
  // Master Prompt Structure
  impact: {
    label: string;
    value: string;
  }[];
  overview: {
    role: string;
    scope: string;
    team: string;
    context: string;
  };
  problem: string[];
  goal: string[];
  myRole: string[];
  keyInsight: string[];
  solution: string[];
  keyDecisions: {
    title: string;
    why: string;
    tradeoff: string;
  }[];
  execution: string[];
  outcome: string[];
  reflection: string;
  link?: {
    label: string;
    url: string;
  };
  pdfLink?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "embedded-checkout",
    title: "Embedded Checkout",
    subtitle: "Increasing Conversion by Eliminating Redirect Friction",
    company: "Peach Payments",
    role: "Senior Product Designer",
    period: "2022 - Present",
    color: "#f97316",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=1200",
    tags: ["Fintech", "Payments"],
    
    impact: [
      { label: "Conversion", value: "+17%" },
      { label: "Drop-off", value: "23%" },
      { label: "Adoption", value: "70%" }
    ],
    overview: {
      role: "Senior Product Designer",
      scope: "Checkout redesign (0 → MVP → launch)",
      team: "PM, Engineering, Compliance",
      context: "Leading payment gateway in Africa"
    },
    problem: [
      "Redirect-based checkout reduced trust.",
      "High abandonment rates during payment.",
      "Poor mobile experience on legacy pages."
    ],
    goal: [
      "Create a seamless embedded checkout experience.",
      "Restore user trust through brand consistency.",
      "Optimize for mobile-first users."
    ],
    myRole: [
      "Led design direction.",
      "Facilitated stakeholder alignment.",
      "Defined MVP scope."
    ],
    keyInsight: [
      "Users abandon when redirected—trust breaks instantly."
    ],
    solution: [
      "Embedded checkout with no redirects.",
      "Multi-payment support and merchant branding.",
      "Real-time validation for faster checkout."
    ],
    keyDecisions: [
      {
        title: "Embedded vs Redirect",
        why: "To maintain brand trust and reduce cognitive load during payment.",
        tradeoff: "Stricter PCI compliance requirements for the merchant integration."
      },
      {
        title: "Mobile-first design",
        why: "80% of African e-commerce traffic originates from mobile devices.",
        tradeoff: "Limited screen real estate for complex payment method selections."
      },
      {
        title: "Custom branding",
        why: "To ensure the checkout feels like a native part of the merchant's site.",
        tradeoff: "Increased development time to build a flexible styling engine."
      }
    ],
    execution: [
      "Interviews (merchants + users).",
      "Rapid iteration.",
      "Lean UX cycles."
    ],
    outcome: [
      "Higher conversion.",
      "Faster merchant integration.",
      "Improved trust."
    ],
    reflection: "Trust is the most critical UX factor in payments",
    link: {
      label: "Visit Peach Payments",
      url: "https://www.peachpayments.com/products/embedded-checkout/"
    },
    pdfLink: "https://drive.google.com/file/d/1-F-D21h91OfHJf32VrXMzVESpKi0_kGb/view",
    seo: {
      title: "Embedded Checkout Case Study | Benjamin Sackey",
      description: "A deep dive into the redesign of Peach Payments' checkout experience, increasing conversion by 17% through seamless embedded payments.",
      keywords: ["Checkout Design", "Payment UX", "Conversion Optimization", "Fintech Design", "African E-commerce", "Benjamin Sackey"]
    }
  },
  {
    id: "float-virtual-card",
    title: "Float Virtual Card",
    subtitle: "Reducing Credit Default Through Controlled Spending",
    company: "Float (YC-backed)",
    role: "Product Design Lead",
    period: "2021 - 2022",
    color: "#eab308",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200",
    tags: ["Fintech", "Credit"],
    
    impact: [
      { label: "Utilization", value: "70%" },
      { label: "Speed", value: "30%" },
      { label: "Up Repayment", value: "90%" }
    ],
    overview: {
      role: "Product Design Lead",
      scope: "0 → 1 credit system redesign",
      team: "Product, Engineering, Risk, Compliance",
      context: "YC-backed fintech scaling in Africa"
    },
    problem: [
      "SMEs received cash loans that were misused.",
      "Funds were hard to track after disbursement.",
      "High risk for default due to lack of visibility."
    ],
    goal: [
      "Create a credit system that controls usage.",
      "Reduce default risk through spending discipline.",
      "Maintain transaction speed for SMEs."
    ],
    myRole: [
      "Led product design end-to-end.",
      "Defined system direction with stakeholders.",
      "Built research and validation processes."
    ],
    keyInsight: [
      "Credit failure was not access—it was lack of control at point of use."
    ],
    solution: [
      "Virtual credit card system.",
      "Spend only at transaction level.",
      "Real-time tracking and controlled usage."
    ],
    keyDecisions: [
      {
        title: "Replace cash with controlled credit",
        why: "To ensure borrowed funds are spent on business-critical needs.",
        tradeoff: "Slightly higher friction for users accustomed to cash liquidity."
      },
      {
        title: "Issue credit at transaction level",
        why: "To prevent lump-sum misuse and improve risk scoring accuracy.",
        tradeoff: "Requires real-time authorization logic which increases engineering complexity."
      },
      {
        title: "Build real-time visibility",
        why: "To restore trust between lenders and borrowers through transparency.",
        tradeoff: "Significant investment in backend infrastructure for live data syncing."
      }
    ],
    execution: [
      "70+ SME interviews.",
      "JTBD framework.",
      "Rapid prototyping.",
      "Cross-functional collaboration."
    ],
    outcome: [
      "Reduced misuse.",
      "Improved repayment.",
      "Scalable credit model."
    ],
    reflection: "System design > UI design in fintech",
    link: {
      label: "Visit Float",
      url: "https://linktr.ee/floatglobal"
    },
    pdfLink: "https://drive.google.com/file/d/1-F-D21h91OfHJf32VrXMzVESpKi0_kGb/view",
    seo: {
      title: "Float Virtual Card Case Study | Benjamin Sackey",
      description: "How Benjamin Sackey designed a virtual credit card system for Float to reduce SME credit default through controlled spending and real-time tracking.",
      keywords: ["Product Design", "Fintech UX", "Credit Systems", "SME Finance", "Virtual Cards", "Benjamin Sackey"]
    }
  },
  {
    id: "mergdata",
    title: "Mergdata",
    subtitle: "Digitizing Agricultural Supply Chains",
    company: "Mergdata",
    role: "Product Design Consultant",
    period: "2020 - 2021",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200",
    tags: ["Agtech", "Data Infra", "SaaS"],
    
    impact: [
      { label: "Reach", value: "100k+" },
      { label: "Global", value: "50+" },
      { label: "Partners", value: "3k+" }
    ],
    overview: {
      role: "Product Design Consultant",
      scope: "SaaS platform for agricultural operations",
      team: "Product, Engineering, Field Agents, Stakeholders",
      context: "Platform used by governments, NGOs, and agribusinesses"
    },
    problem: [
      "Manual, paper-based processes in agricultural systems.",
      "Lack of farmer visibility and traceability.",
      "Poor data sharing across the supply chain.",
      "Limited access to finance, inputs, and insights."
    ],
    goal: [
      "Digitize field operations end-to-end.",
      "Make farmer data accessible and actionable.",
      "Enable traceability across the supply chain.",
      "Work in low-connectivity, real-world environments."
    ],
    myRole: [
      "Consulted on product design and system structure.",
      "Simplified complex workflows for data collection and profiling.",
      "Designed for field agents and enterprise stakeholders."
    ],
    keyInsight: [
      "Designing for offline-first environments and low digital literacy.",
      "Need for simplicity, accessibility, and trust in fragmented supply chains."
    ],
    solution: [
      "Modular SaaS platform with tools for profiling, traceability, and finance.",
      "Integrated land monitoring, input sourcing, and remote advisory.",
      "Unified ecosystem for agricultural intelligence."
    ],
    keyDecisions: [
      {
        title: "Offline-first design",
        why: "To enable usage in remote areas with unreliable connectivity.",
        tradeoff: "Increased data sync complexity and potential for version conflicts."
      },
      {
        title: "Modular system architecture",
        why: "To allow different stakeholders to use only the tools relevant to them.",
        tradeoff: "Higher maintenance overhead for multiple interconnected modules."
      },
      {
        title: "Farmer-centric data model",
        why: "To improve traceability and data integrity by rooting everything in real-world workflows.",
        tradeoff: "Requires more upfront data validation which can slow down onboarding."
      },
      {
        title: "Multi-channel communication",
        why: "To address literacy and accessibility challenges through voice and AI.",
        tradeoff: "Significant investment in natural language processing and voice tech infrastructure."
      }
    ],
    execution: [
      "Designed workflows for field data collection and farmer onboarding.",
      "Collaborated with field agents for ground reality validation.",
      "Balanced simplicity vs system complexity and offline constraints."
    ],
    outcome: [
      "Improved operational efficiency and visibility into supply chains.",
      "Enabled organizations to track impact and ensure compliance.",
      "Built a foundational data infrastructure layer for agriculture."
    ],
    reflection: "Designing for the 'real world' requires offline thinking and infrastructure-level design.",
    link: {
      label: "Visit Mergdata",
      url: "https://mergdata.com"
    },
    pdfLink: "https://drive.google.com/file/d/1-F-D21h91OfHJf32VrXMzVESpKi0_kGb/view",
    seo: {
      title: "Mergdata Agricultural Supply Chain Case Study | Benjamin Sackey",
      description: "Digitizing agricultural supply chains in low-connectivity environments. Benjamin Sackey's work on Mergdata's SaaS platform for agribusinesses.",
      keywords: ["Agtech Design", "SaaS UX", "Supply Chain Digitization", "Offline-first Design", "Data Infrastructure", "Benjamin Sackey"]
    }
  }
];
