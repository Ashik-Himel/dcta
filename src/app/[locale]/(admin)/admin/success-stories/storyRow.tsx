"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Story } from "@/lib/models";
import { Edit, Star, Trash } from "lucide-react";
import Image from "next/image";
import { default as BaseLink } from "next/link";

export default function StoryRow({ story }: { story: Story }) {
  const handleEditStory = () => {};
  const handleDeleteStory = () => {};

  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-2 items-center">
          <Image
            src={story.avatar}
            alt={story.name}
            width={40}
            height={40}
            className="w-10 aspect-square rounded-full"
          />
          <div>
            <p className="font-medium">{story.name}</p>
            <p className={`text-xs text-muted-foreground`}>{story.role}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{story.course.title}</TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <BaseLink
                href={story.video}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={story.thumbnail}
                  alt={story.video}
                  width={64}
                  height={64}
                  className="w-16 aspect-video"
                />
              </BaseLink>
            </TooltipTrigger>
            <TooltipContent side="top">
              <BaseLink
                href={story.video}
                target="_blank"
                rel="noopener noreferrer"
              >
                {story.video}
              </BaseLink>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <Star
          size={20}
          className={`${story.featured ? "text-yellow-500" : ""}`}
        />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => handleEditStory()}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => handleDeleteStory()}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
