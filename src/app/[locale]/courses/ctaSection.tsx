import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function CtaSection() {
  const t = useTranslations("CoursesPage.CtaSection");

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-light-primary">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-gradient text-3xl font-bold tracking-tighter sm:text-4xl">
              {t("title")}
            </h2>
            <p className="md:text-xl/relaxed mb-6">{t("description")}</p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/admission#admission">{t("get-admission")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact#contact">{t("request-information")}</Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <Card className="dark:bg-[#2f1010]">
              <CardHeader>
                <CardTitle className="text-2xl">{t("card-title")}</CardTitle>
                <CardDescription>{t("card-subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray mb-4">{t("card-description")}</p>
                <Button
                  asChild
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <Link
                    href="tel:+8801334766160"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("call-us")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
