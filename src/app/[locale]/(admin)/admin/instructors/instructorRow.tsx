"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { bengali } from "@/lib/fonts";
import { Instructor } from "@/lib/models";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { default as BaseLink } from "next/link";

export default function InstructorRow({
  instructor,
}: {
  instructor: Instructor;
}) {
  const handleEditInstructor = () => {};
  const handleDeleteInstructor = () => {};

  return (
    <TableRow>
      <TableCell>
        <Image
          src={instructor.photo}
          alt={instructor.title}
          width={40}
          height={40}
          className="w-10 aspect-square"
        />
      </TableCell>
      <TableCell>
        <p className="font-medium">{instructor.name}</p>
        <p className={`text-xs text-muted-foreground ${bengali.className}`}>
          {instructor.nameBn}
        </p>
      </TableCell>
      <TableCell>
        <p className="font-medium">{instructor.title}</p>
        <p className={`text-xs text-muted-foreground ${bengali.className}`}>
          {instructor.titleBn}
        </p>
      </TableCell>
      <TableCell>
        <div className="flex justify-start items-center gap-2">
          {instructor.socials.map((social) => (
            <TooltipProvider key={social._id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <BaseLink
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                      className="w-6 aspect-square"
                    />
                  </BaseLink>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <BaseLink
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.link}
                  </BaseLink>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditInstructor()}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => handleDeleteInstructor()}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
