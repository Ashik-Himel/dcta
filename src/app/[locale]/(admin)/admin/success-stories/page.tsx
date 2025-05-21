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
import { Story } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import StoryRow from "./storyRow";

export const metadata: Metadata = {
  title: "Success Stories - Dashboard",
  description:
    "This is the DCTA's dashboard which can be accessed by DCTA's admin.",
  robots: { index: false, follow: false },
};

export default async function AdminSuccessStories() {
  const res = await fetch(`${serverDomain}/api/stories`, {
    cache: "no-cache",
  });
  const data = await res.json();
  const stories = data?.stories;

  return (
    <>
      <DashboardHeading headingText="Success Stories" />
      <div className="p-4 space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Success Stories
            </h2>
            <p className="text-muted-foreground">
              Manage all the success stories.
            </p>
          </div>
          <Button>
            <Plus /> Add Success Story
          </Button>
        </div>

        <Card className="bg-background">
          <CardHeader className="pb-2">
            <CardTitle>Success Stories</CardTitle>
            <CardDescription>
              {stories.length} success{" "}
              {stories.length > 1 ? "stories" : "story"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1">
              <Table className="[&_th]:px-4 [&_td]:px-4 [&_th]:text-nowrap [&_td]:text-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Thumbnail</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stories.map((story: Story) => (
                    <StoryRow key={story?._id} story={story} />
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
