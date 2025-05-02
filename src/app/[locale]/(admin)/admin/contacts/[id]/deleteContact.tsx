"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "@/i18n/navigation";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function DeleteContact({ id }: { id: string }) {
  const router = useRouter();
  const token = Cookies.get("token");

  const handleContactDelete = async () => {
    const res = await fetch(`${serverDomain}/api/contacts/contact/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (data?.ok) {
      Swal.fire({
        title: "Contact Deleted",
        text: "Contact deleted successfully.",
        icon: "success",
        iconColor: "#ff0000",
        confirmButtonColor: "#ff0000",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/admin/contacts");
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: data?.message || "Something went wrong.",
        icon: "error",
        iconColor: "#ff0000",
        confirmButtonColor: "#ff0000",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer select-none">Delete Contact</Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-48px)] sm:max-w-[425px] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle>Delete Contact?</DialogTitle>
        </DialogHeader>
        <p>Are you sure to delete this contact?</p>
        <DialogFooter className="flex-row-reverse">
          <DialogClose asChild>
            <Button
              onClick={handleContactDelete}
              className="cursor-pointer select-none"
            >
              Confirm Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
