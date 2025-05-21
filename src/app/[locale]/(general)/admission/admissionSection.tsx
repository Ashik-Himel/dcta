"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/navigation";
import { Course } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  GraduationCap,
  Upload,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AdmissionSection() {
  const params = useParams();
  const { locale } = params;
  const courseParam = useSearchParams().get("course");
  const t = useTranslations("AdmissionPage.StepsSection");
  const t2 = useTranslations("AdmissionPage.AdmissionSection");
  const [courses, setCourses] = useState<Course[]>([]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [courseValue, setCourseValue] = useState<string>("");
  const [batchValue, setBatchValue] = useState<string | null>(null);
  const admissionFormRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    fetch(`${serverDomain}/api/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(data?.courses));
  }, []);
  useEffect(() => {
    courses?.forEach((course) => {
      if (course?.slug === courseParam) {
        return setCourseValue(course.title);
      }
    });
  }, [courses, courseParam]);

  const handleAdmissionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const course = formData.get("course") as string;
    const batch = formData.get("batch") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const message = (formData.get("message") as string) || "";

    const res = await fetch(`${serverDomain}/api/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course,
        batch,
        fullName,
        email,
        phone,
        address,
        message,
      }),
    });
    const data = await res.json();

    if (data?.ok) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      admissionFormRef.current?.scrollIntoView({ behavior: "smooth" });

      await fetch(`${serverDomain}/api/applications/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          course: course,
        }),
      });
    } else {
      Swal.fire({
        title: t2("error"),
        text: t2("error-message"),
        icon: "error",
        iconColor: "#ff0000",
        confirmButtonColor: "#ff0000",
      }).then(() => {
        setIsSubmitting(false);
        setStep(1);
        admissionFormRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const nextStep = () => {
    if (courseValue && batchValue) {
      setStep(step + 1);
      admissionFormRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      toast.error(t2("step1-error"));
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    admissionFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Admission Process */}
      <section className="pt-2 md:pt-6 lg:pt-10" id="admission">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {t("title-1")}{" "}
                <span className="text-gradient">{t("title-2")}</span>{" "}
                {t("title-3")}
              </h2>
              <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
                {t("subtitle")}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className={`border-l-4 bg-background ${
                step === 1 && !isSubmitted
                  ? "border-l-primary"
                  : "border-l-light-primary"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full p-2 ${
                      step === 1 && !isSubmitted
                        ? "bg-light-primary dark:bg-[#2f1010] text-primary"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  <CardTitle>{t("step-1")}</CardTitle>
                </div>
                <CardDescription>{t("step-1-text")}</CardDescription>
              </CardHeader>
            </Card>
            <Card
              className={`border-l-4 bg-background ${
                step === 2 && !isSubmitted
                  ? "border-l-primary"
                  : "border-l-light-primary"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full p-2 ${
                      step === 2 && !isSubmitted
                        ? "bg-light-primary dark:bg-[#2f1010] text-primary"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Upload className="h-5 w-5" />
                  </div>
                  <CardTitle>{t("step-2")}</CardTitle>
                </div>
                <CardDescription>{t("step-2-text")}</CardDescription>
              </CardHeader>
            </Card>
            <Card
              className={`border-l-4 bg-background ${
                isSubmitted ? "border-l-primary" : "border-l-light-primary"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full p-2 ${
                      isSubmitted
                        ? "bg-light-primary dark:bg-[#2f1010] text-primary"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <CardTitle>{t("step-3")}</CardTitle>
                </div>
                <CardDescription>{t("step-3-text")}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section
        className="pb-12 md:pb-16 lg:pb-20 pt-6 md:pt-10"
        ref={admissionFormRef}
      >
        <div className="container">
          {isSubmitted ? (
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center rounded-full bg-light-primary p-4 text-primary">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {t2("success-title-1")}{" "}
                <span className="text-gradient">{t2("success-title-2")}</span>{" "}
                {t2("success-title-3")}
              </h2>
              <p className="text-gray">{t2("success-description")}</p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button asChild size="lg">
                  <Link href="/">{t2("return-home")}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">{t2("contact-us")}</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6 md:mb-8">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                    {step === 1
                      ? t2("selection-title")
                      : t2("information-title")}
                  </h2>
                  <p className="text-center max-w-[700px] mx-auto md:text-lg text-gray block">
                    {step === 1
                      ? t2("selection-description")
                      : t2("information-description")}
                  </p>
                </div>
              </div>
              <form id="admission-form" onSubmit={handleAdmissionSubmit}>
                <div className={step === 1 ? "space-y-6" : "hidden"}>
                  <Label htmlFor="course" className="mb-3">
                    {t2("course-label")}
                  </Label>
                  <Select
                    name="course"
                    value={courseValue}
                    onValueChange={(e) => setCourseValue(e)}
                    required
                  >
                    <SelectTrigger className="w-full bg-white cursor-pointer select-none">
                      <SelectValue placeholder={t2("course-placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {courses?.map((course) => (
                        <SelectItem
                          key={course.title}
                          value={course.title}
                          className="cursor-pointer select-none"
                        >
                          {locale === "bn" ? course?.titleBn : course?.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Label htmlFor="batch" className="mb-3">
                    {t2("batch-label")}
                  </Label>
                  <RadioGroup
                    name="batch"
                    onValueChange={(e) => setBatchValue(e)}
                    className="flex flex-wrap items-center gap-x-6 md:gap-x-12"
                    required
                  >
                    <div className="flex items-center space-x-2 space-y-0">
                      <RadioGroupItem
                        value="batch-1"
                        id="batch-1"
                        className="bg-white text-primary cursor-pointer w-5 h-5"
                      />
                      <Label
                        htmlFor="batch-1"
                        className="font-normal cursor-pointer select-none"
                      >
                        {t2("batch-1")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-y-0">
                      <RadioGroupItem
                        value="batch-2"
                        id="batch-2"
                        className="bg-white text-primary cursor-pointer w-5 h-5"
                      />
                      <Label
                        htmlFor="batch-2"
                        className="font-normal cursor-pointer select-none"
                      >
                        {t2("batch-2")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className={step === 2 ? "space-y-6" : "hidden"}>
                  <Label htmlFor="fullName" className="mb-2">
                    {t2("name-label")}
                  </Label>
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder={t2("name-placeholder")}
                    className="bg-white"
                    required
                  />
                  <Label htmlFor="email" className="mb-2">
                    {t2("email-label")}
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t2("email-placeholder")}
                    className="bg-white"
                    required
                  />
                  <Label htmlFor="phone" className="mb-2">
                    {t2("phone-label")}
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder={t2("phone-placeholder")}
                    className="bg-white"
                    required
                  />
                  <Label htmlFor="address" className="mb-2">
                    {t2("address-label")}
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder={t2("address-placeholder")}
                    className="bg-white resize-none"
                    required
                  />
                  <Label htmlFor="message" className="mb-2">
                    {t2("message-label")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t2("message-placeholder")}
                    className="bg-white resize-none mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {t2("message-description")}
                  </p>
                </div>
              </form>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className={step > 1 ? "" : "hidden"}
                >
                  <ArrowLeft className="ml-2 h-4 w-4" /> {t2("previous")}
                </Button>
                <Button
                  type="button"
                  className={`ml-auto ${step < 2 ? "" : "hidden"}`}
                  onClick={nextStep}
                >
                  {t2("next")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  type="submit"
                  form="admission-form"
                  className={`ml-auto ${step < 2 ? "hidden" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t2("submitting") : t2("submit")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
