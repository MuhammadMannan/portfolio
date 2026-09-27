import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { NowStrip } from "@/components/NowStrip";
import { DailyUIGrid } from "@/components/DailyUI";
import { Reveal, RevealWords, SectionHead } from "@/components/Reveal";
import { startLabel } from "@/lib/daily-ui";
import { visibleCaseStudies } from "@/content/work";

const BACKGROUND = [
  {
    label: "[01] Built it",
    title: "Mobile development",
    text: "Writing mobile apps taught me what's realistic to build — and how small interface decisions ripple through code.",
  },
  {
    label: "[02] Sold it",
    title: "Tech sales",
    text: "Selling software meant listening to what customers actually struggle with, and explaining complex products simply.",
  },
  {
    label: "[03] Designing it",
    title: "UI/UX design",
    text: "Now I'm bringing both together: designing products that are buildable, and that people genuinely want to use.",
  },
];

export default function Home() {
  const work = visibleCaseStudies();
  // Section numbers shift automatically once "Selected work" appears.
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <>
      <Hero />
      <NowStrip />

      {work.length > 0 && (
        <section id="work" className="section">
          <SectionHead
            num={num()}
            title="Selected work"
            aside={
              <p className="section__note">
                Case studies that show how I think — the problem, the messy middle, and what I&apos;d
                do differently.
              </p>
            }
          />
          <div className="work">
            {work.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <Link href={`/work/${c.slug}`} className="work-card">
                  <div className="work-card__frame">
                    {c.cover ? (
                      <Image
                        src={c.cover}
                        alt=""
                        fill
                        sizes="(max-width: 860px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span className="placeholder">[Cover image]</span>
                    )}
                  </div>
                  <span className="label">{c.category}</span>
                  <span className="work-card__title">
                    {c.title} <span className="work-card__arrow" aria-hidden="true">→</span>
                  </span>
                  <span className="work-card__summary">{c.summary}</span>
                  {!c.published && <span className="draft-badge">Draft — only visible locally</span>}
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section id="daily" className="section">
        <SectionHead
          num={num()}
          title="Daily UI"
          kicker={`100 days · one design a day · since ${startLabel}, 2026`}
          aside={
            <a className="link" href="https://layers.to/muhammad_mannan" target="_blank" rel="noopener">
              See all on Layers ↗
            </a>
          }
        />
        <DailyUIGrid />
      </section>

      <section id="about" className="section">
        <SectionHead num={num()} title="About" />
        <RevealWords
          className="statement"
          text="A designer who's been on both sides of the product — the code and the customer."
        />
        <div className="grid-3">
          {BACKGROUND.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1} className="col">
              <p className="label">{b.label}</p>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="panel">
          <div className="stack-sm">
            <p className="label">Tools</p>
            <p>Figma</p>
          </div>
          <div className="stack-sm">
            <p className="label">Currently learning</p>
            <p>UI fundamentals through 100 days of Daily UI</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
