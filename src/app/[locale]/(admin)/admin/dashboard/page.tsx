import DashboardHeading from "@/components/dashboard/layout/heading";
import { serverDomain } from "@/lib/variables";
import { Metadata } from "next";
import { cookies } from "next/headers";
import DashboardPageContent from "./pageContent";

export const metadata: Metadata = {
  title: "Dashboard - DCTA",
  description:
    "This is the DCTA's dashboard which can be accessed by DCTA's admin.",
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${serverDomain}/api/admin/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const stats = data?.stats;

  const res2 = await fetch(`${serverDomain}/api/applications/recent`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data2 = await res2.json();
  const recentApplications = data2?.recentApplications;

  const res3 = await fetch(`${serverDomain}/api/contacts/recent`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data3 = await res3.json();
  const recentContacts = data3?.recentContacts;

  return (
    <>
      <DashboardHeading headingText="Dashboard" />
      <DashboardPageContent
        stats={stats}
        recentApplications={recentApplications}
        recentContacts={recentContacts}
      />
    </>
  );
}
