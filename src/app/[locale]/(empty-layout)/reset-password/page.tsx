import { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm from "./resetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password - DCTA",
  description:
    "If you forgot your password and you requested to reset your password, you can set a new password from this page.",
  robots: { index: false, follow: false },
};

export default function ResetPassword() {
  return (
    <main className="h-full min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm md:max-w-3xl my-8 sm:my-12 md:my-6">
        <Suspense fallback={<div>Loading Password Reset Form</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
