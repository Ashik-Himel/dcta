import DashboardHeading from "@/components/dashboard/layout/heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { serverDomain } from "@/lib/variables";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import ContactAction from "./contactAction";
import DeleteContact from "./deleteContact";

export default async function ContactDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${serverDomain}/api/contacts/contact/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const contact = data?.contact;

  if (!contact) {
    return (
      <main>
        <DashboardHeading headingText="Application Details" />
        <p className="p-4">No application found!</p>
        <Button size="sm" asChild>
          <Link href="/admin/admissions">
            <ArrowLeft /> Back
          </Link>
        </Button>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <main>
      <DashboardHeading headingText="Contact Details" />

      <div className="p-4 space-y-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Contact Details
            </h2>
            <Link href="/admin/contacts">
              <Badge>
                <ArrowLeft /> Back
              </Badge>
            </Link>
          </div>
          <p className="text-muted-foreground">Here is the contact details.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4 bg-background">
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">User Information</h3>
                <span className="text-sm text-gray">
                  {formatDate(contact?.date)}
                </span>
              </div>
              <Separator className="my-2" />
              <dl className="space-y-2">
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-medium">Name:</dt>
                  <dd className="break-all">{contact?.name}</dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-medium">Email:</dt>
                  <dd className="break-all">{contact?.email}</dd>
                </div>
              </dl>
            </div>
            <ContactAction status={contact?.status} id={contact?._id} />
          </Card>

          <Card className="p-6 space-y-6 bg-background">
            <div>
              <h3 className="text-lg font-semibold">Message Details</h3>
              <Separator className="my-2" />
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <p className="font-medium">Subject</p>
                  <p>{contact?.subject}</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Message</p>
                  <p>{contact?.message}</p>
                </div>
              </div>
            </div>
            <div className="mt-auto flex justify-end items-center gap-2">
              <Button variant="outline" asChild>
                <Link
                  href="https://mail.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Gmail
                </Link>
              </Button>
              <DeleteContact id={contact?._id} />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
