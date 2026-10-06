import type { Metadata } from "next";
import garnett from "next/font/local";
import "./globals.css";

const garnettSans = garnett({
  src: [
    {
      path: "../public/fonts/Garnett-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Garnett-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-garnett",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zorg en Zekerheid aanmeldformulier",
  description: "Job interview assignment",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${garnettSans.variable} h-full font-medium antialiased`}
    >
      <body className="flex min-h-full flex-col px-3">
        <header className="container mx-auto mb-2 p-3 md:mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="Zorg en Zekerheid - Zorgverzekeraar"
            className="h-18"
          />
        </header>
        {children}
      </body>
    </html>
  );
}
