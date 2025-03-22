import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type SocialLinks = {
  icon: StaticImageData;
  link: string;
};

interface instructorProps {
  image: StaticImageData;
  name: string;
  title: string;
  socials: SocialLinks[];
}

export default function InstructorCard({
  image,
  name,
  title,
  socials,
}: instructorProps) {
  return (
    <div className="rounded-lg card-border bg-background flex items-center gap-4">
      <Image
        src={image}
        alt="name"
        className="max-w-[120px] aspect-square rounded-l-lg"
      />
      <div className="py-2 flex-1">
        <h4 className="text-lg md:text-xl font-semibold">{name}</h4>
        <span className="text-gray block mb-2">{title}</span>
        <div className="flex items-center gap-4">
          {socials.map((social) => (
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
