import DashboardHeading from "@/components/dashboard/layout/heading";
import { serverDomain } from "@/lib/variables";
import { Metadata } from "next";
import { cookies } from "next/headers";
import ContactsPageContent from "./pageContent";

export const metadata: Metadata = {
  title: "Contacts - Dashboard",
  description:
    "This is the DCTA's dashboard which can be accessed by DCTA's admin.",
  robots: { index: false, follow: false },
};

export default async function AdminContacts() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${serverDomain}/api/contact/all-contacts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const allContacts = data?.allContacts;

  return (
    <>
      <DashboardHeading headingText="Contacts" />
      <ContactsPageContent contactsData={allContacts} />
    </>
  );
}
