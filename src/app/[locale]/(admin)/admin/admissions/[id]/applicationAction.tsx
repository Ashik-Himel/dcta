"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ApplicationAction({
  status,
  id,
}: {
  status: string;
  id: string;
}) {
  const token = Cookies.get("token");
  const [currentStatus, setCurrentStatus] = useState<string>(status);
  const [selectedStatus, setSelectedStatus] = useState<string>(status);
  const [submitting, setSubmitting] = useState(false);

  const handleApplicationAction = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const newStatus = formData.get("status") as string;

    const res = await fetch(
      `${serverDomain}/api/admission/application/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );
    const data = await res.json();

    if (data?.ok) {
      Swal.fire({
        title: "Status Updated",
        text: "Application status updated successfully.",
        icon: "success",
      });
      setCurrentStatus(newStatus);
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
    <div>
      <h3 className="text-lg font-semibold">Application Status</h3>
      <Separator className="my-2" />
      <div className="space-y-2">
        <div className="flex justify-between items-center gap-4">
          <span className="font-medium">Current Status:</span>
          <Badge
            className={
              currentStatus === "New"
                ? "bg-gradient"
                : currentStatus === "Called"
                ? "bg-yellow-500"
                : currentStatus === "Admitted"
                ? "bg-green-500"
                : currentStatus === "Rejected"
                ? "bg-red-500"
                : ""
            }
          >
            {currentStatus}
          </Badge>
        </div>
        <form
          className="flex justify-between items-center gap-4"
          onSubmit={handleApplicationAction}
        >
          <span className="font-medium">Mark As:</span>
          <div className="flex items-center gap-2">
            <select
              name="status"
              id="status"
              defaultValue={currentStatus}
              className="bg-[#faf0f0] dark:bg-[#2f1010] px-2 py-[6.8px] rounded-md cursor-pointer select-none text-sm"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="New">New</option>
              <option value="Called">Called</option>
              <option value="Admitted">Admitted</option>
              <option value="Rejected">Rejected</option>
            </select>
            <Button
              size="sm"
              type="submit"
              className="cursor-pointer select-none"
              disabled={selectedStatus === currentStatus || submitting}
            >
              Update Status
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
