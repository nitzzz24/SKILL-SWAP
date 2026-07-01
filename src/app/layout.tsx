import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillSwap | Learn Skills. Teach Skills. Grow Together.",
  description: "India's largest peer-to-peer skill exchange platform where people teach one skill in exchange for learning another instead of paying money.",
  keywords: ["Skill Swap", "Peer to Peer Learning", "Free Classes", "Tech Mentors", "Study Swap", "Skill Exchange India"],
  openGraph: {
    title: "SkillSwap | P2P Skill Exchange Platform",
    description: "Learn React, UX Design, languages, and music without paying money. Simply teach your own skills in return.",
    url: "https://skillswap.in",
    siteName: "SkillSwap",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
