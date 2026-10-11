import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";
import { Nav, Footer } from "@/components/Chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://benjaminsackey.com"),
  title: {
    default: "Benjamin Sackey — Product Designer, Payments, Risk & Internal Tools",
    template: "%s — Benjamin Sackey",
  },
  description:
    "Benjamin Sackey designs both sides of money movement: customer checkout and onboarding, and the compliance, KYC/KYB and fraud tools risk teams run on. 10+ years in African fintech.",
  openGraph: {
    title: "Benjamin Sackey — Product Designer",
    description: "Payments, risk and internal tools. 10+ years in African fintech.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#faf8f4" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="ambient" aria-hidden="true"><span /><span /><span /></div>
        <Nav />
        <main>{children}</main>
        <Footer />
        <script src="/site.js" defer />
        <script src="/orb.js" defer />
        <script type="module" src="/avatar3d.js" />
      </body>
    </html>
  );
}
