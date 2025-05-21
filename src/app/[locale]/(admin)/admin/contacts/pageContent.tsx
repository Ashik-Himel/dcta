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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import { Contact } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { CalendarDays, Check, ChevronDown, Filter, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ContactsPageContent({
  contactsData,
}: {
  contactsData: any[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter contacts based on search term and filters
  const filteredContacts = contactsData.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact._id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(contact.status);

    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Contacts
        </h2>
        <p className="text-muted-foreground">
          Manage and respond to contact form submissions.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 bg-background"
          />
          <Button variant="outline" size="sm" className="h-9 px-3 lg:px-4">
            <Search className="h-4 w-4" />
            <span className="ml-2 hidden lg:inline">Search</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Status
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["New", "Read", "Replied"].map((status) => (
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
        </div>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-2">
          <CardTitle>Contacts</CardTitle>
          <CardDescription>
            {filteredContacts.length} contact
            {filteredContacts.length > 1 && "s"} found
          </CardDescription>
        </CardHeader>
        <CardContent>
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
            <div className="grid grid-cols-1">
              <Table className="[&_th]:px-4 [&_td]:px-4 [&_th]:text-nowrap [&_td]:text-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((contact) => (
                    <ContactRow key={contact?._id} contact={contact} />
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-t">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredContacts.length)}
              </span>{" "}
              of <span className="font-medium">{filteredContacts.length}</span>{" "}
              results
            </div>
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
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
                      className="w-8"
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
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ContactRow({ contact }: { contact: Contact }) {
  const token = Cookies.get("token");
  const [currentStatus, setCurrentStatus] = useState(contact.status);
  const [newStatus, setNewStatus] = useState(contact.status);

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

  const handleStatusChange = async () => {
    const res = await fetch(
      `${serverDomain}/api/contacts/contact/${contact._id}/status`,
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
        text: "Contact status updated successfully.",
        icon: "success",
        iconColor: "#ff0000",
        confirmButtonColor: "#ff0000",
      });
      setCurrentStatus(newStatus);
    } else {
      Swal.fire({
        title: "Error",
        text: data?.message || "Something went wrong.",
        icon: "error",
        iconColor: "#ff0000",
        confirmButtonColor: "#ff0000",
      });
    }
  };

  return (
    <TableRow>
      <TableCell>{contact.id}</TableCell>
      <TableCell>
        <div>
          <p className="font-medium">{contact.name}</p>
          <p className="text-xs text-muted-foreground">{contact.email}</p>
        </div>
      </TableCell>
      <TableCell className="w-max max-w-[220px] overflow-hidden text-ellipsis">
        {contact.subject}
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{formatDate(contact.date)}</span>
        </div>
      </TableCell>
      <TableCell>
        <Select
          value={newStatus}
          onValueChange={(value: "New" | "Read" | "Replied") =>
            setNewStatus(value)
          }
        >
          <SelectTrigger className="w-[130px] h-8">
            <SelectValue>
              <Badge
                className={
                  newStatus === "New"
                    ? "bg-gradient"
                    : newStatus === "Read"
                    ? "bg-yellow-500"
                    : newStatus === "Replied"
                    ? "bg-green-500"
                    : ""
                }
              >
                {newStatus}
              </Badge>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Read">Read</SelectItem>
            <SelectItem value="Replied">Replied</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right">
        {currentStatus !== newStatus ? (
          <Button size="sm" className="!px-5" onClick={handleStatusChange}>
            <Check />
          </Button>
        ) : (
          <Button size="sm" asChild>
            <Link href={`/admin/contacts/${contact._id}`}>View</Link>
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
