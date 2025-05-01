import { AppSidebar } from "@/components/dashboard/layout/sidebar";
import FetchUserState from "@/components/fetchUser/fetchUserState";
import QueryProvider from "@/components/tanstack-query/queryProvider";
import ToastContainerComp from "@/components/toast/toastContainer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { routing } from "@/i18n/routing";
import { english } from "@/lib/fonts";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Dashboard - DCTA",
  description:
    "This is the DCTA's dashboard which can be accessed by DCTA's admin.",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${english.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <QueryProvider>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="selection:bg-primary selection:text-white bg-[#faf0f0] dark:bg-[#2f1010]">
                  {children}
                </SidebarInset>
              </SidebarProvider>
              <ToastContainerComp />
              <FetchUserState />
            </QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
