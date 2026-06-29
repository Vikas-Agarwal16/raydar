import { Space_Grotesk } from "next/font/google";
import { SITES } from "@/lib/sites";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display-loaded",
});

export const metadata = {
  title: "Raydar — Apna kaam btao, aur bhul jao",
  description: `Raydar watches ${SITES.length} Indian exam, internship, hackathon and counselling sites so you don't have to keep refreshing them.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}