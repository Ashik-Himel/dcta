"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import LangToggler from "../language/langToggler";
import { ThemeToggler } from "../theme/themeToggler";

export default function Header() {
  return (
    <header>
      <div className="bg-gradient text-white py-[12px]">
        <div className="container flex justify-between items-center gap-4">
          <div className="flex items-center gap-8">
            <Link
              className="flex items-center gap-2"
              href="tel:+8801715363919"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={18} />
              <span className="font-medium block">01715363919</span>
            </Link>
            <Link
              className="hidden min-[500px]:flex items-center gap-2 -mt-px"
              href="mailto:support@dcta.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={18} />
              <span className="font-medium block -mt-0.5">
                support@dcta.com
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <LangToggler />
            <ThemeToggler />
          </div>
        </div>
      </div>
    </header>
  );
}
