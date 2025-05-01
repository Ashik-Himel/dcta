/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import emptyIcon from "@/assets/icons/empty.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { courses } from "@/data/courses";
import { Link } from "@/i18n/navigation";
import { CalendarDays, ChevronDown, Filter, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function AdmissionPageContent({
  admissionsData,
}: {
  admissionsData: any[];
}) {
  const t = useTranslations("Information.Courses");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [courseFilter, setCourseFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter applications based on search term and filters
  const filteredApplications = admissionsData.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.course.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(app.status);
    const matchesCourse =
      courseFilter.length === 0 || courseFilter.includes(app.course);

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight">
          Admission Applications
        </h2>
        <p className="text-muted-foreground">
          Manage and review student applications.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background h-9"
          />
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 lg:px-4 cursor-pointer select-none"
          >
            <Search className="h-4 w-4" />
            <span className="ml-2 hidden lg:inline">Search</span>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 cursor-pointer select-none"
              >
                <Filter className="mr-2 h-4 w-4" />
                Status
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["New", "Called", "Admitted", "Rejected"].map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={statusFilter.includes(status)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, status]);
                    } else {
                      setStatusFilter(statusFilter.filter((s) => s !== status));
                    }
                  }}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 cursor-pointer select-none"
              >
                <Filter className="mr-2 h-4 w-4" />
                Course
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Course</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {courses
                .map((course) => course.title)
                .map((courseTitle) => (
                  <DropdownMenuCheckboxItem
                    key={courseTitle}
                    checked={courseFilter.includes(courseTitle)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCourseFilter([...courseFilter, courseTitle]);
                      } else {
                        setCourseFilter(
                          courseFilter.filter((c) => c !== courseTitle)
                        );
                      }
                    }}
                  >
                    {t(courseTitle)}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-2">
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            {filteredApplications.length} application
            {filteredApplications.length > 1 && "s"} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            {currentItems.length === 0 ? (
              <div className="py-4">
                <Image
                  src={emptyIcon}
                  alt="Empty Icon"
                  className="w-full max-w-[100px] mx-auto"
                />
                <h4 className="text-2xl font-semibold mt-4 text-center">
                  No Data Found!
                </h4>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Course
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((application) => (
                    <TableRow key={application._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{application.fullName}</p>
                          <p className="text-xs text-muted-foreground">
                            {application.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {t(application.course)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center">
                          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(application.date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            application.status === "New"
                              ? "bg-gradient"
                              : application.status === "Called"
                              ? "bg-yellow-500"
                              : application.status === "Admitted"
                              ? "bg-green-500"
                              : application.status === "Rejected"
                              ? "bg-red-500"
                              : ""
                          }
                        >
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" asChild>
                          <Link href={`/admin/admissions/${application._id}`}>
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredApplications.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {filteredApplications.length}
                </span>{" "}
                results
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer select-none"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around current page
                    let pageToShow = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageToShow = currentPage - 2 + i;
                    }
                    if (pageToShow > totalPages) return null;

                    return (
                      <Button
                        key={pageToShow}
                        variant={
                          currentPage === pageToShow ? "default" : "outline"
                        }
                        size="sm"
                        className="w-8 cursor-pointer select-none"
                        onClick={() => setCurrentPage(pageToShow)}
                      >
                        {pageToShow}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="px-2">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8 cursor-pointer select-none"
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer select-none"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
