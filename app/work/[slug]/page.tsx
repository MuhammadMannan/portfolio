import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getCaseStudy, visibleCaseStudies } from "@/content/work";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    openGraph: study.cover ? { images: [study.cover] } : undefined,
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const all = visibleCaseStudies();
  const next = all.length > 1 ? all[(all.indexOf(study) + 1) % all.length] : null;
  const { Content } = study;

  return (
    <article className="cs">
      <header className="cs__header">
        <Reveal>
          <Link href="/#work" className="link cs__back">
            ← All work
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="label">{study.category}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="cs__title">{study.title}</h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="cs__summary">{study.summary}</p>
        </Reveal>
        <Reveal delay={0.2} className="cs__meta">
          <div>
            <p className="label">Role</p>
            <p>{study.role}</p>
          </div>
          <div>
            <p className="label">Timeline</p>
            <p>{study.timeline}</p>
          </div>
          <div>
            <p className="label">Tools</p>
            <p>{study.tools}</p>
          </div>
        </Reveal>
      </header>

      <Reveal delay={0.25} className="cs__cover">
        {study.cover ? (
          <Image
            src={study.cover}
            alt=""
            width={1600}
            height={1000}
            priority
            sizes="(max-width: 1328px) 100vw, 1328px"
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div className="cs-figure__placeholder cs-figure__placeholder--cover">[Cover image]</div>
        )}
      </Reveal>

      <div className="cs__body prose">
        <Content />
      </div>

      {next && (
        <Reveal className="cs__next">
          <Link href={`/work/${next.slug}`} className="work-card">
            <span className="label">Next case study</span>
            <span className="work-card__title">
              {next.title} <span className="work-card__arrow" aria-hidden="true">→</span>
            </span>
          </Link>
        </Reveal>
      )}
    </article>
  );
}
