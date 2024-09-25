"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import Api from "@/lib/api";
import { apiResponse } from "@/utils";
import React from "react";
import { toast } from "sonner"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Category = {
  _id: string;
  category: string;
  userId: string;
  __v: number;
};

export function ResizableTemplateC() {
  
  const [inputValue, setInputValue] = useState("");
let  [loading, setLoading ]= React.useState(false)
  let [cat, Setcat] = React.useState<Category[]>([]);
  let [newLoad, setNewLoad] = React.useState(false)
  const create = async () => {
    // if (input === "") return null;
setNewLoad(true)
    console.log("clicked");

    try {
      const response = await apiResponse.post("component/createwebcategory", {
        category: inputValue,
      });
        if (response.status === 200) {
          let data = response.data;
          console.log(data, "data");
          if (data?.data) {
            Setcat((prevState: any) => [
              ...prevState,
              { category: data?.data, _id: data._id },
            ]);
          }
          toast(data?.message)
 setInputValue("");

      }
      

        console.log(response, "response");
    
      // const newCat = { input };
      // setCategory([...category, newCat]);
      // setInput("");
      // if (inputRef.current) {
      //   inputRef.current.value = "";
      // }
    } catch (error:any) {
      let newerror = error?.response?.data.message;
        toast(`${newerror}`);
      console.log(error);
    } finally {
      setNewLoad(false)
    }
  };


   let DeleteCategory = async (id: string) => {
     toast("deleting");
     console.log(id, "product id ");
     try {
       let response = await apiResponse.delete(
         `component/deletecategory/${id}`
       );

       console.log(response, "response");

       if (response.status === 200) {
         let data = response?.data;
         toast(`${response?.data?.message}`);
         Setcat(data?.data);
      ;
       }
     } catch (error: any) {
       toast(error);
     } finally {
     }
   };

  let fetchNewCat = async () => {
    setLoading(true)
    try {
      let response = await apiResponse.get("component/getcategory");
      if (response.status === 200) {
        let data = response.data?.data
        Setcat(data);
          console.log(cat, "cat");
      }
    
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  React.useEffect(() => {
    fetchNewCat();
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[300px] w-full rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={25} className="min-w-80">
        <div className="flex h-full p-6 min-w-40">
          <span className="font-semibold flex flex-row gap-4">
            <Input
             
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  create();
                }
              }}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder="Component category"
            />
            <Button onClick={create} className="border" disabled={newLoad}>
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
              )}
            </Button>
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} className="min-w-80 grid h-full">
        <div className="flex h-full p-6 flex-wrap gap-2">
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <div
                    className="inline-flex h-8 w-24 items-center justify-center rounded-full border  px-2.5 py-0.5 text-purple-700 bg-gray-600 opacity-1 animate-pulse border-none"
                    key={index}
                  ></div>
                );
              })}
            </>
          ) : cat.length === 0 ? (
            <span className="inline-flex h-fit items-center justify-center rounded-full border border-green-500 px-2.5 py-0.5 text-green-700">
              <p className="whitespace-nowrap text-lg">No category</p>
            </span>
          ) : (
            <>
              {cat.map((value) => {
                return (
                  <div
                    className="inline-flex h-fit items-center justify-center rounded-full border border-purple-500 px-2.5 py-0.5 text-purple-700"
                    key={value?._id}
                  >
                    <p className="whitespace-nowrap text-lg">
                      {value.category}
                    </p>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          // variant="outline"
                          className="-me-1 ms-1.5 inline-block rounded-full bg-purple-200 p-3 text-purple-700 transition hover:bg-purple-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <div className="p-6 pt-0 text-center">
                          <svg
                            className="w-20 h-20 text-red-600 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <h3 className="text-xl font-normal text-white mt-5 mb-6">
                            Are you sure you want to delete {value.category}{" "}
                            Component Category?
                          </h3>
                          <DialogTrigger asChild>
                            <Button
                              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 cursor-pointer"
                              onClick={() => {
                                let id = value._id;
                                DeleteCategory(id);
                              }}
                            >
                              Yes, I&nbsp;m sure
                            </Button>
                          </DialogTrigger>

                          <DialogTrigger asChild>
                            <Button
                              className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center cursor-pointer"
                              data-modal-toggle="delete-user-modal"
                            >
                              No, cancel
                            </Button>
                          </DialogTrigger>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
