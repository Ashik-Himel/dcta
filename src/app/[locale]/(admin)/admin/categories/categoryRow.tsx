"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "@/i18n/navigation";
import { bengali } from "@/lib/fonts";
import { Category } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function CategoryRow({ category }: { category: Category }) {
  const token = Cookies.get("token");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [img, setImg] = useState<File | null>(null);

  const handleEditCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const text = (
      form.elements.namedItem("text") as HTMLInputElement
    ).value.trim();
    const textBn = (
      form.elements.namedItem("textBn") as HTMLInputElement
    ).value.trim();

    const formData = new FormData();
    formData.append("text", text);
    formData.append("textBn", textBn);
    if (img) {
      formData.append("img", img as Blob);
    }

    const response = await fetch(
      `${serverDomain}/api/categories/category/${category._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const data = await response.json();

    if (!data.ok) {
      setSubmitting(false);
      toast.error(data.message);
      return;
    }

    setSubmitting(false);
    setDialogOpen(false);
    router.refresh();
    toast.success("Category updated successfully!");
  };

  const handleDeleteCategory = () => {
    Swal.fire({
      title: "Delete?",
      text: "Are you sure to delete this category?",
      icon: "warning",
      iconColor: "#ff0000",
      confirmButtonText: "Delete",
      confirmButtonColor: "#ff0000",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${serverDomain}/api/categories/category/${category._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.ok) {
              Swal.fire({
                title: "Deleted!",
                text: "Category has been deleted successfully.",
                icon: "success",
                iconColor: "#ff0000",
                confirmButtonColor: "#ff0000",
              });
              router.refresh();
            } else {
              Swal.fire({
                title: "Error!",
                text: data.message,
                icon: "error",
                iconColor: "#ff0000",
                confirmButtonColor: "#ff0000",
              });
            }
          });
      }
    });
  };

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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-48px)] sm:max-w-[425px] rounded-lg">
              <DialogHeader className="text-left">
                <DialogTitle>Edit Category</DialogTitle>
                <DialogDescription>
                  Update the details of the category.
                </DialogDescription>
              </DialogHeader>
              <form
                id="edit-category-form"
                onSubmit={handleEditCategory}
                className="grid gap-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="text">Category Name</Label>
                  <Input
                    id="text"
                    name="text"
                    placeholder="Enter category name"
                    defaultValue={category.text}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="textBn">Category Name (Bangla)</Label>
                  <Input
                    id="textBn"
                    name="textBn"
                    placeholder="Enter category name in Bangla"
                    defaultValue={category.textBn}
                    className={bengali.className}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="img">Category Image</Label>
                  <Input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImg(file);
                    }}
                  />
                </div>
              </form>
              <DialogFooter className="flex-row-reverse">
                <Button
                  type="submit"
                  form="edit-category-form"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleDeleteCategory}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
