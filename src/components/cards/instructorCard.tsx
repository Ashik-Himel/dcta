"use client";

import { Instructor } from "@/lib/models";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function InstructorCard({
  instructor,
}: {
  instructor: Instructor;
}) {
  const params = useParams();
  const { locale } = params;
  const { photo, name, nameBn, title, titleBn, socials } = instructor;

  return (
    <div className="rounded-lg card-border bg-background flex items-center gap-6">
      <Image
        src={photo}
        alt={name}
        width={120}
        height={120}
        className="max-w-[120px] aspect-square object-cover object-center rounded-l-lg"
      />
      <div className="py-2 flex-1">
        <h4 className="text-lg md:text-xl font-semibold">
          {locale === "bn" ? nameBn : name}
        </h4>
        <span className="text-gray block mb-2">
          {locale === "bn" ? titleBn : title}
        </span>
        <div className="flex items-center gap-2">
          {socials?.map((social) => (
            <Link
              key={social.link}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={social.icon}
                alt="icon"
                width={24}
                height={24}
                className="w-6"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
