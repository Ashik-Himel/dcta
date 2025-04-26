import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions - Dashboarrd",
  description:
    "This is the DCTA's dashboard which can be accessed by DCTA's admin.",
  robots: { index: false, follow: false },
};

export default function AdminAdmissions() {
  return (
    <main>
      <DashboardHeading headingText="Admissions" />
      <div className="p-4">Admin Admissions Page</div>
    </main>
  );
}
