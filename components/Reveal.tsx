"use client";

import { Fragment, type ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" };

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/** Reveals a line of text word by word. The words stay real text for screen readers and search. */
export function RevealWords({
  text,
  className,
  as = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "h2";
}) {
  const Tag = as === "h2" ? motion.h2 : motion.p;
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word">
            <motion.span
              className="word__inner"
              variants={{
                hidden: { opacity: 0, y: "0.6em" },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {/* The space sits between the word boxes; inside one it collapses. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Section heading with a rule that draws itself across on scroll. */
export function SectionHead({
  num,
  title,
  kicker,
  aside,
}: {
  num: string;
  title: string;
  kicker?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="section__head">
      <Reveal className="stack-sm">
        {kicker && <p className="label">{kicker}</p>}
        <h2 className="section__title">
          <span className="muted">{num}/</span> {title}
        </h2>
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
      <motion.span
        className="section__rule"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      />
    </div>
  );
}
