"use client";

import { Menu } from "lucide-react";

import Sidebar from "./sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar  />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;