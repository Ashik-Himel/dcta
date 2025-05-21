"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { bengali } from "@/lib/fonts";
import { Course } from "@/lib/models";
import { Edit, Star, Trash } from "lucide-react";
import Image from "next/image";

export default function CourseRow({ course }: { course: Course }) {
  const handleEditCourse = () => {};
  const handleDeleteCourse = () => {};

  return (
    <TableRow>
      <TableCell>
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={64}
          height={64}
          className="w-16 aspect-video"
        />
      </TableCell>
      <TableCell>
        <p className="font-medium">{course.title}</p>
        <p className={`text-xs text-muted-foreground ${bengali.className}`}>
          {course.titleBn}
        </p>
      </TableCell>
      <TableCell>{course.category.text}</TableCell>
      <TableCell>
        <span className="font-semibold mr-2">{course.discountPrice}</span>
        <span className="line-through">{course.regularPrice}</span>
      </TableCell>
      <TableCell>
        {course.badge && (
          <Badge className="bg-gradient">{course.badge?.text}</Badge>
        )}
      </TableCell>
      <TableCell>
        <Star
          size={20}
          className={`${course.featured ? "text-yellow-500" : ""}`}
        />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditCourse()}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => handleDeleteCourse()}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
