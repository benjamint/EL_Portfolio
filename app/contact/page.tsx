import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

const rows: [string, string, string | null][] = [
  ["Email", "bensackey5@gmail.com", "mailto:bensackey5@gmail.com"],
  ["LinkedIn", "linkedin.com/in/mrbenjamint", "https://www.linkedin.com/in/mrbenjamint/"],
  ["Based in", "Accra, Ghana (GMT, UTC+0)", null],
  ["Looking for", "Staff Product Designer roles in London, the EU, Canada and beyond", null],
  ["Visa", "Requires visa sponsorship", null],
];

export default function Contact() {
  return (
    <section className="wrap hero" data-orb="Email is the quickest way to reach Ben.">
      <div className="eyebrow">Contact</div>
      <h1 className="display" style={{ maxWidth: "16ch" }}>Let&rsquo;s talk about your risk and payments work.</h1>
      <p className="lede read">
        The fastest way to reach me is email. I&rsquo;m happy to walk through any case study on a call.
      </p>
      <dl className="contact-list">
        {rows.map(([k, v, href]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>
              {href ? (
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{v}</a>
              ) : (
                v
              )}
            </dd>
          </div>
        ))}
      </dl>
      <div className="hero-actions">
        <a className="btn btn-solid" href="mailto:bensackey5@gmail.com">Email me</a>
        <a className="btn btn-ghost" href="/resume">Resume</a>
      </div>
    </section>
  );
}
