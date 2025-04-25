"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { SheetClose } from "../ui/sheet";

export default function DrawerNavLink({
  text,
  href,
  icon,
}: {
  text: string;
  href: string;
  icon: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 p-2 rounded-lg text-sidebar-foreground font-medium hover:bg-accent",
          pathname === href.split("#")[0]
            ? "bg-primary text-white hover:bg-primary"
            : ""
        )}
      >
        {icon}
        <span className="text-base font-medium">{text}</span>
      </Link>
    </SheetClose>
  );
}
