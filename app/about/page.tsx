import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

const roles = [
  ["Peach Payments", "Senior Product Designer", "2022 – now"],
  ["Vitara", "Consultant", "Ghana · Netherlands"],
  ["Digital BECE exam platform, WAEC Ghana", "Product & Design Consultant", "2023 – 2025"],
  ["Float (YC)", "Product Design Lead", "2020 – 2021"],
  ["Farmerline", "Design Lead", "2019 – 2020"],
  ["Hubtel", "Senior Product Designer", "2016 – 2019"],
  ["Esoko", "Product Designer", "2013 – 2016"],
  ["Business Ghana", "Frontend Engineer", "2010 – 2013"],
];

const principles = [
  ["Design the unseen side", "Most risk in fintech is handled by people working queues. I treat analysts and agents as users with the same care as customers."],
  ["Prototype in code", "I build working prototypes on the design system, so reviews are about real states, edge cases and data, not static frames."],
  ["Ask only for what you need", "In compliance, every extra field costs a merchant time and the business money. I push for the narrowest request that satisfies the rule."],
  ["Measure, then say what's still broken", "I review the numbers monthly and write down what didn't work, not only what did."],
];

export default function About() {
  return (
    <>
      <section className="wrap hero" data-orb="The longer story: ten years of design in African fintech and agritech.">
        <div className="eyebrow">About</div>
        <h1 className="display" style={{ maxWidth: "18ch" }}>Ten years designing money for people the system often misses.</h1>
        <div className="read">
          <p className="lede">
            I&rsquo;m Benjamin Sackey, a product designer based in Accra. I&rsquo;ve spent my career in African fintech and
            agritech, at Hubtel, Float, Farmerline and now Peach Payments, where I design merchant checkout, onboarding, and
            the compliance and fraud tools our risk team uses every day.
          </p>
          <p className="lede">
            I started as a frontend engineer, and I still build: our design system lives in the codebase and is used by
            every frontend engineer at Peach, and I&rsquo;ve made AI-assisted prototyping the team default. I also mentor
            designers and product managers, and consult for Vitara, an agri-supply-chain company.
          </p>
          <p className="lede">I&rsquo;m open to Staff Product Designer roles in London, the EU, Canada and beyond, and will need visa sponsorship.</p>
        </div>
      </section>

      <section className="wrap section" style={{ paddingTop: 0 }}>
        <div className="about-grid">
          <div>
            <h2 className="h2" style={{ marginBottom: 24 }}>How I work</h2>
            <div className="decisions">
              {principles.map(([t, b], i) => (
                <div className="decision" key={t}>
                  <div className="decision-n">{String(i + 1).padStart(2, "0")}</div>
                  <div><h3 style={{ fontSize: 21 }}>{t}</h3><p className="muted" style={{ margin: 0 }}>{b}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="h2" style={{ marginBottom: 24 }}>Experience</h2>
            <ul className="timeline">
              {roles.map(([co, r, d]) => (
                <li key={co}><span><b style={{ fontWeight: 500 }}>{co}</b><br /><span className="muted">{r}</span></span><span className="when">{d}</span></li>
              ))}
            </ul>
            <div className="hero-actions">
              <a className="btn btn-solid" href="/resume">Resume</a>
              <a className="btn btn-ghost" href="mailto:bensackey5@gmail.com">Email me</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
