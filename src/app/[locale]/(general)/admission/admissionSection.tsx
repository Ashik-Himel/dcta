/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { courses } from "@/data/courses";
import { Link } from "@/i18n/navigation";
import { serverDomain } from "@/lib/variables";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  GraduationCap,
  Upload,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AdmissionSection() {
  const t = useTranslations("AdmissionPage.StepsSection");
  const t2 = useTranslations("AdmissionPage.AdmissionSection");
  const t3 = useTranslations("Information.Courses");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const admissionFormRef = useRef<HTMLElement | null>(null);
  const courseParam = useSearchParams().get("course");

  const formSchema = z.object({
    fullName: z.string().min(2, {
      message: t2("name-error"),
    }),
    email: z.string().email({
      message: t2("email-error"),
    }),
    phone: z.string().min(10, {
      message: t2("phone-error"),
    }),
    address: z.string().min(5, {
      message: t2("address-error"),
    }),
    course: z.string({
      required_error: t2("course-error"),
    }),
    batch: z.string({
      required_error: t2("batch-error"),
    }),
    message: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      course: "",
      batch: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const res = await fetch(`${serverDomain}/api/admission/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (data?.ok) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      admissionFormRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsSubmitting(false);
      setStep(1);
      admissionFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextStep = () => {
    const fieldsToValidate =
      step === 1
        ? ["course", "batch"]
        : ["fullName", "email", "phone", "address"];

    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        setStep(step + 1);
        admissionFormRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    });
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
              <Form {...form}>
                <form
                  className="space-y-6"
                  id="admission-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  {step === 1 && (
                    <>
                      <FormField
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="mb-2">
                              {t2("course-label")}
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={
                                courseParam ? courseParam : field.value
                              }
                            >
                              <FormControl className="w-full bg-white cursor-pointer select-none">
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={t2("course-placeholder")}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {courses?.map((course) => (
                                  <SelectItem
                                    key={course.title}
                                    value={course.title}
                                    className="cursor-pointer select-none"
                                  >
                                    {t3(course.title)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="batch"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="mb-2">
                              {t2("batch-label")}
                            </FormLabel>
                            <FormControl className="w-full">
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-wrap items-center gap-x-6 md:gap-x-12"
                              >
                                <FormItem className="flex items-center space-x-1 space-y-0">
                                  <FormControl className="bg-white text-primary cursor-pointer w-5 h-5">
                                    <RadioGroupItem value="sat-mon" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer select-none">
                                    {t2("sat-mon")}
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-1 space-y-0">
                                  <FormControl className="bg-white text-primary cursor-pointer w-5 h-5">
                                    <RadioGroupItem value="tue-thurs" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer select-none">
                                    {t2("tue-thurs")}
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2">
                              {t2("name-label")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t2("name-placeholder")}
                                className="bg-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2">
                              {t2("email-label")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={t2("email-placeholder")}
                                className="bg-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2">
                              {t2("phone-label")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t2("phone-placeholder")}
                                className="bg-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2">
                              {t2("address-label")}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t2("address-placeholder")}
                                className="bg-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2">
                              {t2("message-label")}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t2("message-placeholder")}
                                className="bg-white"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {t2("message-description")}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </form>
              </Form>

              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="cursor-pointer select-none"
                  >
                    <ArrowLeft className="ml-2 h-4 w-4" /> {t2("previous")}
                  </Button>
                )}
                {step < 2 ? (
                  <Button
                    type="button"
                    className="ml-auto cursor-pointer select-none"
                    onClick={nextStep}
                  >
                    {t2("next")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    form="admission-form"
                    className="ml-auto cursor-pointer select-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t2("submitting") : t2("submit")}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
