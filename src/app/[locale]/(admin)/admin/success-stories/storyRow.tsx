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
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "@/i18n/navigation";
import { bengali } from "@/lib/fonts";
import { Course, Story } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { Edit, Star, Trash } from "lucide-react";
import Image from "next/image";
import { default as BaseLink } from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function StoryRow({ story }: { story: Story }) {
  const token = Cookies.get("token");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [featured, setFeatured] = useState(story.featured);
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

  const handleEditStory = async (e: React.FormEvent<HTMLFormElement>) => {
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
    formData.append("featured", featured.toString());

    const response = await fetch(
      `${serverDomain}/api/stories/story/${story._id}`,
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
    toast.success("Success story updated successfully!");
  };

  const handleDeleteStory = () => {
    Swal.fire({
      title: "Delete?",
      text: "Are you sure to delete this success story?",
      icon: "warning",
      iconColor: "#ff0000",
      confirmButtonText: "Delete",
      confirmButtonColor: "#ff0000",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${serverDomain}/api/stories/story/${story._id}`, {
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
                text: "Success story has been deleted successfully.",
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
      <TableCell className="w-max flex gap-2 justify-start items-center">
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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Success Story</DialogTitle>
                <DialogDescription>
                  Update the details of the success story
                </DialogDescription>
              </DialogHeader>
              <form
                className="grid gap-4"
                id="edit-story-form"
                onSubmit={handleEditStory}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Student Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter student name"
                      defaultValue={story.name}
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
                      defaultValue={story.nameBn}
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
                      defaultValue={story.role}
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
                      defaultValue={story.roleBn}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="avatar">
                      Student&apos;s Photo{" "}
                      <small className="text-xs text-gray pt-0.5">
                        (512x512)
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
                    <Select
                      name="course"
                      defaultValue={story.course.title}
                      required
                    >
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
                      defaultValue={story.video.split("/")[4]}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Label htmlFor="featured">Featured</Label>
                    <Switch
                      id="featured"
                      checked={featured}
                      onClick={() => setFeatured(!featured)}
                    />
                  </div>
                </div>
              </form>
              <DialogFooter>
                <Button
                  type="submit"
                  form="edit-story-form"
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
            onClick={handleDeleteStory}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
