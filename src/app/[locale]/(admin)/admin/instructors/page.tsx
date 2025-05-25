import DashboardHeading from "@/components/dashboard/layout/heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Instructor } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import InstructorRow from "./instructorRow";

export const metadata: Metadata = {
  title: "Instructors - Dashboard",
  description:
    "This is the DCTA's dashboard which can be accessed by DCTA's admin.",
  robots: { index: false, follow: false },
};

export default async function AdminInstructors() {
  const res = await fetch(`${serverDomain}/api/instructors`, {
    cache: "no-cache",
  });
  const data = await res.json();
  const instructors = data?.instructors;

  return (
    <>
      <DashboardHeading headingText="Instructors" />
      <div className="p-4 space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Instructors
            </h2>
            <p className="text-muted-foreground">
              Manage all the instructors information.
            </p>
          </div>
          <Button>
            <Plus /> Add Instructor
          </Button>
        </div>

        <Card className="bg-background">
          <CardHeader className="pb-2">
            <CardTitle>Instructors</CardTitle>
            <CardDescription>
              {instructors.length}{" "}
              {instructors.length > 1 ? "instructors" : "instructor"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1">
              <Table className="[&_th]:px-4 [&_td]:px-4 [&_th]:text-nowrap [&_td]:text-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Socials</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instructors.map((instructor: Instructor) => (
                    <InstructorRow
                      key={instructor?._id}
                      instructor={instructor}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
