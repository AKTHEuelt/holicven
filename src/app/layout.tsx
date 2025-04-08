import { ReactNode } from "react";
import { Bebas_Neue } from "next/font/google";
import StyledComponentsRegistry from "../registry";
import "./globals.css"; // Ensure global styles are imported

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

interface RootLayoutProps {
  children: ReactNode;
}

// Updated Metadata for SEO to reflect Høl i CV’en’s mission
export const metadata = {
  title: "Høl i CV´en - Kaffe, Fellesskap og Recovery",
  description:
    "Høl i CV’en i Sandvika, Bærum Kommune - arbeidstrening, kaffe av kvalitet, og fellesskap for recovery. Besøk vår kafe eller bli med på Sandvika Platemesse!",
  keywords:
    "Høl i CV’en, Sandvika, Bærum Kommune, arbeidstrening, recovery, mental helse, rusmestring, kaffe, matvogn, kafe, Sandvika Platemesse, fellesskap, inkludering, kaffekultur",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Høl i CV´en - Kaffe, Fellesskap og Recovery" />
        <meta
          name="description"
          content="Høl i CV’en i Sandvika, Bærum Kommune - arbeidstrening, kaffe av kvalitet, og fellesskap for recovery. Besøk vår kafe eller bli med på Sandvika Platemesse!"
        />
        <meta
          name="keywords"
          content="Høl i CV’en, Sandvika, Bærum Kommune, arbeidstrening, recovery, mental helse, rusmestring, kaffe, matvogn, kafe, Sandvika Platemesse, fellesskap, inkludering, kaffekultur"
        />

        {/* Google Analytics Script with your specific tracking ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3423EF1KKM"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3423EF1KKM'); // Fixed tracking ID to match the script src
            `,
          }}
        />
      </head>
      <body className={`${bebas.className} antialiased`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}