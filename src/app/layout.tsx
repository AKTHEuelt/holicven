import { ReactNode } from "react";
import { Bebas_Neue } from "next/font/google";
import StyledComponentsRegistry from "../registry";
import "./globals.css"; // Ensure global styles are imported

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${bebas.className} antialiased`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}