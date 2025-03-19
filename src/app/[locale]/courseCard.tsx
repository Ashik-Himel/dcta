import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Info } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface CourseCardProps {
  thumbnail: StaticImageData;
  category: string;
  title: string;
  discountPrice: number;
  regularPrice: number;
  link: string;
  badgeText?: string;
}

export default function CourseCard({
  thumbnail,
  category,
  title,
  discountPrice,
  regularPrice,
  link,
  badgeText = "",
}: CourseCardProps) {
  return (
    <div className="rounded-lg border border-gray-300 dark:border-[#5A2A2A] bg-white dark:bg-[#472020] relative overflow-hidden">
      <Image
        src={thumbnail}
        alt={title}
        className="w-full aspect-video object-cover rounded-t-lg select-none"
      />
      {badgeText && (
        <span className="block w-[160px] text-center bg-green-600 text-white absolute top-[29px] -left-[35px] py-0.5 -rotate-45 border-2 border-white select-none">
          {badgeText}
        </span>
      )}
      <div className="p-4">
        <span className="text-primary font-medium">{category}</span>
        <h4 className="text-xl font-semibold">{title}</h4>
        <div className="font-semibold flex items-center gap-2 mt-2 mb-4">
          <span className="text-primary text-2xl">&#2547; {discountPrice}</span>
          <span className="text-gray-600 dark:text-[#ffefef] line-through text-lg">
            {regularPrice}
          </span>
        </div>
        <Button size="lg" className="w-full" asChild>
          <Link href={link}>
            <Info /> View Details
          </Link>
        </Button>
      </div>
    </div>
  );
}
