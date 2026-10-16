"use client";

import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  Sidebar,
} from "@/components/ui/sidebar";

type PresetsSidebarProps = {
  children?: React.ReactNode;
};

export function PresetsSidebar({ children }: PresetsSidebarProps) {
  return (
    <Sidebar side="right">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <div className="flex flex-col gap-2 p-4 h-full overflow-y-auto">
            {children}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
