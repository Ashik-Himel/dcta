import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type SocialLink = {
  icon: StaticImageData;
  link: string;
};

type InstructorProps = {
  name: string;
  title: string;
  photo: StaticImageData;
  socials: SocialLink[];
};

type Props = {
  instructor: InstructorProps;
};

export default function InstructorCard({ instructor }: Props) {
  const t = useTranslations("Information.Instructors");

  return (
    <div className="rounded-lg card-border bg-background flex items-center gap-6">
      <Image
        src={instructor.photo}
        alt="name"
        className="max-w-[120px] aspect-square object-cover object-center rounded-l-lg"
      />
      <div className="py-2 flex-1">
        <h4 className="text-lg md:text-xl font-semibold">
          {t(instructor.name)}
        </h4>
        <span className="text-gray block mb-2">{t(instructor.title)}</span>
        <div className="flex items-center gap-2">
          {instructor.socials.map((social) => (
            <Link
              key={social.link}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={social.icon} alt="icon" className="w-6" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
