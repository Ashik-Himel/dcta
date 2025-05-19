import { redirect } from "@/i18n/navigation";

export default function AdminPage() {
  redirect({ href: "/admin/dashboard", locale: "en" });
}
