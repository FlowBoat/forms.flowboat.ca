import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forms | Flowboat",
  description: "Flowboat is accelerating the ideas of tomorrow. Waterloo's very own start-up incubator for high school students.",
  icons: {
    icon: '/flowboat-logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme radius="large" accentColor="indigo" grayColor="gray" hasBackground={true}>
          {children}
        </Theme>
      </body>
    </html>
  );
}
