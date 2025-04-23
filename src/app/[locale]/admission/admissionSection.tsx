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
import { Link } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  GraduationCap,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional(),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  course: z.string({
    required_error: "Please select a course.",
  }),
  batch: z.string({
    required_error: "Please select a preferred batch.",
  }),
  message: z.string().optional(),
});

export default function AdmissionSection() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSubmitted(true);
      // toast({
      //   title: "Application Submitted!",
      //   description:
      //     "We've received your application and will contact you soon.",
      // });
    }, 1500);
  }

  const nextStep = () => {
    const fieldsToValidate =
      step === 1 ? ["course", "batch"] : ["fullName", "phone", "address"];

    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        setStep(step + 1);
        window.scrollTo(0, 0);
      }
    });
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Admission Process */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Admission Process
              </h2>
              <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed">
                Our simple 3-step process to enroll in your desired course.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className={`border-l-4 ${
                step === 1 && !isSubmitted
                  ? "border-l-emerald-600"
                  : "border-l-emerald-200"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full p-2 ${
                      step === 1 && !isSubmitted
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  <CardTitle>Step 1: Course Selection</CardTitle>
                </div>
                <CardDescription>
                  Choose your preferred course and batch timing.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card
              className={`border-l-4 ${
                step === 2 && !isSubmitted
                  ? "border-l-emerald-600"
                  : "border-l-emerald-200"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full p-2 ${
                      step === 2 && !isSubmitted
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Upload className="h-5 w-5" />
                  </div>
                  <CardTitle>Step 2: Personal Information</CardTitle>
                </div>
                <CardDescription>
                  Complete the application with your personal details.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card
              className={`border-l-4 ${
                isSubmitted ? "border-l-emerald-600" : "border-l-emerald-200"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full p-2 ${
                      isSubmitted
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <CardTitle>Step 3: Begin Learning</CardTitle>
                </div>
                <CardDescription>
                  Receive confirmation and start your learning journey.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          {isSubmitted ? (
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center rounded-full bg-emerald-100 p-4 text-emerald-600">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Application Submitted Successfully!
              </h2>
              <p className="text-slate-500 md:text-xl/relaxed">
                Thank you for applying to IT Training Academy. We have received
                your application and will review it shortly. You will receive a
                confirmation email with further instructions.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    {step === 1 ? "Course Selection" : "Personal Information"}
                  </h2>
                  <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed">
                    {step === 1
                      ? "Select your preferred course and batch timing."
                      : "Please provide your personal details below."}
                  </p>
                </div>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {step === 1 && (
                    <>
                      <FormField
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="web-development">
                                  Web Design & Development
                                </SelectItem>
                                <SelectItem value="advanced-web">
                                  Advanced Web Development
                                </SelectItem>
                                <SelectItem value="graphic-design">
                                  Graphic Design
                                </SelectItem>
                                <SelectItem value="ui-ux">
                                  UI/UX Design
                                </SelectItem>
                                <SelectItem value="digital-marketing">
                                  Digital Marketing
                                </SelectItem>
                                <SelectItem value="social-media">
                                  Social Media Marketing
                                </SelectItem>
                                <SelectItem value="computer-basics">
                                  Basic Computer Applications
                                </SelectItem>
                                <SelectItem value="advanced-excel">
                                  Advanced Excel
                                </SelectItem>
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
                          <FormItem>
                            <FormLabel>Preferred Batch</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="weekday" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Weekday (Monday-Friday, 10:00 AM - 1:00 PM)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="weekend" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Weekend (Saturday-Sunday, 10:00 AM - 4:00
                                    PM)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="evening" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Evening (Monday-Friday, 6:00 PM - 9:00 PM)
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
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
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
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john.doe@example.com"
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
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+1 (555) 123-4567"
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
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="123 Main St, City, Country"
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
                            <FormLabel>Additional Message (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any additional information you'd like to share..."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Share any additional information that might be
                              relevant to your application.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="terms"
                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                            required
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm text-gray-600"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-emerald-600 hover:underline"
                            >
                              Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy-policy"
                              className="text-emerald-600 hover:underline"
                            >
                              Privacy Policy
                            </Link>
                            .
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                      >
                        Previous
                      </Button>
                    )}
                    {step < 2 ? (
                      <Button
                        type="button"
                        className="ml-auto bg-emerald-600 hover:bg-emerald-700"
                        onClick={nextStep}
                      >
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="ml-auto bg-emerald-600 hover:bg-emerald-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
