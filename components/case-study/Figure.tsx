import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "../Reveal";

/** An image with an optional caption, or a dashed placeholder while drafting. */
export function Figure({
  src,
  alt = "",
  width = 1600,
  height = 1000,
  caption,
  placeholder,
}: {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
  placeholder?: string;
}) {
  return (
    <Reveal className="cs-figure">
      <figure>
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 1100px) 100vw, 1100px"
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div className="cs-figure__placeholder">{placeholder ?? "[Image]"}</div>
        )}
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}

/** A highlighted line, e.g. the headline result. */
export function Callout({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <Reveal className="cs-callout">
      {label && <p className="label">{label}</p>}
      <div className="cs-callout__body">{children}</div>
    </Reveal>
  );
}

/** A row of headline numbers, e.g. [{ value: "12", label: "teammates tested it" }]. */
export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <Reveal className="cs-stats">
      {items.map((item) => (
        <div key={item.label} className="cs-stats__item">
          <p className="cs-stats__value">{item.value}</p>
          <p className="cs-stats__label">{item.label}</p>
        </div>
      ))}
    </Reveal>
  );
}

type Shot = { src: string; alt: string; width: number; height: number };

/** Two images side by side, labelled Before and After. Stacks on small screens. */
export function Compare({ before, after, caption }: { before: Shot; after: Shot; caption?: string }) {
  return (
    <Reveal className="cs-figure">
      <figure>
        <div className="cs-compare">
          {[
            { label: "Before", shot: before },
            { label: "After", shot: after },
          ].map(({ label, shot }) => (
            <div key={label} className="cs-compare__item">
              <p className="label">{label}</p>
              <a href={shot.src} target="_blank" rel="noopener" aria-label={`Open the ${label.toLowerCase()} image full size`}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(max-width: 860px) 100vw, 550px"
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
            </div>
          ))}
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}
