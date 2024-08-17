import type { Metadata } from "next";
import "./globals.css";
import Providers from "./utils/progress-bar";
import { raleway } from "./fonts";
import { MainProvider } from "./context/MainContext";

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
        <MainProvider>
          <body className={raleway.className}>
            {children}
          </body>
        </MainProvider>
      </Providers>
    </html>
  );
}