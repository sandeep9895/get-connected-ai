import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GetConnected AI | Intelligent Career Networking",
  description: "Bridging the gap between talent and opportunity through AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
