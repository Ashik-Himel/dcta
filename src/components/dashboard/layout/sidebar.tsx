"use client";

import siteIcon from "@/assets/favicon.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, usePathname } from "@/i18n/navigation";
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Grid3X3,
  LayoutDashboard,
  MessageCircleMore,
  Star,
  Users,
} from "lucide-react";
import { Oleo_Script } from "next/font/google";
import Image from "next/image";
import { SheetClose } from "../../ui/sheet";
import { NavUser } from "./navUser";

const oleo = Oleo_Script({
  weight: ["400"],
  subsets: ["latin"],
});

const adminNavLinks = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Admissions",
    url: "/admin/admissions",
    icon: GraduationCap,
  },
  {
    title: "Contacts",
    url: "/admin/contacts",
    icon: MessageCircleMore,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Grid3X3,
  },
  {
    title: "Courses",
    url: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Instructors",
    url: "/admin/instructors",
    icon: Users,
  },
  {
    title: "Success Stories",
    url: "/admin/success-stories",
    icon: Star,
  },
  {
    title: "Back to Home",
    url: "/",
    icon: ArrowLeft,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar
      className="group-data-[collapsible=icon]:w-[50px]"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Image
                src={siteIcon.src}
                width={32}
                height={32}
                alt="Site Icon"
                className="w-8"
              />
              <div
                className={`group-data-[collapsible=icon]:hidden text-3xl font-semibold text-gradient ${oleo.className}`}
              >
                DCTA
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupLabel className="text-base mb-2">Menu</SidebarGroupLabel>
          <SidebarMenu>
            {adminNavLinks?.map((item) => (
              <SidebarMenuItem key={item.title}>
                {isMobile ? (
                  <SheetClose asChild>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <Link
                        href={item?.url}
                        className={
                          pathname === item?.url
                            ? "inline-flex bg-gradient text-white rounded-lg hover:!bg-gradient hover:!text-white active:!bg-gradient active:!text-white py-5"
                            : "py-5"
                        }
                      >
                        {item.icon && <item.icon />}
                        <span className="text-base font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SheetClose>
                ) : (
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link
                      href={item?.url}
                      className={
                        pathname === item?.url
                          ? "inline-flex bg-gradient text-white rounded-lg hover:!bg-gradient hover:!text-white active:!bg-gradient active:!text-white py-5"
                          : "py-5"
                      }
                    >
                      {item.icon && <item.icon />}
                      <span className="text-base font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
