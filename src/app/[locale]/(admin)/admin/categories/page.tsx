import DashboardHeading from "@/components/dashboard/layout/heading";
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
import { Category } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { Metadata } from "next";
import AddCategory from "./addCategory";
import CategoryRow from "./categoryRow";

export const metadata: Metadata = {
  title: "Categories - Dashboard",
  description:
    "This is the DCTA's dashboard which can be accessed by DCTA's admin.",
  robots: { index: false, follow: false },
};

export default async function AdminCategories() {
  const res = await fetch(`${serverDomain}/api/categories`, {
    cache: "no-cache",
  });
  const data = await res.json();
  const categories = data?.categories;

  return (
    <>
      <DashboardHeading headingText="Categories" />
      <div className="p-4 space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Categories
            </h2>
            <p className="text-muted-foreground">
              Manage the categories of the courses.
            </p>
          </div>
          <AddCategory />
        </div>

        <Card className="bg-background">
          <CardHeader className="pb-2">
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              {categories.length}{" "}
              {categories.length > 1 ? "categories" : "category"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1">
              <Table className="[&_th]:px-4 [&_td]:px-4 [&_th]:text-nowrap [&_td]:text-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>Icon</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>BN Name</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category: Category) => (
                    <CategoryRow key={category?._id} category={category} />
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
