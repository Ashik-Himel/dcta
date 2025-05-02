import DashboardHeading from "@/components/dashboard/layout/heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { serverDomain } from "@/lib/variables";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import AddNote from "./addNote";
import ApplicationAction from "./applicationAction";
import DeleteApplication from "./deleteApplication";

export default async function ApplicationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const t = await getTranslations("Information.Courses");
  const t2 = await getTranslations("AdmissionPage.AdmissionSection");

  const res = await fetch(
    `${serverDomain}/api/applications/application/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  const application = data?.application;

  if (!application) {
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
      year: "2-digit",
    }).format(date);
  };

  return (
    <main>
      <DashboardHeading headingText="Application Details" />

      <div className="p-4 space-y-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Application Details
            </h2>
            <Link href="/admin/admissions">
              <Badge>
                <ArrowLeft /> Back
              </Badge>
            </Link>
          </div>
          <p className="text-muted-foreground">
            Here is the application details.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4 bg-background">
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">Applicant Information</h3>
                <span className="text-sm text-gray">
                  {formatDate(application?.date)}
                </span>
              </div>
              <Separator className="my-2" />
              <dl className="space-y-2">
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-medium">Name:</dt>
                  <dd className="break-all">{application?.fullName}</dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-medium">Email:</dt>
                  <dd className="break-all">{application?.email}</dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-medium">Phone:</dt>
                  <dd className="break-all">{application?.phone}</dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-medium">Address:</dt>
                  <dd className="break-all">{application?.address}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Course Information</h3>
              <Separator className="my-2" />
              <dl className="space-y-2">
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-medium">Course:</dt>
                  <dd className="break-all">{t(application?.course)}</dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-medium">Batch:</dt>
                  <dd>{t2(application?.batch)}</dd>
                </div>
              </dl>
            </div>

            <ApplicationAction
              status={application?.status}
              id={application?._id}
            />
          </Card>

          <Card className="p-6 space-y-6 bg-background">
            <div>
              <h3 className="text-lg font-semibold">Additional Messages</h3>
              <Separator className="my-2" />
              <div className="space-y-6 mt-4">
                {application?.message?.length > 0 && (
                  <div>
                    <p className="font-medium text-sm mb-1">
                      Student&apos;s Message
                    </p>
                    <p>{application?.message}</p>
                  </div>
                )}
                <AddNote
                  adminNote={application?.adminNote}
                  id={application?._id}
                />
              </div>
            </div>
            <div className="flex justify-end items-center gap-2 mt-auto">
              <DeleteApplication id={application?._id} />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
