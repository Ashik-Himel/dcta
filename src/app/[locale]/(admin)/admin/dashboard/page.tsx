import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - DCTA",
  description:
    "This is the DCTA's dashboard which can be accessed by DCTA's admin.",
  robots: { index: false, follow: false },
};

export default function AdminDashboard() {
  return (
    <main>
      <DashboardHeading headingText="Dashboard" />
      <div className="p-4">Admin Dashboard Page</div>
    </main>
  );
}
