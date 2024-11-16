"use client";
import React from "react";
import { apiResponse } from "@/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface WebTemTypes {
  _id: string;
  category: string;
  image: string;
  name: string;
  isPremuim: boolean;
  html: string;
  _v: number;
}
export const ComponentTemplates = () => {
  let [data, setData] = React.useState<WebTemTypes[]>([]);
  let [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState<number>(1);
  const [paginatedloading, setPaginatedLoading] =
    React.useState<boolean>(false);
  const [hasMore, setHasMore] = React.useState<boolean>(true); // Add hasMore state
  const observer = React.useRef<IntersectionObserver | null>(null);

  const fetchWebTemplate = React.useCallback(
    async (page: number, isPagination: boolean) => {
      if (isPagination) {
        setPaginatedLoading(true);
      } else {
        setLoading(true);
      }
      try {
        let response = await apiResponse.get(
          `emailcomponent/emailcomponentadmin?page=${page}&limit=6`
        );

        if (response.status === 200) {
          let responseData = response?.data;
          let newItems = responseData?.data;

          if (isPagination) {
            // Append new items to the existing data
            setData((prevData) => [...prevData, ...newItems]);
          } else {
            // Replace data when not paginating (initial fetch)
            setData(responseData?.data);
          }

          // Check if there are no more items to load
          if (newItems.length === 0) {
            setHasMore(false); // No more items to load
          }
        }
      } catch (error: any) {
        console.error("Error fetching web Template:", error);
      } finally {
        if (isPagination) {
          setPaginatedLoading(false);
        } else {
          setLoading(false);
        }
      }
    },
    [] // Empty dependency array (add dependencies if necessary)
  );

  React.useEffect(() => {
    console.log(data, "updated data");
  }, [data]); // This will log the data after every update

  React.useEffect(() => {
    fetchWebTemplate(1, false);
  }, [fetchWebTemplate]);



  let DeleteCategory = async (id: string) => {
     toast("deleting");
     console.log(id, "product id ");
     try {
       let response = await apiResponse.delete(
         `emailcomponent/deletewebcomponent/${id}`
       );

       console.log(response, "response");

       if (response.status === 200) {
      
         toast(`${response?.data?.message}`);
         window.location.reload()
      ;
       }
     } catch (error: any) {
       toast(error);
     } finally {
     }
  };
  
  React.useEffect(() => {
    if (paginatedloading || loading || !hasMore) return;
    const target = document.getElementById("scroll-anchor");

    if (observer.current) observer.current.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(callback);

    if (target) {
      observer.current.observe(target);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [paginatedloading, loading, hasMore]);

  React.useEffect(() => {
    if (page > 1 && hasMore) {
      fetchWebTemplate(page, true); // Fetch next page for pagination
    }
  }, [page, fetchWebTemplate, hasMore]);

  return (
    <div>
      <div className="grid  mb-40 gap-x-2 md:gap-x-2 lg:gap-x-3 gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg::grid-cols-3 xl:grid-cols-4 mt-8">
        {loading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => {
              return (
                <div
                  className="space-y-5 rounded-2xl bg-white/5 p-4"
                  key={index}
                >
                  <div
                    className=" h-36 rounded-lg relative 
    before:absolute before:inset-0
    before:-translate-x-full
    before:animate-[shimmers_2s_infinite]
    before:bg-gradient-to-r
    before:from-transparent before:via-rose-100/10 before:to-transparent
                            isolate
    overflow-hidden
    shadow-xl shadow-black/5
    before:border-t before:border-rose-100/10"
                  ></div>
                  <div className="space-y-3 ">
                    <div className="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
                    <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
                    <div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {data.map((data) => {
              return (
                <div
                  className="h-auto w-full flex items-center justify-center rounded-t-lg boder"
                  key={data._id}
                >
                  <article className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-black border border-[#27272A]">
                    <div>
                      <img
                        className="object-cover h-48 w-full"
                        draggable={false}
                        src={data?.image}
                        alt="Converse sneakers"
                      />
                    </div>
                    <div className="flex flex-col gap-1 mt-0 px-4 py-2">
                      <h2 className="text-sm font-normal text-gray-800 dark:text-gray-50">
                        {data?.name}
                      </h2>
                      <div className="flex flex-row items-center gap-1">
                        <span className="text-sm">Category:</span>
                        <p className="text-muted text-[10px] mb-0 text-green-600 bg-gray-100 rounded-full px-2 py-0.5 w-fit">
                          {data?.category}
                        </p>
                      </div>
                    </div>
                    <div className="mt-0 px-1 py-2 border-t border-opacity-80 border-gray-100 dark:border-gray-900">
                      <div className="w-full flex justify-between items-center font-bold cursor-pointer text-gray-800 dark:text-gray-50">
                        <div className="flex space-x-2">
                          {data.isPremuim ? (
                            <span className="rounded-md text-sm px-2 font-medium text-gray-600 flex items-center gap-2">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth={0}
                                viewBox="0 0 640 512"
                                className="text-[#eb9f25] mb-0.5"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z" />
                              </svg>
                              Premium
                            </span>
                          ) : (
                            <span className="rounded-md text-sm px-2 font-medium text-gray-600">
                              Free
                            </span>
                          )}
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                            // variant="outline"
                            >
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    {" "}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-[18px]"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                      />
                                    </svg>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>delete</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
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
                                Are you sure you want to delete {data?.name}{" "}
                                Component ?
                              </h3>
                              <DialogTrigger asChild>
                                <Button
                                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 cursor-pointer"
                                  onClick={() => {
                                    let id = data?._id;
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
                    </div>
                  </article>
                </div>
              );
            })}

            {paginatedloading && (
              <>
                {Array.from({ length: 4 }).map((_, index) => {
                  return (
                    <div
                      className="space-y-5 rounded-2xl bg-white/5 p-4"
                      key={index}
                    >
                      <div className="h-36 rounded-lg bg-gradient-to-r"></div>
                      <div className="space-y-3 ">
                        <div className="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
                        <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
                        <div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
        <div id="scroll-anchor" style={{ height: "1px" }}></div>
      </div>
    </div>
  );
};
