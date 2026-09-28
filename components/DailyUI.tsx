"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { liveShots, pad, startLabel, type Shot } from "@/lib/daily-ui";
import { EASE_OUT } from "@/lib/motion";

const LAYOUT_SPRING = { type: "spring", stiffness: 260, damping: 32 } as const;

export function DailyUIGrid() {
  const [items, setItems] = useState<Shot[] | null>(null);
  const [openDay, setOpenDay] = useState<number | null>(null);
  const triggers = useRef(new Map<number, HTMLButtonElement>());
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems(liveShots(new Date()));
  }, []);

  const current = items?.find((s) => s.day === openDay) ?? null;

  const close = useCallback(() => {
    const day = openDay;
    setOpenDay(null);
    if (day !== null) requestAnimationFrame(() => triggers.current.get(day)?.focus());
  }, [openDay]);

  useEffect(() => {
    if (openDay === null) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openDay, close]);

  // Keep keyboard focus inside the open viewer.
  function trapFocus(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button");
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (items === null) return <div className="shots shots--loading" aria-hidden="true" />;

  if (items.length === 0) {
    return <p className="shots__empty">Day 001 drops on {startLabel}. Check back soon.</p>;
  }

  return (
    <>
      <motion.ol
        className="shots"
        reversed
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
      >
        {items.map((s) => (
          <motion.li
            key={s.day}
            variants={{
              hidden: { opacity: 0, y: 32 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
            }}
          >
            <button
              type="button"
              className="shot"
              onClick={() => setOpenDay(s.day)}
              ref={(el) => {
                if (el) triggers.current.set(s.day, el);
              }}
              aria-label={`View Day ${pad(s.day)}: ${s.title}`}
            >
              <motion.div
                layoutId={`shot-${s.day}`}
                className="shot__frame"
                transition={LAYOUT_SPRING}
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 860px) 50vw, (max-width: 1100px) 33vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
              <span className="shot__meta">
                <span className="muted">Day {pad(s.day)}</span>
                <span className="shot__title">
                  {s.title} <span className="shot__arrow" aria-hidden="true">↗</span>
                </span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ol>

      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <div
              ref={dialogRef}
              className="lightbox__dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-title"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={trapFocus}
            >
              <motion.div
                layoutId={`shot-${current.day}`}
                className="lightbox__frame"
                transition={LAYOUT_SPRING}
              >
                <Image
                  src={current.image}
                  alt={`Daily UI ${pad(current.day)}: ${current.title}`}
                  fill
                  sizes="(max-width: 1240px) 92vw, 1200px"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
              <motion.div
                className="lightbox__bar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <p id="lightbox-title">
                  <span className="muted">Day {pad(current.day)}</span>{" "}
                  {current.title}
                </p>
                <div className="lightbox__actions">
                  {current.link && (
                    <a className="link" href={current.link} target="_blank" rel="noopener">
                      View post ↗
                    </a>
                  )}
                  <button type="button" className="btn btn--ghost btn--sm" onClick={close} autoFocus>
                    Close <span aria-hidden="true">✕</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
