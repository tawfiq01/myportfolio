import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import { getThemeSettings } from "@/lib/queries";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Tawfiqul Islam",
    "project manager",
    "FinTech project manager",
    "banking software delivery",
    "Agile",
    "Scrum",
    "stakeholder management",
    "Bangladesh",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Hex-validated in getThemeSettings, so safe to inline into <style>.
  const theme = await getThemeSettings();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${instrumentSans.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) inject
          attributes into <body> before React hydrates — attribute-only, so real
          hydration bugs in children still surface. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <style>{`:root{--accent:${theme.accent};--background:${theme.background}}`}</style>
        {children}
      </body>
    </html>
  );
}
