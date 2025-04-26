"use client";

import loginImg from "@/assets/section-images/login.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/navigation";
import { english } from "@/lib/fonts";
import { useUserStore } from "@/lib/userStore";
import { cn } from "@/lib/utils";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import ForgotPassword from "./forgotPassword";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);

    const form = e.currentTarget;
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await fetch(`${serverDomain}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();

    if (result.ok) {
      Cookies.set("token", result?.token, {
        secure: true,
        sameSite: "Strict",
        expires: 7,
      });
      setUser({ available: true, role: result?.userRole });
      toast.success("Logged in successfully.");
      if (result?.userRole === "admin") {
        router.replace("/admin/dashboard");
      } else if (result?.userRole === "student") {
        router.replace("/student/dashboard");
      }
    } else if (result.message === "User not found") {
      setSubmitDisabled(false);
      toast.error("User not found with this email address.");
    } else if (result.message === "Invalid credentials") {
      setSubmitDisabled(false);
      toast.error("Your credentials are invalid.");
    } else {
      setSubmitDisabled(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6", className, english.className)}
      {...props}
    >
      <Card className="overflow-hidden shadow p-0 bg-background">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-12"
            autoComplete="true"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Admin Login</h1>
                <p className="text-balance text-gray">
                  Login to DCTA&apos;s admin panel
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Write your email address"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <ForgotPassword />
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Write your password"
                    required
                  />
                  <div
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-primary cursor-pointer select-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={submitDisabled}
              >
                {submitDisabled ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src={loginImg}
              alt="Login Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
