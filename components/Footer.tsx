import { Reveal, RevealWords } from "./Reveal";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="contact">
      <div className="contact__inner">
        <Reveal>
          <p className="label">Contact</p>
        </Reveal>
        <RevealWords as="h2" className="contact__title" text="Let's make something useful." />
        <Reveal delay={0.15}>
          <p className="contact__text">
            I'm looking for my first UI/UX role and always happy to talk design, get feedback on my
            work, or collaborate.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="actions">
          <a className="btn btn--solid" href="mailto:usman.mannan@hotmail.com">
            usman.mannan@hotmail.com
          </a>
          <a
            className="btn btn--ghost"
            href="https://www.linkedin.com/in/muhammadmannan"
            target="_blank"
            rel="noopener"
          >
            LinkedIn ↗
          </a>
          <a
            className="btn btn--ghost"
            href="https://layers.to/muhammad_mannan"
            target="_blank"
            rel="noopener"
          >
            Layers ↗
          </a>
        </Reveal>
        <div className="contact__foot">
          <span>© {year} Muhammad Mannan</span>
          <span>Designed and built while learning.</span>
        </div>
      </div>
    </footer>
  );
}
