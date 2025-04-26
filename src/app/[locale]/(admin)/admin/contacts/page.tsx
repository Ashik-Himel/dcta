import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts - Dashboard",
  description:
    "This is the DCTA's dashboard which can be accessed by DCTA's admin.",
  robots: { index: false, follow: false },
};

export default function AdminContacts() {
  return (
    <main>
      <DashboardHeading headingText="Contacts" />
      <div className="p-4">Admin Contacts Page</div>
    </main>
  );
}
