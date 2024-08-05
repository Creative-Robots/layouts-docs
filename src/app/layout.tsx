
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import "@mintlify/mdx/dist/styles.css"

import { CiSearch } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { SheetContent } from "@/components/Sheet";

import {
  Sheet,
  SheetContent as SheetC,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ShadCn/Sheet"
import { cn } from "@/lib/cn";
import { FaChevronRight } from "react-icons/fa6";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

      {/** Header of the docs */}
      <div className="flex flex-col place-content-between border-b border-black/5 fixed z-10 w-[100%] backdrop-blur  bg-[#FDFDFD]">
        <div className="flex flex-row w-full h-fit p-4">
        <div className="flex flex-row gap-1.5 items-center w-fit mr-4">
          <img width={20} height={20} className="w-[20px]" alt="CreativeRobots" src={"https://dl.dropbox.com/scl/fi/2bxt0v45q4odj1rvxdqo4/Clip-path-group.svg?rlkey=j7y748ujkqvapbybc6wqcyxy8&st=vjtgh475&dl=0"}></img>
          <h1 className="text-base font-[Inter_Display] text-[#1E1F22]">Layouts.dev</h1>
          <Badge className="bg-[#F4F3F1] text-[#ED5F00] font-medium hover:bg-[#f4f3f1] py-1 h-min">Docs</Badge>
        </div>
        <div className="flex flex-row gap-3 items-center flex-1 max-w-72 ml-auto">
          <div className="flex flex-row py-1.5 px-3 gap-1 shadow-sm border border-black/5 w-full rounded-lg bg-white">
            <CiSearch className="w-4 text-black/40" width={16} height={16}/>
            <input type="text" placeholder="Search..." className="text-sm text-black/40 focus:outline-none w-12 flex-1"></input>
          </div>
          <div className="p-2 rounded hover:bg-black/5">
            <IoSunnyOutline className="text-[#1E1F22]" width={16} height={16}/>
          </div>
        </div>
        </div>

        {/** Sheet if small */}
        <div className="h-12 w-full flex flex-row border-t border-black/5 md:hidden">
          <Sheet>
            <SheetTrigger className=" hover:bg-gray-100 rounded-md size-fit my-auto p-1 ml-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></SheetTrigger>
            <SheetC className="bg-white overflow-y-scroll" side={'left'}>
              <SheetHeader className="mb-4">
                <SheetTitle className="flex flex-row justify-center gap-4">
                  <img width={20} height={20} className="w-[20px]" alt="CreativeRobots" src={"https://dl.dropbox.com/scl/fi/2bxt0v45q4odj1rvxdqo4/Clip-path-group.svg?rlkey=j7y748ujkqvapbybc6wqcyxy8&st=vjtgh475&dl=0"}></img>
                  <span className="text-xl font-semibold">Documentation</span>
                </SheetTitle>
              </SheetHeader>
              <SheetContent />
            </SheetC>
          </Sheet>
          
          <div className={cn("h-fit w-fit flex flex-row gap-1 justify-start items-center my-auto ml-4")}>
            <h1 className="text-xs h-fit text-black/30">Layouts</h1>
            <FaChevronRight color="lightgray" strokeWidth={3} size={10}/>
            {/* {items.map((i, idx) => (<React.Fragment key={idx}>
                <FaChevronRight color="lightgray" strokeWidth={3} size={10} key={idx + 'fa'}/>
                <span className="text-xs text-[#1E1F22]" key={idx + 'sp'}>{i}</span>
            </React.Fragment>))} */}
          </div>
        </div>
      </div>

      <div className="h-4 w-full md:hidden"></div>

      {/** Pages */}
      <main className="w-full min-h-full bg-[#FDFDFD] ">
        <div className='flex flex-row h-full w-full justify-center relative max-w-screen gap-0'>
          <div className='min-w-72 w-72 hidden md:block sticky top-0 h-screen p-2 pt-[122px] ml-12 overflow-y-scroll'>
              <SheetContent/>
          </div>
          {children}
        </div>
      </main>

      {/** Footer */}
      <div className="border-t h-20 bg-[#FDFDFD] flex flex-row justify-center items-center gap-4">
          <img width={20} height={20} className="w-[20px]" alt="CreativeRobots" src={"https://dl.dropbox.com/scl/fi/2bxt0v45q4odj1rvxdqo4/Clip-path-group.svg?rlkey=j7y748ujkqvapbybc6wqcyxy8&st=vjtgh475&dl=0"}></img>
          <span>Layouts.dev</span>
          <a href="https://app.layouts.dev/" className="size-fit relative overflow-hidden h-8 w-16 rounded-full flex flex-col transform transition-all hover:scale-110">
            <img src="/images/gradient.gif" alt="openButtonBg" className="size-20" />
            <span className="absolute text-white font-semibold text-base w-full h-fit top-1 text-center z-50 align-middle">Open</span>
          </a>
      </div>
      </body>
    </html>
  );
}