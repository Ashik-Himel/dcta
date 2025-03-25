import FloatingSocialIcons from "@/components/floating-social-icons/floatingSocialIcons";
import Footer from "@/components/footer/footer";
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
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${
          locale === "en" ? english.className : bengali.className
        } antialiased h-full min-h-screen flex flex-col selection:bg-primary selection:text-white bg-[#faf0f0] dark:bg-[#2f1010]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
            <FloatingSocialIcons />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
