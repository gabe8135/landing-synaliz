import { Inter, Saira, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const saira = Saira({
  subsets: ["latin"],
  variable: "--font-saira",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://lpsynaliz.vercel.app"),
  title: "Synaliz | Criação de Sites, Landing Pages e Presença Digital Estratégica",
  description:
    "Sites, landing pages e experiências digitais sob medida para empresas que precisam transmitir confiança, gerar leads e crescer com presença online profissional.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Synaliz",
    title: "Synaliz | Sites estratégicos para marcas que querem crescer",
    description:
      "Design, desenvolvimento, SEO e conversão para empresas que precisam transformar presença digital em oportunidade real de negócio.",
    images: [
      {
        url: "/assets/synaliz-logo-s-1200.png",
        width: 1200,
        height: 630,
        alt: "Synaliz - Design e desenvolvimento web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synaliz | Sites estratégicos para marcas que querem crescer",
    description:
      "Design, desenvolvimento, SEO e conversão para empresas que precisam transformar presença digital em oportunidade real de negócio.",
    images: ["/assets/synaliz-logo-s-1200.png"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon.ico", sizes: "any" },
      { url: "/assets/synaliz-simbolo.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable} ${saira.variable}`}>
      <body>{children}</body>
    </html>
  );
}
