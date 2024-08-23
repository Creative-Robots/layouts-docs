'use server'
import Badge from "@/components/Badge";
import "@mintlify/mdx/dist/styles.css"

import { IoSunnyOutline } from "react-icons/io5";
import { MySheet, SheetContent } from "@/components/Sheet";
import { cn } from "@/lib/cn";
import { FaChevronRight } from "react-icons/fa6";
import { SearchCommand } from "@/components/Command/MyCommand";
import { ReactNode } from "react";
import Image from "next/image";


export default async function AppLayout({children}:{children?:ReactNode}) {
    return (
    <>
        {/** Header of the docs */}
        <div className="flex flex-col place-content-between border-b border-black/5 fixed z-30 w-[100%] backdrop-blur  bg-[#FDFDFD]">
        <div className="flex flex-row w-full max-w-[2000px] mx-auto h-fit p-4">
            <div className="flex flex-row gap-1.5 items-center w-fit">
            <Image width={20} height={20} className="w-[20px]" alt="CreativeRobots" src={'/logo/layouts-logo.png'}></Image>
            <h1 className="text-base tracking-tight font-[Inter_Display] font-medium text-[#1E1F22] hidden 3xs:block ">Layouts.dev</h1>
            <Badge className="bg-[#F4F3F1] text-[#5A5E65] text-xs font-[Roboto_Mono]  hover:bg-[#f4f3f1] py-1 h-min hidden 2xs:block">Docs</Badge>
            </div>
            <SearchCommand />
            <div className="p-2 rounded hidden hover:bg-black/5 size-fit self-center">
            <IoSunnyOutline className="text-[#1E1F22]" width={16} height={16}/>
            </div>
        </div>

        {/** Sheet if small */}
        <div className="h-12 w-full flex flex-row border-t border-black/5 md:hidden">
            
            <MySheet />
            
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
        <main className="w-full max-w-[2000px] flex flex-row mx-auto min-h-full bg-[#FDFDFD] ">
        <div className='flex flex-row h-full w-full justify-center relative max-w-screen gap-0'>
            <div className='min-w-72 w-72 hidden border-r border-gray-400/20 md:flex sticky top-0 h-screen p-2 pt-[122px] overflow-y-scroll ml-12 justify-between'>
                <SheetContent onOpenChange={null}/>
            </div>
            {children || <>
                <div className="h-full flex-1 max-w-[1440px]"></div>
            </>}
        </div>
        </main>

        {/** Footer */}
        {/* <div className="border-t h-20 bg-[#FDFDFD] flex flex-row justify-center items-center gap-4">
            <img width={20} height={20} className="w-[20px]" alt="CreativeRobots" src={"https://dl.dropbox.com/scl/fi/2bxt0v45q4odj1rvxdqo4/Clip-path-group.svg?rlkey=j7y748ujkqvapbybc6wqcyxy8&st=vjtgh475&dl=0"}></img>
            <span>Layouts.dev</span>
            <a href="https://app.layouts.dev/" className="size-fit relative overflow-hidden h-8 w-16 rounded-full flex flex-col transform transition-all hover:scale-110">
            <img src="/images/gradient.gif" alt="openButtonBg" className="size-20" />
            <span className="absolute text-white font-semibold text-base w-full h-fit top-1 text-center z-50 align-middle">Open</span>
            </a>
        </div> */}
    </>
    )
}