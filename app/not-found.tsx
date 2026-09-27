import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="label">Error 404</p>
      <h1 className="not-found__title">
        This page is still in the design phase<span className="caret caret--idle" aria-hidden="true" />
      </h1>
      <p className="hero__bio">It might have moved, or it hasn&apos;t been built yet.</p>
      <div className="actions">
        <Link className="btn btn--solid" href="/">
          Back to home
        </Link>
        <Link className="btn btn--ghost" href="/#daily">
          See Daily UI
        </Link>
      </div>
    </section>
  );
}
