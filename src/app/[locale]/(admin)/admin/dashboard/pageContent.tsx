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
import { Link } from "@/i18n/navigation";
import { CalendarDays, Clock, MessageSquare, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function DashboardPageContent({
  stats,
  recentApplications,
  recentContacts,
}: {
  stats: any;
  recentApplications: any[];
  recentContacts: any[];
}) {
  const t = useTranslations("Information.Courses");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    }).format(date);
  };
  const formatDate2 = (dateString: string) => {
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
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Dashboard
        </h2>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              New Applications
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.newApplicationsCount || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">New Contacts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.newContactsCount || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.applicationsCount || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Contacts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.contactsCount || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-background">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Here are the recent applications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 overflow-x-auto">
              {recentApplications?.length === 0 ? (
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
                recentApplications?.map((application) => (
                  <div
                    key={application._id}
                    className="flex items-center justify-between gap-6 w-full min-w-fit text-nowrap"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="space-y-1">
                        <p className="font-medium">{application.fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          {application.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {t(application.course)}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="mr-1 h-3 w-3" />
                          {formatDate(application.date)}
                        </div>
                      </div>
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
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <Button asChild variant="outline">
                <Link href="/admin/admissions">View All Applications</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 bg-background">
          <CardHeader>
            <CardTitle>Recent Contacts</CardTitle>
            <CardDescription>Here are the new contacts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 overflow-x-auto">
              {recentContacts?.length === 0 ? (
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
                recentContacts?.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex items-center justify-between gap-6 w-full min-w-fit text-nowrap"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="space-y-1">
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {contact.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatDate2(contact.date)}
                        </div>
                      </div>
                      <Badge
                        className={
                          contact.status === "New"
                            ? "bg-gradient"
                            : contact.status === "Read"
                            ? "bg-yellow-500"
                            : contact.status === "Replied"
                            ? "bg-green-500"
                            : ""
                        }
                      >
                        {contact.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <Button asChild variant="outline">
                <Link href="/admin/contacts">View All Contacts</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
