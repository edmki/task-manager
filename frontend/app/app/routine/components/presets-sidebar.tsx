"use client";

import { DialogTrigger } from "@/components/ui/dialog";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  Sidebar,
} from "@/components/ui/sidebar";
import { Preset } from "@/services/presets.service";
import { Dialog } from "@base-ui/react";
import { Plus } from "lucide-react";

type PresetsSidebarProps = {
  children?: React.ReactNode;
  dialogHandle?: Dialog.Handle<Preset>;
};

export function PresetsSidebar({
  children,
  dialogHandle,
}: PresetsSidebarProps) {
  return (
    <Sidebar side="right">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <div className="flex flex-col gap-2 p-4 h-full overflow-y-auto">
            {children}
          </div>
          <DialogTrigger
            handle={dialogHandle}
            render={
              <button className="text-sm text-zinc-500 hover:text-zinc-600 transition-colors border border-zinc-500 hover:border-zinc-600 rounded-md p-3 mx-4 cursor-pointer">
                <Plus className="w-full h-4" />
              </button>
            }
          ></DialogTrigger>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
