import "./globals.css";
import Script from "next/script";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18324280666";
const googleAdsConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
const primaryGoogleTagId = googleAnalyticsId || googleAdsId;
const googleConfigIds = [googleAnalyticsId, googleAdsId].filter(Boolean);

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
    <html lang="pt-BR">
      <body>
        {primaryGoogleTagId ? (
          <>
            <Script
              id="google-tag-loader"
              src={`https://www.googletagmanager.com/gtag/js?id=${primaryGoogleTagId}`}
              strategy="afterInteractive"
            />
            <Script id="google-tag-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                ${googleConfigIds.map((id) => `gtag('config', '${id}');`).join("\n")}
                ${
                  googleAdsId && googleAdsConversionLabel
                    ? `window.synalizAdsConversionSendTo = '${googleAdsId}/${googleAdsConversionLabel}';`
                    : ""
                }
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
