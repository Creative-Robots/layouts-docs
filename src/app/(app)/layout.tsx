'use server'
import Badge from "@/components/Badge";
import "@mintlify/mdx/dist/styles.css"

import { IoSunnyOutline } from "react-icons/io5";
import { MySheet, SheetContent } from "@/components/Sheet";
import { cn } from "@/lib/cn";
import { FaChevronRight } from "react-icons/fa6";
import { ReactNode } from "react";
import { SecondLayoutsSearchCommand } from "@/components/SearchCommand";
import { LayoutsTopBar, SecondLayoutsTopBar } from "@/components/LayoutsTopBar";
import LayoutsMain from "@/components/LayoutsMain";

export default async function AppLayout({children}: {children?: ReactNode}) {

    return (
    <>
        {/** Header of the docs */}
        <div className="flex flex-col place-content-between border-b border-black/5 fixed z-30 w-[100%] backdrop-blur  bg-[#FDFDFD]">
        
            <LayoutsTopBar/>
            {/** Sheet if small */}
            <div className="h-12 w-full flex flex-row border-t border-black/5 md:hidden">
                
                <MySheet />
                
                <div className={cn("h-fit w-fit flex flex-row gap-1 justify-start items-center my-auto ml-4")}>
                    <h1 className="text-xs h-fit text-black/30">Layouts</h1>
                    <FaChevronRight color="lightgray" strokeWidth={3} size={10}/>
                    <SecondLayoutsSearchCommand first={true}/>
                    {/* {items.map((i, idx) => (<React.Fragment key={idx}>
                        <FaChevronRight color="lightgray" strokeWidth={3} size={10} key={idx + 'fa'}/>
                        <span className="text-xs text-[#1E1F22]" key={idx + 'sp'}>{i}</span>
                    </React.Fragment>))} */}
                </div>
            </div>
            <SecondLayoutsTopBar/>
        </div>

        <div className="h-4 w-full md:hidden"></div>

        {/** Pages */}
        <main className="w-full max-w-[2000px] flex flex-row mx-auto min-h-full bg-[#FDFDFD] ">
            <LayoutsMain>
                {children}
            </LayoutsMain>
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