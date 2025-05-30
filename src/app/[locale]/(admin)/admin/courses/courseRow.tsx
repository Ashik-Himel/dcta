/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Badge } from "@/components/ui/badge";
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
import { useRouter } from "@/i18n/navigation";
import { bengali } from "@/lib/fonts";
import { Badge as BadgeInterface, Category, Course } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";
import { Check, Edit, Star, Trash, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function CourseRow({ course }: { course: Course }) {
  const token = Cookies.get("token");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [badges, setBadges] = useState<BadgeInterface[]>([]);
  const [slugMsg, setSlugMsg] = useState("Available");
  const [featured, setFeatured] = useState(course.featured);

  useEffect(() => {
    fetch(`${serverDomain}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setCategories(data.categories);
        } else {
          toast.error(data.message);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${serverDomain}/api/badges`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setBadges(data.badges);
        } else {
          toast.error(data.message);
        }
      });
  }, []);

  const handleSlugChange = async (slug: string) => {
    if (slug === "") {
      setSlugMsg("");
      return;
    }

    setSlugMsg("Checking...");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setSlugMsg("Invalid slug");
      return;
    }

    const res = await fetch(
      `${serverDomain}/api/courses/slug/${slug}?id=${course._id}`
    );
    const data = await res.json();

    if (data?.message) {
      setSlugMsg(data.message);
    } else {
      setSlugMsg("");
    }
  };
  const debouncedSearch = useCallback(debounce(handleSlugChange, 500), []);
  const handleDebouncedSlugChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    debouncedSearch(e.target.value.trim());
  };

  const handleEditCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (slugMsg !== "Available") {
      toast.error("Valid slug required!");
      return;
    }

    setSubmitting(true);
    const form = e.currentTarget;
    const title = (
      form.elements.namedItem("title") as HTMLInputElement
    ).value.trim();
    const titleBn = (
      form.elements.namedItem("titleBn") as HTMLInputElement
    ).value.trim();
    const category = (form.elements.namedItem("category") as HTMLInputElement)
      .value;
    const duration = (form.elements.namedItem("duration") as HTMLInputElement)
      .value;
    const slug = (
      form.elements.namedItem("slug") as HTMLInputElement
    ).value.trim();
    const regularPrice = (
      form.elements.namedItem("regularPrice") as HTMLInputElement
    ).value;
    const discountPrice = (
      form.elements.namedItem("discountPrice") as HTMLInputElement
    ).value;
    let badge =
      (form.elements.namedItem("badge") as HTMLInputElement).value || "";
    if (badge === "None") badge = "";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("titleBn", titleBn);
    formData.append("category", category);
    formData.append("duration", duration);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail as Blob);
    }
    formData.append("slug", slug);
    formData.append("regularPrice", regularPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("badge", badge);
    formData.append("featured", featured.toString());

    const response = await fetch(
      `${serverDomain}/api/courses/course/${course._id}`,
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
    toast.success("Course updated successfully!");
  };

  const handleDeleteCourse = () => {
    Swal.fire({
      title: "Delete?",
      text: "Are you sure to delete this course?",
      icon: "warning",
      iconColor: "#ff0000",
      confirmButtonText: "Delete",
      confirmButtonColor: "#ff0000",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${serverDomain}/api/courses/course/${course._id}`, {
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
                text: "Course has been deleted successfully.",
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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Course</DialogTitle>
                <DialogDescription>
                  Update the details of the course
                </DialogDescription>
              </DialogHeader>
              <form
                className="grid gap-4"
                id="edit-course-form"
                onSubmit={handleEditCourse}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Course Name</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter course name"
                      defaultValue={course.title}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="titleBn">Course Name (Bangla)</Label>
                    <Input
                      id="titleBn"
                      name="titleBn"
                      className={bengali.className}
                      placeholder="Enter course name in Bangla"
                      defaultValue={course.titleBn}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Select Category</Label>
                    <Select
                      name="category"
                      defaultValue={course.category.text}
                      required
                    >
                      <SelectTrigger className="w-full bg-white cursor-pointer select-none">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem
                            key={category._id}
                            value={category.text}
                            className="cursor-pointer select-none"
                          >
                            {category.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">
                      Course Duration{" "}
                      <small className="text-xs text-gray pt-0.5">
                        (months)
                      </small>
                    </Label>
                    <Input
                      type="number"
                      id="duration"
                      name="duration"
                      placeholder="Enter course duration in months"
                      defaultValue={course.duration}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="thumbnail">
                      Course Thumbnail{" "}
                      <small className="text-xs text-gray pt-0.5">
                        (512x288)
                      </small>
                    </Label>
                    <Input
                      type="file"
                      id="thumbnail"
                      name="thumbnail"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setThumbnail(file);
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="slug">Course Slug</Label>
                    <div className="relative">
                      <Input
                        id="slug"
                        name="slug"
                        placeholder="Enter course slug"
                        defaultValue={course.slug}
                        onChange={handleDebouncedSlugChange}
                        className={`pr-10 ${
                          slugMsg === "Available"
                            ? "border-green-500 text-green-500"
                            : slugMsg === "" || slugMsg === "Checking..."
                            ? "border-gray text-gray"
                            : "border-red-500 text-red-500"
                        }`}
                        required
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        {slugMsg === "Available" ? (
                          <Check className="text-green-500" />
                        ) : slugMsg === "" ||
                          slugMsg === "Checking..." ? null : (
                          <X className="text-red-500" />
                        )}
                      </div>
                      <small
                        className={`absolute top-[calc(100%+2px)] right-2 text-xs ${
                          slugMsg === "Available"
                            ? "text-green-500"
                            : slugMsg === "" || slugMsg === "Checking..."
                            ? "text-gray"
                            : "text-red-500"
                        }`}
                      >
                        {slugMsg}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="regularPrice">Regular Price</Label>
                    <Input
                      type="number"
                      id="regularPrice"
                      name="regularPrice"
                      placeholder="Enter regular price"
                      defaultValue={course.regularPrice}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="discountPrice">Discount Price</Label>
                    <Input
                      type="number"
                      id="discountPrice"
                      name="discountPrice"
                      placeholder="Enter discount price"
                      defaultValue={course.discountPrice}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="badge">
                      Select Badge{" "}
                      <small className="text-xs text-gray pt-0.5">
                        (Optional)
                      </small>
                    </Label>
                    <Select
                      name="badge"
                      defaultValue={course.badge && course.badge.text}
                    >
                      <SelectTrigger className="w-full bg-white cursor-pointer select-none">
                        <SelectValue placeholder="Select Badge" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="None"
                          className="cursor-pointer select-none"
                        >
                          None
                        </SelectItem>
                        {badges?.map((badge) => (
                          <SelectItem
                            key={badge._id}
                            value={badge.text}
                            className="cursor-pointer select-none"
                          >
                            {badge.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Label htmlFor="featured">Featured</Label>
                    <Switch
                      id="featured"
                      aria-checked={featured}
                      checked={featured}
                      onClick={() => setFeatured(!featured)}
                    />
                  </div>
                </div>
              </form>
              <DialogFooter>
                <Button
                  type="submit"
                  form="edit-course-form"
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
            onClick={handleDeleteCourse}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
