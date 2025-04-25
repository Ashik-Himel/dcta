"use client";
import { Link, usePathname } from "@/i18n/navigation";

export default function NavLink({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={pathname === href?.split("#")[0] ? "text-primary" : ""}
    >
      {text}
    </Link>
  );
}
