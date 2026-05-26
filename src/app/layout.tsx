import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Personal Hogar & Móvil - Edificio Residencial",
  description:
    "Contratá los mejores planes de Internet Fibra Óptica, Flow TV y Telefonía Móvil en tu edificio con Personal. Beneficios exclusivos para residentes.",
  icons: {
    icon: [
      { url: "/img/favicon/fav-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/img/favicon/fav-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/img/favicon/fav-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
