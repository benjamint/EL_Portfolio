import Link from "next/link";

export function Nav() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand" data-say="That's me. Ben Sackey, product designer in Accra.">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-mark" src="/images/ben.jpg" alt="" width={40} height={40} />
          <span>Benjamin Sackey</span>
        </Link>
        <nav className="pillnav" aria-label="Main">
          <Link href="/" data-nav="home">Home</Link>
          <Link href="/#work" data-nav="work">Work</Link>
          <Link href="/about" data-nav="about">About</Link>
          <Link href="/resume" data-nav="resume">Resume</Link>
        </nav>
        <div className="topbar-actions">
          <Link href="/contact" className="hello" data-say="Email, LinkedIn and where Ben is based.">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" d="M3 6h18v12H3z M3 7l9 6 9-6" /></svg>
            Say hello
          </Link>
          <a className="iconbtn" href="https://www.linkedin.com/in/mrbenjamint/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" /></svg>
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="wrap footer" data-orb="Like what you see? Email is the quickest way to reach Ben.">
      <div className="panel footer-panel reveal">
        <h2 className="grad-title">Let&rsquo;s build something that holds up.</h2>
        <p className="lede">Open to Staff Product Designer roles in London, the EU, Canada and beyond.</p>
        <div className="hero-actions">
          <Link className="btn btn-solid" href="/contact">Say hello</Link>
          <a className="btn btn-ghost" href="https://www.linkedin.com/in/mrbenjamint/" target="_blank" rel="noreferrer">LinkedIn</a>
          <Link className="btn btn-ghost" href="/resume">Resume</Link>
        </div>
        <div className="footer-meta">bensackey5@gmail.com · Accra, Ghana</div>
      </div>
    </footer>
  );
}

export function Metrics({ items, glass }: { items: { value: string; label: string }[]; glass?: boolean }) {
  return (
    <div className={glass ? "metrics glass" : "metrics"}>
      {items.map((m) => (
        <div className="metric" key={m.label}>
          <div className="metric-value">{m.value}</div>
          <div className="metric-label">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
