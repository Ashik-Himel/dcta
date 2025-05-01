"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddNote({
  adminNote,
  id,
}: {
  adminNote: string | undefined;
  id: string;
}) {
  const token = Cookies.get("token");
  const [currentAdminNote, setCurrentAdminNote] = useState(adminNote || "");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleUpdateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const NewAdminNote = formData.get("adminNote") as string;

    const res = await fetch(
      `${serverDomain}/api/admission/application/${id}/adminNote`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ adminNote: NewAdminNote }),
      }
    );
    const data = await res.json();

    if (data?.ok) {
      Swal.fire({
        title: "Note Updated",
        text: "Admin note updated successfully.",
        icon: "success",
      });
      setCurrentAdminNote(NewAdminNote);
      setButtonDisabled(true);
    } else {
      Swal.fire({
        title: "Error",
        text: data?.message || "Something went wrong.",
        icon: "error",
      });
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleUpdateNote} className="space-y-2">
      <Label htmlFor="adminNote" className="font-medium">
        Admin Note:
      </Label>
      <Textarea
        id="adminNote"
        name="adminNote"
        placeholder="Add an admin note"
        defaultValue={currentAdminNote || ""}
        className="bg-[#faf0f0] dark:bg-[#2f1010] h-[120px] resize-none"
        onChange={() => buttonDisabled && setButtonDisabled(false)}
        required
      />
      <Button
        type="submit"
        className="cursor-pointer select-none"
        disabled={buttonDisabled || submitting}
      >
        {currentAdminNote ? "Update Note" : "Add Note"}
      </Button>
    </form>
  );
}
