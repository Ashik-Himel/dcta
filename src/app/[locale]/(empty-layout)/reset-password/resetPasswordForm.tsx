"use client";

import resetPasswordImg from "@/assets/section-images/reset-password.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { serverDomain } from "@/lib/variables";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("ResetPasswordPage");
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);

    const form = e.currentTarget;
    const newPassword = (
      form.elements.namedItem("newPassword") as HTMLInputElement
    ).value;
    const reTypedPassword = (
      form.elements.namedItem("reTypedPassword") as HTMLInputElement
    ).value;

    if (newPassword.length < 8) {
      setSubmitDisabled(false);
      return toast.error(t("password-too-short"));
    } else if (!/[A-Z]/.test(newPassword)) {
      setSubmitDisabled(false);
      return toast.error(t("uppercase-required"));
    } else if (!/[0-9]/.test(newPassword)) {
      setSubmitDisabled(false);
      return toast.error(t("number-required"));
    } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setSubmitDisabled(false);
      return toast.error(t("special-char-required"));
    }
    if (newPassword !== reTypedPassword) {
      setSubmitDisabled(false);
      return toast.error(t("password-mismatch"));
    }

    const res = await fetch(
      `${serverDomain}/api/auth/reset-password?token=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, reTypedPassword }),
      }
    );
    const result = await res.json();

    if (result.ok) {
      toast.success(t("updated-successfully"));
      router.push("/login");
    } else {
      setSubmitDisabled(false);
      if (result?.message === "Your link is invalid") {
        toast.error(t("link-invalid"));
      } else if (result?.message === "Passwords do not match") {
        toast.error(t("password-mismatch"));
      } else if (result?.message === "Token has already been used") {
        toast.error(t("token-used"));
      } else if (result?.message === "User not found") {
        toast.error(t("user-not-found"));
      } else if (result?.message === "Link expired or invalid") {
        toast.error(t("link-expired-invalid"));
      } else {
        toast.error(t("error-occurred"));
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow p-0 bg-background">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="relative hidden bg-muted md:block">
            <Image
              src={resetPasswordImg}
              alt="Reset Password Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <form
            className="p-6 md:p-12"
            autoComplete="true"
            onSubmit={handleResetPassword}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <p className="text-balance text-muted-foreground">
                  {t("subtitle")}
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">{t("new-password-label")}</Label>
                <Input
                  id="newPassword"
                  type="text"
                  placeholder={t("new-password-placeholder")}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reTypedPassword">
                  {t("confirm-password-label")}
                </Label>
                <Input
                  id="reTypedPassword"
                  type="text"
                  placeholder={t("confirm-password-placeholder")}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={submitDisabled}
              >
                {submitDisabled ? t("processing") : t("reset")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
