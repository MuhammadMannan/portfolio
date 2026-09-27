"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

const SEGMENTS = [
  { text: "I used to build apps and sell software. Now I " },
  { text: "design", em: true },
  { text: " it." },
];
const FULL = SEGMENTS.map((s) => s.text).join("");

/** Types the headline out like a terminal, then draws the underline under "design". */
function TypedHeadline() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const done = count >= FULL.length;

  useEffect(() => {
    if (reduce) {
      setCount(FULL.length);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i >= FULL.length) return;
      const ch = FULL[i - 1];
      const delay = ch === "." ? 420 : ch === " " ? 40 : 28 + Math.random() * 34;
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 450);
    return () => clearTimeout(timer);
  }, [reduce]);

  let offset = 0;
  return (
    <h1 className="hero__title" aria-label={FULL}>
      <span aria-hidden="true">
        {SEGMENTS.map((seg, k) => {
          const start = offset;
          const end = (offset += seg.text.length);
          const shown = Math.max(0, Math.min(seg.text.length, count - start));
          const isLast = k === SEGMENTS.length - 1;
          const caretHere = count >= start && (count < end || (isLast && count === end));
          const inner = (
            <>
              {seg.text.slice(0, shown)}
              {caretHere && <span className={done ? "caret caret--idle" : "caret"} />}
              <span className="ghost">{seg.text.slice(shown)}</span>
            </>
          );
          if (!seg.em) return <span key={k}>{inner}</span>;
          return (
            <em key={k} className="hero__em">
              {inner}
              <motion.span
                className="hero__underline"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count >= end ? 1 : 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: count >= end ? 0.1 : 0 }}
              />
            </em>
          );
        })}
      </span>
    </h1>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE_OUT },
});

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__text">
        <motion.p className="label" {...fadeUp(0.15)}>
          Muhammad Mannan · UI/UX Designer
        </motion.p>
        <TypedHeadline />
        <motion.p className="hero__bio" {...fadeUp(0.7)}>
          A former mobile developer and tech salesperson moving into UI/UX design. This site grows
          with me: every project, experiment and lesson ends up here.
        </motion.p>
        <motion.div className="actions" {...fadeUp(0.85)}>
          <a className="btn btn--solid" href="#daily">
            See my work <span className="btn__arrow">→</span>
          </a>
          <a className="btn btn--ghost" href="#contact">
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero__photo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
          className="hero__photo-inner"
          initial={{ scale: 1.08, filter: "brightness(0.15)" }}
          animate={{ scale: 1, filter: "brightness(1)" }}
          transition={{ duration: 2, ease: EASE_OUT }}
        >
          <Image
            src="/images/portrait.webp"
            alt="Black and white portrait of Muhammad Mannan"
            fill
            priority
            sizes="(max-width: 860px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
