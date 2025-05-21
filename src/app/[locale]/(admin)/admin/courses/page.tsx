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
import { Course } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import CourseRow from "./courseRow";

export const metadata: Metadata = {
  title: "Courses - Dashboard",
  description:
    "This is the DCTA's dashboard which can be accessed by DCTA's admin.",
  robots: { index: false, follow: false },
};

export default async function AdminCourses() {
  const res = await fetch(`${serverDomain}/api/courses`, {
    cache: "no-cache",
  });
  const data = await res.json();
  const courses = data?.courses;

  return (
    <>
      <DashboardHeading headingText="Courses" />
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Courses
            </h2>
            <p className="text-muted-foreground">Manage all the courses.</p>
          </div>
          <Button>
            <Plus /> Add Course
          </Button>
        </div>

        <Card className="bg-background">
          <CardHeader className="pb-2">
            <CardTitle>Courses</CardTitle>
            <CardDescription>
              {courses.length} {courses.length > 1 ? "courses" : "course"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1">
              <Table className="[&_th]:px-4 [&_td]:px-4 [&_th]:text-nowrap [&_td]:text-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>Thumbnail</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Badge</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course: Course) => (
                    <CourseRow key={course?._id} course={course} />
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
