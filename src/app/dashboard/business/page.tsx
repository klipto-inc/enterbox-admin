/**
 * v0 by Vercel.
 * @see https://v0.dev/t/D53X1JN2bIj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [businessesPerPage] = useState(10);
  const businesses = [
    {
      id: 1,
      name: "Acme Inc.",
      owner: "John Doe",
      industry: "Technology",
      status: "Active",
    },
    {
      id: 2,
      name: "Widgets Co.",
      owner: "Jane Smith",
      industry: "Manufacturing",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Gizmos LLC",
      owner: "Bob Johnson",
      industry: "Retail",
      status: "Active",
    },
    {
      id: 4,
      name: "Gadgets Inc.",
      owner: "Sarah Lee",
      industry: "Technology",
      status: "Active",
    },
    {
      id: 5,
      name: "Doodads Corp.",
      owner: "Tom Wilson",
      industry: "Wholesale",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Thingamajigs Ltd.",
      owner: "Emily Davis",
      industry: "Services",
      status: "Active",
    },
    {
      id: 7,
      name: "Whatchamacallits Inc.",
      owner: "Michael Brown",
      industry: "Retail",
      status: "Active",
    },
    {
      id: 8,
      name: "Doohickeys Co.",
      owner: "Jessica Taylor",
      industry: "Manufacturing",
      status: "Inactive",
    },
    {
      id: 9,
      name: "Thingies LLC",
      owner: "David Anderson",
      industry: "Services",
      status: "Active",
    },
    {
      id: 10,
      name: "Whatnots Inc.",
      owner: "Olivia Thompson",
      industry: "Wholesale",
      status: "Active",
    },
    {
      id: 11,
      name: "Doodads Corp.",
      owner: "Tom Wilson",
      industry: "Wholesale",
      status: "Inactive",
    },
    {
      id: 12,
      name: "Thingamajigs Ltd.",
      owner: "Emily Davis",
      industry: "Services",
      status: "Active",
    },
  ];
  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastBusiness = currentPage * businessesPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
  const currentBusinesses = filteredBusinesses.slice(
    indexOfFirstBusiness,
    indexOfLastBusiness
  );
  const totalPages = Math.ceil(filteredBusinesses.length / businessesPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  return (
    <div className="bg-background max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
      <div className="mb-6 flex items-center justify-between">
        <div className="w-full space-y-2">
          <h2 className="truncate text-3xl font-medium tracking-tight">
            Business
          </h2>
          <p className="truncate text-base text-secondary">
            View and manage Business&apos;s
          </p>
        </div>
        <div className="relative w-full max-w-md">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or owner"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-lg bg-background pl-8 dark:border-[#27272A]"
          />
        </div>
      </div>
      <div className="overflow-x-auto border-[1px]  dark:border-[#27272A] rounded-md px-2">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-[#27272A]">
              <TableHead>Business Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBusinesses.map((business) => (
              <TableRow key={business.id} className="dark:border-[#27272A]">
                <TableCell className="font-medium">{business.name}</TableCell>
                <TableCell>{business.owner}</TableCell>
                <TableCell>{business.industry}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      business.status === "Active" ? "secondary" : "outline"
                    }
                  >
                    {business.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button size="icon" variant="ghost">
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button size="icon" variant="ghost">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-6 flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function EyeIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FilePenIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
