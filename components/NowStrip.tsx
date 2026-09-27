"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { TOTAL_DAYS, liveShots, pad, startLabel } from "@/lib/daily-ui";

/** "Day 004 / 100" — counts up to the latest live design when it comes into view. */
function DayCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [latest, setLatest] = useState<number | null>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const live = liveShots(new Date());
    setLatest(live.length ? live[0].day : 0);
  }, []);

  useEffect(() => {
    if (!inView || !latest) return;
    const controls = animate(0, latest, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, latest]);

  if (latest === 0) return <span ref={ref}>Daily UI starts {startLabel}</span>;
  return (
    <span ref={ref} className="tabular">
      Day {pad(latest === null ? 0 : shown)} / {TOTAL_DAYS} — Daily UI
    </span>
  );
}

export function NowStrip() {
  return (
    <section className="now" aria-label="Currently">
      <div className="now__inner">
        <span className="label label--strong">
          <span className="now__dot" aria-hidden="true" />
          Now
        </span>
        <DayCounter />
        <span>Open to entry-level UI/UX roles</span>
      </div>
    </section>
  );
}
