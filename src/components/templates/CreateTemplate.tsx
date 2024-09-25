"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
    setComponents([...components, newComponent]);
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

  const handleCaptureClick = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `component.png`;
      link.click();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitizedHtml = DOMPurify.sanitize(event.target.value);
    setInputHtml(sanitizedHtml);
  };

  return (
    <div className="p-4 grid grid-cols-2 gap-3">
      <div className="mb-4 p-2">

        {/* form */}
        <Card className="w-full border-0 rounded-none h-[70vh] flex justify-center flex-col border-r border-gray-500">
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
              onClick={() => alert("yahhh")}
            >
              Deploy
            </button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-4 border p-4 bg-gray-300 rounded">
        <h2 className="text-lg text-center text-black shadow-purple-400 font-semibold mb-2">Preview:</h2>
        {
          inputHtml? (
          <div
          ref={captureRef}
          className="p-4 bg-white border w-fit min-w-[200px] rounded flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: inputHtml }}
        />) : null

        }
        
      </div>
    </div>
  );
};

export default CreateTemplate;
