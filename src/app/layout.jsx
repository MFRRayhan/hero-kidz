import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const mayaboti = localFont({
  src: "../fonts/mayaboti-normal.ttf",
});

export const metadata = {
  metadataBase: new URL("https://hero-kidz-indol.vercel.app"),

  title: {
    default: "Hero Kidz",
    template: "%s | Hero Kidz",
  },

  description:
    "Hero Kidz is a fun and engaging platform designed for kids. Explore our products, discover exciting content, and enjoy a kid-friendly experience.",

  keywords: [
    "Hero Kidz",
    "kids",
    "children",
    "kids products",
    "toys",
    "kids activities",
  ],

  authors: [{ name: "Hero Kidz" }],
  creator: "Hero Kidz",
  publisher: "Hero Kidz",

  icons: {
    icon: "https://i.ibb.co.com/XBBCNn6/image.png",
    shortcut: "https://i.ibb.co.com/XBBCNn6/image.png",
    apple: "https://i.ibb.co.com/XBBCNn6/image.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hero-kidz-indol.vercel.app",
    siteName: "Hero Kidz",

    title: "Hero Kidz",
    description:
      "Discover a fun and engaging world made for kids at Hero Kidz.",

    images: [
      {
        url: "https://i.ibb.co.com/6RHyS09F/image.png",
        width: 1200,
        height: 630,
        alt: "Hero Kidz",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hero Kidz",
    description:
      "Discover a fun and engaging world made for kids at Hero Kidz.",
    images: ["https://i.ibb.co.com/6RHyS09F/image.png"],
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

  category: "kids",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
