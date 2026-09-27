import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/400-italic.css";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { visibleCaseStudies } from "@/content/work";

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = productionHost ? `https://${productionHost}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Mannan — UI/UX Designer",
    template: "%s — Muhammad Mannan",
  },
  description:
    "Former mobile developer and tech salesperson moving into UI/UX design. Follow along with 100 days of Daily UI.",
  openGraph: {
    type: "website",
    title: "Muhammad Mannan — UI/UX Designer",
    description: "I used to build apps and sell software. Now I design it.",
    images: ["/images/og.jpg"],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

// Runs before first paint so a saved light theme never flashes dark.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  const hasWork = visibleCaseStudies().length > 0;
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Providers>
          <Nav hasWork={hasWork} />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
