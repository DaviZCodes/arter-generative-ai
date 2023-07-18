import "./globals.css";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { NavBar } from "./NavBar";

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
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}