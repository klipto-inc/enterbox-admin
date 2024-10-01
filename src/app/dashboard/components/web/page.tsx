"use client";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { WebTemplates } from "@/components/templates";
import CreateTemplate  from "@/components/templates/CreateTemplate";
import CreateComponent from "@/components/component/createComponent";
import { ComponentTemplates } from "@/components/component/ComponentTemplates";

export default function Page() {
  return (
    <div className="bg-background max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="account">Components</TabsTrigger>
          <TabsTrigger value="password">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div>
            <ComponentTemplates />
          </div>
        </TabsContent>
        <TabsContent value="password">
          <CreateComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
