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
import { useRouter } from "@/i18n/navigation";
import { bengali } from "@/lib/fonts";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

export default function AddInstructor() {
  const token = Cookies.get("token");
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  const handleAddInstructor = async (e: React.FormEvent<HTMLFormElement>) => {
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
    formData.append("photo", photo as Blob);
    formData.append("socials", JSON.stringify(newSocials));

    const response = await fetch(`${serverDomain}/api/instructors`, {
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
    setSocials([]);
    setDialogOpen(false);
    router.refresh();
    toast.success("Instructor added successfully!");
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Instructor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Instructor</DialogTitle>
          <DialogDescription>
            Add a new instructor to the platform.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4"
          id="add-instructor-form"
          onSubmit={handleAddInstructor}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter instructor name"
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
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="photo">
              Photo{" "}
              <small className="text-xs text-gray pt-0.5">(512x512)</small>
            </Label>
            <Input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              required
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
                  value={link.platform.name}
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
                      <SelectItem key={platform._id} value={platform.name}>
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
                  onChange={(e) => updateSocial(link.id, "url", e.target.value)}
                  disabled={!link.platform.name}
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
            form="add-instructor-form"
            disabled={submitting}
          >
            {submitting ? "Adding..." : "Add Instructor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
