import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";
import Image, { StaticImageData } from "next/image";

export default function StoryCard({
  thumbnail,
  embeddedLink,
}: {
  thumbnail: StaticImageData;
  embeddedLink: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative aspect-video cursor-pointer select-none">
          <Image
            src={thumbnail}
            alt="Story Thumbnail"
            className="object-cover rounded-lg"
          />
          <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-primary text-white w-20 h-20 rounded-full flex justify-center items-center animate-pulse">
            <Play size={32} />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 !w-[90vw] !max-w-[800px]">
        <DialogTitle className="sr-only">Success Story</DialogTitle>
        <iframe
          src={embeddedLink}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full aspect-video rounded-lg"
        ></iframe>
      </DialogContent>
    </Dialog>
  );
}
