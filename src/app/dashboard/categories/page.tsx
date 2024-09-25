import { ResizableTemplateC } from "@/components/category/component";
import { ResizableTemplate } from "@/components/category/template";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Page() {
  return (
    <div className="bg-background max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
      <Tabs defaultValue="Template" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="Template">Template</TabsTrigger>
          <TabsTrigger value="Component">Component</TabsTrigger>
        </TabsList>
        <TabsContent value="Template">
          <div>
            <ResizableTemplate />
          </div>
        </TabsContent>
        <TabsContent value="Component">
          <ResizableTemplateC />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
