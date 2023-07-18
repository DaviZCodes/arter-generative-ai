import "./globals.css";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { NavBar } from "./NavBar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Arter',
  description: "Become an Arter, not an artist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <html lang="en">
        <body className={inter.className}>
          <NavBar/>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </>
  );
}