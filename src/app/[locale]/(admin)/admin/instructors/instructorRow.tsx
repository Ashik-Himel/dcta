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
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "@/i18n/navigation";
import { bengali } from "@/lib/fonts";
import { Instructor } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { Edit, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import { default as BaseLink } from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface SocialPlatform {
  _id: string;
  id: number;
  name: string;
  nameBn: string;
  prefix: string;
  placeholder: string;
  icon: string;
}

interface InstructorSocial {
  id: string;
  platform: SocialPlatform;
  url: string;
}

function hasDuplicateSocial(
  arr: ({ name: string; link: string } | null)[]
): boolean {
  const seen = new Set();
  for (const obj of arr) {
    if (obj && seen.has(obj.name)) {
      return true;
    }
    seen.add(obj?.name);
  }
  return false;
}

export default function InstructorRow({
  instructor,
}: {
  instructor: Instructor;
}) {
  const token = Cookies.get("token");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [socials, setSocials] = useState<InstructorSocial[]>([]);
  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([]);

  useEffect(() => {
    fetch(`${serverDomain}/api/socials`)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setSocialPlatforms(data.socials);
        } else {
          toast.error(data.message);
        }
      })
      .catch(() => {
        toast.error("Failed to fetch socials");
      });
  }, []);

  useEffect(() => {
    const existingSocials: InstructorSocial[] = [];
    instructor.socials?.forEach((social, index) => {
      const split1 = social.link?.split(":");
      const split2 = split1[split1.length - 1]?.split("/");
      const url = split2[split2.length - 1];
      const platform = socialPlatforms.find(
        (social2) => social2.name === social.name
      ) as SocialPlatform;
      existingSocials.push({
        id: `social-${Date.now() + index}`,
        platform,
        url,
      });
    });
    setSocials(existingSocials);
  }, [socialPlatforms]);

  const addSocial = () => {
    const newSocial = {
      id: `social-${Date.now()}`,
      platform: {} as SocialPlatform,
      url: "",
    };
    setSocials([...socials, newSocial]);
  };
  const removeSocial = (id: string) => {
    setSocials(socials.filter((link) => link.id !== id));
  };
  const updateSocial = (
    id: string,
    field: keyof InstructorSocial,
    value: string | SocialPlatform
  ) => {
    setSocials(
      socials.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const handleEditInstructor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const nameBn = (
      form.elements.namedItem("nameBn") as HTMLInputElement
    ).value.trim();
    const title = (
      form.elements.namedItem("title") as HTMLInputElement
    ).value.trim();
    const titleBn = (
      form.elements.namedItem("titleBn") as HTMLInputElement
    ).value.trim();

    const newSocials = socials
      .map((social) =>
        social.platform?.name && social?.url
          ? {
              name: social.platform.name,
              link: `${social.platform.prefix}${social.url.trim()}`,
            }
          : null
      )
      .filter((social2) => social2);

    if (!newSocials[0]) {
      setSubmitting(false);
      toast.error("Please add at least one social link!");
      return;
    }
    if (hasDuplicateSocial(newSocials)) {
      setSubmitting(false);
      toast.error("Duplicate social links found!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("nameBn", nameBn);
    formData.append("title", title);
    formData.append("titleBn", titleBn);
    if (photo) {
      formData.append("photo", photo as Blob);
    }
    formData.append("socials", JSON.stringify(newSocials));

    const response = await fetch(
      `${serverDomain}/api/instructors/instructor/${instructor._id}`,
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
    toast.success("Instructor updated successfully!");
  };

  const handleDeleteInstructor = () => {
    Swal.fire({
      title: "Delete?",
      text: "Are you sure to delete this instructor?",
      icon: "warning",
      iconColor: "#ff0000",
      confirmButtonText: "Delete",
      confirmButtonColor: "#ff0000",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${serverDomain}/api/instructors/instructor/${instructor._id}`, {
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
                text: "Instructor has been deleted successfully.",
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
                    className="block w-6 aspect-square"
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                      className="w-full"
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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Instructor</DialogTitle>
                <DialogDescription>
                  Update the details of the instructor
                </DialogDescription>
              </DialogHeader>
              <form
                className="grid gap-4"
                id="edit-instructor-form"
                onSubmit={handleEditInstructor}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter instructor name"
                      defaultValue={instructor.name}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nameBn">Name (Bangla)</Label>
                    <Input
                      id="nameBn"
                      name="nameBn"
                      className={bengali.className}
                      placeholder="Enter instructor name in Bangla"
                      defaultValue={instructor.nameBn}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter instructor's title"
                      defaultValue={instructor.title}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="titleBn">Title (Bangla)</Label>
                    <Input
                      id="titleBn"
                      name="titleBn"
                      className={bengali.className}
                      placeholder="Enter instructor's title in Bangla"
                      defaultValue={instructor.titleBn}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="photo">
                    Photo{" "}
                    <small className="text-xs text-gray pt-0.5">
                      (512x512)
                    </small>
                  </Label>
                  <Input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setPhoto(file);
                    }}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Social Links</Label>
                  {socials.map((link) => (
                    <div key={link.id} className="flex items-center gap-2">
                      <Select
                        value={link.platform?.name}
                        onValueChange={(value) =>
                          updateSocial(
                            link.id,
                            "platform",
                            socialPlatforms.find(
                              (platform) => platform.name === value
                            ) || ({} as SocialPlatform)
                          )
                        }
                      >
                        <SelectTrigger id={`platform-${link.id}`}>
                          <SelectValue placeholder="Select Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {socialPlatforms.map((platform) => (
                            <SelectItem
                              key={platform._id}
                              value={platform.name}
                            >
                              <div className="inline-flex items-center gap-2">
                                <Image
                                  src={platform.icon}
                                  alt={`${platform.name} Icon`}
                                  width={24}
                                  height={24}
                                  className="w-5 aspect-square"
                                />
                                <span>{platform.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder={
                          link.platform?.placeholder
                            ? link.platform.placeholder
                            : "Select the platform first"
                        }
                        value={link.url}
                        onChange={(e) =>
                          updateSocial(link.id, "url", e.target.value)
                        }
                        disabled={!link.platform?.name}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSocial(link.id)}
                        aria-label="Remove social link"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 w-fit"
                    onClick={addSocial}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Social
                  </Button>
                </div>
              </form>
              <DialogFooter>
                <Button
                  type="submit"
                  form="edit-instructor-form"
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
            onClick={handleDeleteInstructor}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
