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
  DrawerContent,
 
} from "@/components/ui/drawer";
import { toast } from "sonner";
import parse from "html-react-parser";



interface CaptureProps {
  inputHtml: string;
  setInputHtml: React.Dispatch<React.SetStateAction<string>>;
  setnewHtmlValue: React.Dispatch<React.SetStateAction<string>>;
  setImage?: React.Dispatch<React.SetStateAction<null | string>>;
}

export default function HtmlValue({
  inputHtml,
  setInputHtml,
  setImage,
  setnewHtmlValue,
}: CaptureProps) {
  //   const [inputHtml, setInputHtml] = useState<string>("");
  const captureRef = useRef<HTMLDivElement>(null); // Type for ref
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // New state to control the drawer

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://cdn.tailwindcss.com/3.4.3";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (inputHtml) {
      setTimeout(() => {
        setIsDrawerOpen(true);
      }, 500); // Add a delay to ensure Tailwind has loaded
    }
  }, [inputHtml]);

  const downloadImage = (base64Image: string, filename: string) => {
    const link = document.createElement("a");
    link.href = base64Image;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up after download
  };

  const create = async () => {
    // if (input === "") return null;

    console.log("inputHtml", inputHtml);
    setIsDrawerOpen(false);
    toast("converting to image..");

    try {
      const response = await apiResponse.post("category/capturehtml", {
        htmlContent: inputHtml,
      });
      const data = await response.data;
      let newData = data?.data;
      console.log(newData, "response");

      if (response.status === 200) {
        toast("Image captured successfully");
      }

      const screenshotBase64 = `data:image/png;base64,${data?.data}`;

      // Trigger the download of the image

      downloadImage(screenshotBase64, "screenshot.png");

      // const newCat = { input };
      // setCategory([...category, newCat]);
      // setInput("");
      // if (inputRef.current) {
      //   inputRef.current.value = "";
      // }
    } catch (error: any) {
      console.log(error);
      setIsDrawerOpen(true);
    } finally {
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setnewHtmlValue(event.target.value);
    const sanitizedHtml = DOMPurify.sanitize(event.target.value);
    setInputHtml(sanitizedHtml);
  };

  return (
    <div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Html :</Label>
        <textarea
          // value={inputHtml}
          onChange={handleInputChange}
          className="w-full  h-40 p-2 border border-gray-300 rounded"
          placeholder="Enter your HTML with Tailwind classes here..."
        />
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh] ">
          <ScrollArea className="p-4 max-h-[80vh] overflow-auto relative">
            <div
              ref={captureRef}
              className="p-4 w-full rounded flex items-center justify-center text-black bg-white"
              dangerouslySetInnerHTML={{
                __html: `<div class='w-full prose'>${inputHtml}</div>`,
              }}
            />
          </ScrollArea>

          <div className="flex items-center justify-center absolute z-[999] bottom-0 right-6 left-20 ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    className="w-fit px-4 py-2  text-white shadow-purple-400 font-semibold border rounded-full p-2 my-3 bg-black"
                    onClick={create}
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
    </div>
  );
}
