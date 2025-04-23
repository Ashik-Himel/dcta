"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bengali, english } from "@/lib/fonts";
import { Languages } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LangToggler() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const pathArray = pathname.split("/");

  const handleLangSwitch = (language: string) => {
    pathArray[1] = language;
    router.replace(pathArray.join("/") + "?" + params);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer select-none" asChild>
        <Languages />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 bg-primary text-white" align="end">
        <DropdownMenuRadioGroup
          value={pathArray[1]}
          onValueChange={(e) => handleLangSwitch(e)}
        >
          <DropdownMenuRadioItem value="bn" className={bengali.className}>
            বাংলা
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en" className={english.className}>
            English
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
