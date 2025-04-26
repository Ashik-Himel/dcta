import { Metadata } from "next";
import { LoginForm } from "./loginForm";

export const metadata: Metadata = {
  title: "Login - DCTA",
  description:
    "Login to access your dashboard and manage all the academy activities from your dashboard.",
  robots: { index: false, follow: false },
};

export default function Login() {
  return (
    <main className="h-full min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm md:max-w-3xl my-8 sm:my-12 md:my-6">
        <LoginForm />
      </div>
    </main>
  );
}
