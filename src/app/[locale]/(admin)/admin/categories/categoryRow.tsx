"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { bengali } from "@/lib/fonts";
import { Category } from "@/lib/models";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";

export default function CategoryRow({ category }: { category: Category }) {
  const handleEditCategory = () => {};
  const handleDeleteCategory = () => {};

  return (
    <TableRow>
      <TableCell>
        <Image
          src={category.img}
          alt={category.text}
          width={40}
          height={40}
          className="w-10 aspect-square"
        />
      </TableCell>
      <TableCell>{category.text}</TableCell>
      <TableCell className={bengali.className}>{category.textBn}</TableCell>
      <TableCell>{category.courseCount}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditCategory()}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => handleDeleteCategory()}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
