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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "@/i18n/navigation";
import { bengali } from "@/lib/fonts";
import { Course } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddStory() {
  const token = Cookies.get("token");
  const router = useRouter();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch(`${serverDomain}/api/courses`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setCourses(data.courses);
        } else {
          toast.error(data.message);
        }
      });
  }, []);

  const handleAddStory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const nameBn = (
      form.elements.namedItem("nameBn") as HTMLInputElement
    ).value.trim();
    const role = (
      form.elements.namedItem("role") as HTMLInputElement
    ).value.trim();
    const roleBn = (
      form.elements.namedItem("roleBn") as HTMLInputElement
    ).value.trim();
    const course = (form.elements.namedItem("course") as HTMLInputElement)
      .value;
    const videoId = (
      form.elements.namedItem("videoId") as HTMLInputElement
    ).value.trim();
    const featured =
      (
        form.elements.namedItem("featured") as HTMLInputElement
      ).ariaChecked?.toString() || "false";

    const formData = new FormData();
    formData.append("name", name);
    formData.append("nameBn", nameBn);
    formData.append("role", role);
    formData.append("roleBn", roleBn);
    if (avatar) {
      formData.append("avatar", avatar as Blob);
    }
    formData.append("course", course);
    formData.append("videoId", videoId);
    formData.append("featured", featured);

    const response = await fetch(`${serverDomain}/api/stories`, {
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
    toast.success("Success story added successfully!");
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Success Story
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Success Story</DialogTitle>
          <DialogDescription>
            Add a new success story to the platform.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4"
          id="add-story-form"
          onSubmit={handleAddStory}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Student Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter student name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nameBn">Student Name (Bangla)</Label>
              <Input
                id="nameBn"
                name="nameBn"
                className={bengali.className}
                placeholder="Enter student name in Bangla"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="role">Student&apos;s Role</Label>
              <Input
                id="role"
                name="role"
                placeholder="Enter student's role"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="roleBn">Student&apos;s Role (Bangla)</Label>
              <Input
                id="roleBn"
                name="roleBn"
                className={bengali.className}
                placeholder="Enter student's role in Bangla"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="avatar">
                Student&apos;s Photo{" "}
                <small className="text-xs text-gray pt-0.5">
                  (512x512, Optional)
                </small>
              </Label>
              <Input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setAvatar(file);
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="course">Completed Course</Label>
              <Select name="course" required>
                <SelectTrigger className="w-full bg-white cursor-pointer select-none">
                  <SelectValue placeholder="Select Completed Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses?.map((course) => (
                    <SelectItem
                      key={course._id}
                      value={course.title}
                      className="cursor-pointer select-none"
                    >
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4">
            <div className="grid gap-2">
              <Label htmlFor="videoId">YouTube Video ID</Label>
              <Input
                id="videoId"
                name="videoId"
                placeholder="Enter youtube video ID"
                required
              />
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Label htmlFor="featured">Featured</Label>
              <Switch id="featured" />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form="add-story-form" disabled={submitting}>
            {submitting ? "Adding..." : "Add Success Story"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
