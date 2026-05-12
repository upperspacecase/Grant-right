import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grant-Right — the artist's grant workspace",
  description:
    "Build your reusable application kit. Let a calibrated Claude-powered draft tailor it to each funder. Never re-type your bio in 50 / 100 / 250 words again."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
