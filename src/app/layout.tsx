import "@/app/globals.css";
import { CairoFont, Aref_Ruqaa, inter } from "@/helpers/fonts";
import Link from "next/link";
import { loadLocaleAsync } from "@/i18n/i18n-util.async";
import { i18nObject } from "@/i18n/i18n-util";
import type { Locales } from "@/i18n/i18n-types";
import { NextAuthProvider } from "@/components/general/Provider";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { getBaseUrl } from "@/helpers";
import Script from "next/script";
import backgroundImage from "@/../public/images/background.png";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: "AlGhoul | الغول",
  description:
    "A developer's blog that's meant to be creative, inspirational & educational.",
  alternates: {
    canonical: "/",
    languages: {
      ar: "/ar",
      en: "/en",
      "en-US": "/en",
    },
  },
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: "Abdo .AlGhoul",
  publisher: "Vercel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AlGhoul | الغول",
    type: "website",
    url: "/",
    description:
      "A developer's blog that's meant to be creative, inspirational & educational.",
  },
  category: "blogging",
  twitter: {
    creator: "@abdo_alghoul",
    creatorId: "960225296258564096",
    description:
      "A developer's blog that's meant to be creative, inspirational & educational.",
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const cookieLanguageCode = cookieStore.get("locale");
  const languageCode = (cookieLanguageCode?.value as Locales) || "ar";
  await loadLocaleAsync(languageCode);
  const LL = i18nObject(languageCode);

  return (
    <html
      lang={languageCode}
      className={`
    bg-gradient-to-bl from-[#4A3470] to-[#326C85] 
      ${inter.className} ${CairoFont.variable} ${Aref_Ruqaa.variable}
      scrollbar-thin scrollbar-thumb-[#326C85] scrollbar-track-[#4A3470] scrollbar-thumb-rounded-lg`}
    >
      <body className="flex flex-col">
        <div
          className="hidden lg:inline-block absolute top-20 self-center w-1/2 -z-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, rgba(0, 0, 0, 1.0) 20%, rgba(0, 0, 0, 1.0) 80%, transparent 100%)",
          }}
        >
          <div>
            <Image
              src={backgroundImage}
              alt=""
              quality={90}
              className="block relative -top-11 opacity-90"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 1.0) 20%, rgba(0, 0, 0, 1.0) 80%, transparent 100%)",
              }}
            />
          </div>
        </div>

        <Script
          strategy="beforeInteractive"
          src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"
        />

        <NextAuthProvider>{children}</NextAuthProvider>

        <footer className="flex flex-col gap-3 bg-gradient-to-bl from-[#4A3470] to-[#326C85]/75 backdrop-blur-3xl pt-3 rounded-t-xl text-white">
          <ul className="flex flex-auto justify-around md:justify-between mx-auto gap-16">
            <li>
              <Link href="https://twitter.com/abdo_alghoul" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
            </li>

            <li>
              <Link
                href="https://www.instagram.com/abdo.alghoul/"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
            </li>

            <li>
              <Link href="https://github.com/Al-Ghoul" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            </li>

            <li>
              <Link
                href="https://www.facebook.com/abdo.alghouul/"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>
            </li>

            <li>
              <Link href="https://discord.gg/nxA67CjQZY" target="_blank">
                <svg
                  className="h-5 w-5"
                  fill="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
                </svg>
              </Link>
            </li>
          </ul>
          <p className="text-center">
            {LL.copyRightNotice({ year: new Date().getFullYear() })}
          </p>
        </footer>
      </body>

      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9439484885967303"
        crossOrigin="anonymous"
      />
    </html>
  );
}

