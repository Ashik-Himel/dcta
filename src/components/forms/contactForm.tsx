"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { serverDomain } from "@/lib/variables";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

export default function ContactForm() {
  const t = useTranslations("HomePage.ContactSection");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);

    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const subject = (
      form.elements.namedItem("subject") as HTMLInputElement
    ).value.trim();
    const message = (
      form.elements.namedItem("message") as HTMLInputElement
    ).value.trim();

    const res = await fetch(`${serverDomain}/api/contacts`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data?.ok) {
      Swal.fire({
        icon: "success",
        title: t("success"),
        text: t("success-text"),
        iconColor: "#ff0000",
        confirmButtonColor: "#ff0000",
      });
      form.reset();
      setSubmitDisabled(false);

      await fetch(`${serverDomain}/api/contacts/email`, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("error-text"),
        iconColor: "#ff0000",
        confirmButtonColor: "#ff0000",
      });
      setSubmitDisabled(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleContactSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="block font-medium">
            {t("name")}
          </label>
          <Input
            id="name"
            placeholder={t("name-placeholder")}
            className="bg-background"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">
            {t("email")}
          </label>
          <Input
            id="email"
            type="email"
            placeholder={t("email-placeholder")}
            className="bg-background"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="block font-medium">
          {t("subject")}
        </label>
        <Input
          id="subject"
          placeholder={t("subject-placeholder")}
          className="bg-background"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="block font-medium">
          {t("message")}
        </label>
        <Textarea
          id="message"
          placeholder={t("message-placeholder")}
          className="min-h-[150px] resize-none bg-background"
          required
        />
      </div>
      <Button
        size="lg"
        type="submit"
        className="w-full cursor-pointer select-none"
        disabled={submitDisabled}
      >
        {submitDisabled ? (
          t("sending")
        ) : (
          <>
            <Send />
            {t("send-message")}
          </>
        )}
      </Button>
    </form>
  );
}
