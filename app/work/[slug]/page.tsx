import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { work, getCase } from "@/content/work";
import { Metrics } from "@/components/Chrome";
import { Screen } from "@/components/Mocks";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return { title: c.title, description: c.summary };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  const next = c.next ? getCase(c.next) : undefined;

  return (
    <article>
      <header className="wrap case-hero" data-orb={`${c.title}: the short version is up top, numbers first.`}>
        <Link href="/#work" className="eyebrow" style={{ textDecoration: "none" }}>← All work</Link>
        <div className="eyebrow" style={{ marginTop: 28 }}>{c.kicker} · {c.title}</div>
        <h1 className="display">{c.headline}</h1>
        <p className="lede read">{c.summary}</p>
      </header>

      <div className="wrap">
        {c.metricsLabel && <div className="eyebrow" style={{ marginBottom: 10 }}>{c.metricsLabel}</div>}
        <Metrics items={c.metrics} />
        <dl className="case-meta">
          {c.meta.map((m) => (
            <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
          ))}
        </dl>
      </div>

      <div className="wrap case-body">
        {c.sections.map((s, i) => {
          if (s.kind === "screen")
            return (
              <figure className="figure" key={i} data-say="Recreated in code with made-up data, to protect real merchants and colleagues.">
                <Screen id={s.id} />
                <figcaption>{s.caption}</figcaption>
              </figure>
            );
          if (s.kind === "text")
            return (
              <section className="block read" key={i}>
                <h2>{s.heading}</h2>
                {s.body.map((p, j) => <p key={j}>{p}</p>)}
              </section>
            );
          if (s.kind === "list")
            return (
              <section className="block read" key={i}>
                <h2>{s.heading}</h2>
                {s.intro && <p>{s.intro}</p>}
                <ul>{s.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
              </section>
            );
          if (s.kind === "decisions")
            return (
              <section className="block" key={i} data-orb="These are the calls Ben made, each with its trade-off.">
                <h2>{s.heading}</h2>
                <div className="decisions">
                  {s.items.map((d, j) => (
                    <div className="decision" key={j}>
                      <div className="decision-n">{String(j + 1).padStart(2, "0")}</div>
                      <div className="read">
                        <h3>{d.title}</h3>
                        <p>{d.body}</p>
                        <p className="tradeoff"><b>Trade-off:</b> {d.tradeoff}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          return (
            <section className="block" key={i} data-orb="What changed, and how it was measured.">
              <h2>{s.heading}</h2>
              {s.metrics.length > 0 && (
                <div className="outcomes">
                  {s.metrics.map((m) => (
                    <div key={m.label}><div className="metric-value">{m.value}</div><div className="metric-label">{m.label}</div></div>
                  ))}
                </div>
              )}
              {s.body && <div className="read">{s.body.map((p, j) => <p key={j}>{p}</p>)}</div>}
              {s.note && <p className="note">{s.note}</p>}
            </section>
          );
        })}

        {next && (
          <Link href={`/work/${next.slug}`} className="next" data-say={next.say}>
            <div className="eyebrow">Next case study</div>
            <div className="h2">{next.title}: {next.headline}</div>
          </Link>
        )}
      </div>
    </article>
  );
}
