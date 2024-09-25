"use client"
import React from 'react'
import { Sidebar } from "@/components";
import { playlists } from "@/data/playlists";
import { Navbar } from '@/components';
import { ScrollArea } from "@/components/ui/scroll-area";
export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <div className="flex lg:flex-row w-full h-full">
        <Sidebar playlists={playlists} className="hidden lg:block sticky z-0" />
        <div className='w-full'>
          <Navbar />
          <ScrollArea>

          {children}
          </ScrollArea>
        </div>
      </div>
    );
}
