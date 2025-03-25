import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function SocialIcon({
  text,
  icon,
  link,
}: {
  text: string;
  icon: StaticImageData;
  link: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Image src={icon} alt={text} className="w-10" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
