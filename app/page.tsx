import Link from "next/link";
import { work, built } from "@/content/work";
import { Metrics } from "@/components/Chrome";

export default function Home() {
  return (
    <>
      <section className="wrap hero-wrap" data-orb="Hey there, I'm Ben. Nice to meet you! Move around and I'll tell you what you're looking at.">
        <div className="panel hero-panel">
          <h1 className="hero-title">
            Hi, I&rsquo;m Ben.
            <br />
            I design both sides of money movement.
          </h1>
          <p className="hero-sub">
            Senior Product Designer with a frontend engineering background. Designing payments, compliance and fraud tools at{" "}
            <span className="chip chip-light" data-say="Peach Payments: a payment gateway for merchants across Africa.">Peach Payments</span>{" "}
            by day, building{" "}
            <a className="chip chip-dark" href="https://www.kuukup.com/" target="_blank" rel="noreferrer" data-say="Kuukup: book a private chef in Ghana. Ben's own build.">Kuukup</a>{" "}
            by night.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-solid" href="#work">See the work</Link>
            <Link className="btn btn-ghost" href="/resume" data-say="Two pages, and every number on it is real.">Resume</Link>
          </div>
        </div>
      </section>

      <div className="wrap reveal" data-orb="These come straight from Peach's monthly metrics reviews." data-say="All three are measured outcomes, not estimates.">
        <Metrics
          glass
          items={[
            { value: "80%+", label: "of Peach's risk work now runs in tools I designed" },
            { value: "−56%", label: "onboarding support tickets after the verification redesign" },
            { value: "+17%", label: "merchant conversion from embedded checkout" },
          ]}
        />
      </div>

      <section className="wrap section" id="work" data-orb="Four case studies. The first two are internal tools, which is where most of the risk work in fintech happens.">
        <div className="panel reveal">
          <h2 className="grad-title">Some recent work</h2>
          <p className="panel-sub">(from full-time roles)</p>
          <div className="tl">
            {work.map((w) => {
              const year = (w.kicker.match(/\d{4}/) || [""])[0];
              const company = w.kicker.split("·")[0].trim();
              return (
                <article className="tl-item" key={w.slug} data-say={w.say}>
                  <div className="tl-year"><i aria-hidden="true" />{year}</div>
                  <div className="tl-body">
                    <div className="eyebrow">{company}</div>
                    <h3 className="tl-title"><Link href={`/work/${w.slug}`}>{w.title}</Link></h3>
                    <p className="tl-text">{w.summary}</p>
                    <div className="tl-metrics">
                      {w.metrics.slice(0, 3).map((m) => (
                        <div key={m.label}>
                          <div className="tl-value">{m.value}</div>
                          <div className="metric-label">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <Link className="btn-green" href={`/work/${w.slug}`}>Read case study <span aria-hidden="true">→</span></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="wrap section" style={{ paddingTop: 0 }} data-orb="Side projects Ben builds after hours to keep his hands in code.">
        <div className="reveal">
          <h2 className="grad-title">Some other things I do</h2>
          <p className="panel-sub">I build products after hours, start to finish, to keep my hands in code.</p>
        </div>
        <div className="built reveal">
          {built.map((b) => (
            <div className="card has-art" key={b.name} data-say={b.say}>
              <div className="art">
                {b.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.image} alt={`${b.name}`} loading="lazy" />
                )}
              </div>
              <div className="card-body">
                <h3 className="h3">{b.name}</h3>
                <p>{b.line}</p>
                <div className="tags" style={{ marginTop: 0 }}>{b.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                {b.url && <a className="link" href={b.url} target="_blank" rel="noreferrer">Visit {b.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗</a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section" style={{ paddingTop: 0 }} data-orb="Ben has been on panels and podcasts about Ghana's design scene since 2023.">
        <div className="panel reveal">
          <div className="about-grid">
            <div>
              <h2 className="grad-title">How I work</h2>
              <p className="lede" style={{ marginTop: 20 }}>
                I start where the work is hardest to see: the analyst triaging a queue, the merchant stuck mid-verification.
                I build prototypes in code so teams react to real states, not pictures, and I measure what ships.
              </p>
              <p style={{ marginTop: 24 }}>
                <Link className="btn btn-ghost" href="/about">More about me</Link>
              </p>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Talks</div>
              <ul className="timeline">
                <li data-say="Ben on how Ghana's design scene grew over ten years. Worth a listen."><span><a href="https://open.spotify.com/episode/4hiCfVS8VIGEXyd41GHtrI" target="_blank" rel="noreferrer"><i>Building Bytes</i> podcast: the evolution of Ghana&rsquo;s product design space ↗</a></span><span className="when">2024</span></li>
                <li data-say="A panel on building technology for the Ghanaian market."><span><a href="https://open.spotify.com/episode/6Smk6gqZh4b3Fj4lsx37C0" target="_blank" rel="noreferrer"><i>Demo Fridays</i> panel: building technology for the Ghanaian market ↗</a></span><span className="when">2023</span></li>
              </ul>
              <div className="embeds">
                {["4hiCfVS8VIGEXyd41GHtrI", "6Smk6gqZh4b3Fj4lsx37C0"].map((id) => (
                  <iframe
                    key={id}
                    className="spotify-embed"
                    title="Podcast episode on Spotify"
                    src={`https://open.spotify.com/embed/episode/${id}?utm_source=generator`}
                    width="100%"
                    height="152"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
