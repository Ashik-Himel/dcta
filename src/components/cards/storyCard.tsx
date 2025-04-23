import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface StoryProps {
  avatar: StaticImageData;
  name: string;
  role: string;
  thumbnail: StaticImageData;
  videoUrl: string;
  course: string;
}

export default function StoryCard({
  avatar,
  name,
  role,
  thumbnail,
  videoUrl,
  course,
}: StoryProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg p-0 gap-0">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-slate-500">{role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Dialog>
          <DialogTrigger className="w-full">
            <div className="relative aspect-video w-full overflow-hidden">
              <div className="group relative h-full w-full cursor-pointer">
                <Image
                  src={thumbnail}
                  alt={`${name}'s story thumbnail`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity group-hover:bg-black/40">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient text-white transition-transform group-hover:scale-110">
                    <Play className="h-8 w-8 fill-current pl-1" />
                  </div>
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="p-0 !w-[90vw] !max-w-[800px]">
            <DialogTitle className="sr-only">Success Story</DialogTitle>
            <iframe
              src={videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full aspect-video rounded-lg"
            ></iframe>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="px-4 pb-2 pt-1 text-sm">
        <p>{course}</p>
      </CardFooter>
    </Card>
  );
}
