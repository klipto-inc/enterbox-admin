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
import domtoimage from "dom-to-image";
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
  const captureRef = useRef<HTMLDivElement>(null); // Type for ref
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // New state to control the drawer

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

  useEffect(() => {
    // Dynamically inject Tailwind CSS
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (inputHtml) {
      setIsDrawerOpen(true);
    }
  }, [inputHtml]);

const handleCaptureClick = async () => {
  const images = captureRef.current?.querySelectorAll("img");

  if (images) {
    const loadPromises = Array.from(images).map(
      (img) =>
        new Promise((resolve, reject) => {
          if (img.complete) {
            resolve(true);
          } else {
            img.onload = () => resolve(true);
            img.onerror = () => reject(false);
          }
        })
    );

    await Promise.all(loadPromises);
  }

  if (captureRef.current) {
    const canvas = await html2canvas(captureRef.current, {
      useCORS: true,
      width: captureRef.current.scrollWidth,
      height: captureRef.current.scrollHeight,
    });
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `templatecomp.png`;
    link.click();
  }
};


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitizedHtml = DOMPurify.sanitize(event.target.value);
    setInputHtml(sanitizedHtml);
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Html :</Label>
                  <textarea
                    // value={inputHtml}
                    onChange={handleInputChange}
                    className="w-full  h-40 p-2 border border-gray-300 rounded"
                    placeholder="Enter your HTML with Tailwind classes here..."
                  />
                </div>
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

          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent className="max-h-[90vh] ">
              <ScrollArea className="p-4 max-h-[80vh] overflow-auto relative">
                <div
                  ref={captureRef}
                  className="p-4 w-full rounded flex items-center justify-center text-black bg-white"
                  dangerouslySetInnerHTML={{
                    __html: `<div class='w-full'>${inputHtml}</div>`,
                  }}
                />
              </ScrollArea>

              <div className="flex items-center justify-center absolute z-[999] bottom-0 right-6 left-20 ">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        className="w-fit px-4 py-2  text-white shadow-purple-400 font-semibold border rounded-full p-2 my-3 bg-black"
                        onClick={handleCaptureClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={30}
                          height={30}
                          color={"#ffff"}
                          fill={"none"}
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 8H21M16 12V21M8 12V3M12 16H3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Capture a Template</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DrawerContent>
          </Drawer>
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
