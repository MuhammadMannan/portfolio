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
