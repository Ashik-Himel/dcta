import DashboardHeading from "@/components/dashboard/layout/heading";
import { serverDomain } from "@/lib/variables";
import { Metadata } from "next";
import { cookies } from "next/headers";
import AdmissionPageContent from "./pageContent";

export const metadata: Metadata = {
  title: "Admissions - Dashboarrd",
  description:
    "This is the DCTA's dashboard which can be accessed by DCTA's admin.",
  robots: { index: false, follow: false },
};

export default async function AdminAdmissions() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${serverDomain}/api/applications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });
  const data = await res.json();
  const allApplications = data?.allApplications;

  return (
    <>
      <DashboardHeading headingText="Admissions" />
      <AdmissionPageContent admissionsData={allApplications} />
    </>
  );
}
