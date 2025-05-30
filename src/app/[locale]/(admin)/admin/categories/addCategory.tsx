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
import { useRouter } from "@/i18n/navigation";
import { bengali } from "@/lib/fonts";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddCategory() {
  const token = Cookies.get("token");
  const router = useRouter();
  const [img, setImg] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
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
    formData.append("img", img as Blob);

    const response = await fetch(`${serverDomain}/api/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();

    if (!data.ok) {
      setSubmitting(false);
      toast.error(data.message);
      return;
    }

    setSubmitting(false);
    setDialogOpen(false);
    router.refresh();
    toast.success("Category added successfully!");
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add a new category to the platform.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4"
          id="add-category-form"
          onSubmit={handleAddCategory}
        >
          <div className="grid gap-2">
            <Label htmlFor="text">Category Name</Label>
            <Input
              id="text"
              name="text"
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="textBn">Category Name (Bangla)</Label>
            <Input
              id="textBn"
              name="textBn"
              className={bengali.className}
              placeholder="Enter category name in Bangla"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="img">
              Category Image{" "}
              <small className="text-xs text-gray pt-0.5">(256x256)</small>
            </Label>
            <Input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImg(file);
              }}
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form="add-category-form" disabled={submitting}>
            {submitting ? "Adding..." : "Add Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
