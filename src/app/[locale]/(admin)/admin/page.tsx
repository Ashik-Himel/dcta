"use client";

import { useRouter } from "@/i18n/navigation";

export default function AdminPage() {
  const router = useRouter();
  router.replace("/admin/dashboard");
  return null;
}
