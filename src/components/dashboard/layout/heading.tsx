import { ThemeToggler } from "../../theme/themeToggler";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { SidebarTrigger } from "../../ui/sidebar";
import LogoutToggle from "./logoutToggle";

export default function DashboardHeading({
  headingText,
}: {
  headingText: string;
}) {
  return (
    <header className="sticky top-0 z-50 bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="w-full flex justify-between items-center gap-4">
        <h4 className="text-lg font-medium">{headingText}</h4>
        <div className="flex items-center gap-4">
          <ThemeToggler />
          <LogoutToggle
            triggerElement={
              <Button className="cursor-pointer select-none">Logout</Button>
            }
          />
        </div>
      </div>
    </header>
  );
}
