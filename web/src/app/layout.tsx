import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pip - AI Job Search & Application Command Center",
  description: "AI-powered job discovery, LaTeX CV and Cover Letter tailoring, interview preparation, and application tracker dashboard.",
  keywords: ["AI Job Search", "Resume Tailoring", "Cover Letter", "Job Tracker", "LaTeX CV", "Interview Prep"],
};

export const viewport: Viewport = {
  themeColor: "#070a12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
