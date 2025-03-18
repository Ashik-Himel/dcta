import Header from "@/components/header/header";
import { routing } from "@/i18n/routing";
import { bengali, english } from "@/lib/fonts";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import "../globals.css";

export const metadata: Metadata = {
  title: "Digital Computer Training Academy",
  description:
    "This is the official website of the Digital Computer Training Academy. This academy runs various technical courses for students.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${
          locale === "en" ? english.className : bengali.className
        } antialiased bg-[#faf0f0] dark:bg-gray-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Header />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
