"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { EASE_OUT } from "@/lib/motion";

export function Nav({ hasWork }: { hasWork: boolean }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Tuck the nav away while scrolling down, bring it back on the way up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 160 && y > prev);
  });

  const links = [
    ...(hasWork ? [{ href: "/#work", label: "Work" }] : []),
    { href: "/#daily", label: "Daily UI" },
    { href: "/#about", label: "About" },
  ];

  return (
    <motion.header
      className="nav"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      <div className="nav__inner">
        <Link className="nav__name" href="/">
          Muhammad Mannan
        </Link>
        <nav aria-label="Main">
          <ul className="nav__links">
            {links.map((l, i) => (
              <li key={l.href} className="nav__text-link">
                <a href={l.href}>
                  <span className="muted">{String(i + 1).padStart(2, "0")}</span> {l.label}
                </a>
              </li>
            ))}
            <li>
              <a className="btn btn--ghost btn--sm" href="#contact">
                Contact
              </a>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
