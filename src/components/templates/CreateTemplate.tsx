"use client";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import DOMPurify from "dompurify";
import { apiResponse } from "@/utils";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import HtmlValue from "./HtmlValue";
const CreateTemplate = () => {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [children, setChildren] = useState("");
  const [image, setImage] = useState();
  const [id, setId] = useState(Number);
  const [isPremium, setIsPremium] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputHtml, setInputHtml] = useState<string>("");

  const [components, setComponents] = useState<
    {
      name: string;
      category: string;
      children: string;
      image: undefined;
      id: number;
      isPremium: boolean;
      preview: string;
    }[]
  >([]);

  const CreateTemplate = () => {
    setLoading(true);
    // handleCapture();
    const newComponent = {
      name,
      category,
      children,
      image,
      id,
      isPremium,
      preview,
    };
    console.log(newComponent);
    // setComponents([...components, newComponent]);
    setLoading(false);
    alert("Component created successfully");
  };






  return (
    <div className="py-4 px-24">
      <div className="mb-4 p-2">
        {/* form */}
        <Card className="w-full border-0 rounded-none h-[70vh] flex justify-center flex-col ">
          <CardHeader className=" flex items-center justify-center">
            <CardDescription>
              Deploy your new Template in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Template :</Label>
                  <Input
                    id="name"
                    placeholder="Name of your Template"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-row items-center justify-evenly gap-1">
                  <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder=" Select Category" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-black">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input id="picture" type="file" />
                </div>
                <HtmlValue inputHtml={inputHtml} setInputHtml={setInputHtml} />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <button
              className="border px-4 p-1.5 rounded"
              onClick={CreateTemplate}
            >
              Deploy
            </button>
          </CardFooter>
        </Card>
      </div>

      {/* <div className="mb-4 border p-4 bg-gray-300 rounded">
        <h2 className="text-lg text-center text-black shadow-purple-400 font-semibold mb-2">
          Preview:
        </h2>
      </div> */}
    </div>
  );
};

export default CreateTemplate;
