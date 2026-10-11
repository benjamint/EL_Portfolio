import type { Metadata } from "next";
import { resumeHtml } from "@/content/resume";

export const metadata: Metadata = { title: "Resume" };

export default function Resume() {
  return (
    <section className="wrap hero resume" data-orb="The two-page version of Ben's career.">
      <div className="eyebrow">Resume</div>
      <h1 className="display" style={{ fontSize: "clamp(40px,5vw,60px)" }}>Benjamin Sackey</h1>
      <div className="read resume-body" dangerouslySetInnerHTML={{ __html: resumeHtml }} />
    </section>
  );
}
