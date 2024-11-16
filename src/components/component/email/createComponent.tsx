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
import { apiResponseFileUpload, apiResponse } from "@/utils";

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
import HtmlValue from "@/components/templates/HtmlValue";

type Category = {
  _id: string;
  category: string;
  userId: string;
  __v: number;
};

const CreateComponent = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<null | typeof Image>(null);
  const [isPremuim, setIsPremium] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputHtml, setInputHtml] = useState<string>("");
  let [newHtmlValue, setnewHtmlValue] = useState<string>("");
  let [cat, setCat] = useState<Category[]>([]);
  let [newLoad, setNewLoad] = useState<boolean>(false);
  const CreateTemplate = async () => {
    setNewLoad(true);
    // handleCapture();
    try {
      const newComponent = {
        name,
        category,
        image,
        isPremuim,
        preview,
      };
      let response = await apiResponseFileUpload.post(
        "emailcomponent/emailcomponentadmin",
        {
          name: name,
          category: category,
          image: image,
          isPremuim: isPremuim,
          html: newHtmlValue,
        }
      );

      console.log(newComponent);

      console.log(response);
      // setComponents([...components, newComponent]);

      //  alert("Component created successfully");
      if (response.status === 200) {
        toast("Component Created Successfully");
      }
    } catch (error: any) {
    } finally {
      setNewLoad(false);
    }
  };

  let fetchNewCat = async () => {
    setLoading(true);
    try {
      let response = await apiResponse.get("emailcomponent/reademailcategory");
      if (response.status === 200) {
        let data = response.data?.data;
        setCat(data);
        console.log(cat, "cat");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNewCat();
  }, []);

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
              <div className="grid w-full items-center gap-5">
                <div className="flex flex-col space-y-1.5 ">
                  <Label htmlFor="name">Template :</Label>
                  <Input
                    id="name"
                    placeholder="Name of your Template"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-row items-center justify-evenly gap-3">
                  <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder=" Select Category" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-black">
                      {cat &&
                        cat.map((item) => (
                          <SelectItem value={item.category} key={item._id}>
                            {item.category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <Input
                    id="picture"
                    type="file"
                    onChange={(e: any) => setImage(e?.target?.files[0])}
                  />
                </div>
                <HtmlValue
                  inputHtml={inputHtml}
                  setInputHtml={setInputHtml}
                  setnewHtmlValue={setnewHtmlValue}
                />
              </div>
            </form>
          </CardContent>

          {/* Radio button for Premium/Non-Premium */}
          <div className="flex flex-col space-y-1.5 mb-3 ml-7">
            <Label>Template Type:</Label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="templateType"
                  value="non-premium"
                  checked={!isPremuim}
                  onChange={() => setIsPremium(false)}
                  className="mr-2"
                />
                Non-Premium
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="templateType"
                  value="premium"
                  checked={isPremuim}
                  onChange={() => setIsPremium(true)}
                  className="mr-2"
                />
                Premium
              </label>
            </div>
          </div>

          <CardFooter className="flex justify-between">
            <button
              className="border px-4 p-1.5 rounded"
              onClick={CreateTemplate}
            >
              {newLoad ? (
                <div className="mx-4">
                  <svg
                    width={20}
                    height={20}
                    fill="currentColor"
                    className="mr-2 animate-spin "
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                  </svg>
                  {/* loading */}
                </div>
              ) : (
                " Create"
              )}{" "}
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

export default CreateComponent;
