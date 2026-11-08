import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description =
  "Solcode is the studio of Mehrnoosh, a freelance web developer building fast, beautiful, AI-enhanced websites and web apps with React and TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Solcode – Freelance Web Developer in Portugal | AI-powered websites", template: "%s | Solcode" },
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "Solcode – Freelance Web Developer", description, type: "website", siteName: "Solcode" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <header className="nav">
          <Link href="/" className="logo"><span className="sun" />Sol<b>code</b></Link>
          <nav aria-label="Main">
            <Link className="h" href="/#skills">Skills</Link>
            <Link className="h" href="/#work">Work</Link>
            <Link className="h" href="/#about">About</Link>
            <Link href="/login">Log in</Link>
            <Link className="btn btn-p sm" href="/signup">Join</Link>
          </nav>
        </header>
        {children}
        <footer className="p-8 text-center text-[13px] text-mut">© {new Date().getFullYear()} Solcode · Mehrnoosh · Built with care</footer>
      </body>
    </html>
  );
}
