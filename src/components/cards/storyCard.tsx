"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Story } from "@/lib/models";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function StoryCard({ story }: { story: Story }) {
  const params = useParams();
  const { locale } = params;
  const { avatar, name, nameBn, role, roleBn, thumbnail, video, course } =
    story;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg p-0 gap-0 dark:bg-background">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={avatar}
              alt={name}
              width={256}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium">{locale === "bn" ? nameBn : name}</h4>
            <p className="text-sm text-gray">
              {locale === "bn" ? roleBn : role}
            </p>
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
                  width={512}
                  height={288}
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
            <DialogClose className="absolute -top-12 -right-0 text-white cursor-pointer select-none">
              <X size={40} />
            </DialogClose>
            <DialogTitle className="sr-only">Success Story</DialogTitle>
            <iframe
              src={video}
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
        <p>{locale === "bn" ? course?.titleBn : course?.title}</p>
      </CardFooter>
    </Card>
  );
}
