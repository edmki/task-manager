"use client";

import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  Sidebar,
} from "@/components/ui/sidebar";
import { useDroppable } from "@dnd-kit/react";

type TaskBlocksSidebarProps = {
  droppableId: string;
  children?: React.ReactNode;
};

export function TaskBlocksSidebar({
  droppableId,
  children,
}: TaskBlocksSidebarProps) {
  const { ref } = useDroppable({
    id: droppableId,
  });

  return (
    <Sidebar side="right">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <div
            ref={ref}
            className="flex flex-col gap-2 p-4 h-full overflow-y-auto"
          >
            {children}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
