import type { Metadata } from "next";
import "./globals.css";
import Providers from "./utils/progress-bar";
import { raleway } from "./fonts";

export const metadata: Metadata = {
  title: "Wificombat-Elearning",
  description: "Wificombat E-learning program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={raleway.className}>{children}</body>
      </Providers>
    </html>
  );
}
