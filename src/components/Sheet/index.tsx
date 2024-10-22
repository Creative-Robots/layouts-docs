/* eslint-disable @next/next/no-img-element */
'use client'
import { FileElementType, getMdxFiles } from "@/lib/fileUtils";
import React, { useState } from "react";
import Dropdown from "../Dropdown";
import { cn } from "@/lib/cn";
import { useRouter, useSearchParams} from 'next/navigation'
import { FileButton } from "./FileButton";
import { folder_1, folder_3 } from "@/lib/Style";

import LayoutsComponent from '../../docs/RawLayouts/Components.json';
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent as SheetC,
    SheetClose,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ShadCn/Sheet"
import { DISCORD_URL } from "@/lib/utils";
import Image from "next/image";
import LayoutsImage from "../LayoutsImage";

export function MySheet() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen}>
            <SheetTrigger className=" hover:bg-background-2 rounded-md size-fit my-auto p-1 ml-2" onClick={() => setIsOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></SheetTrigger>
            <SheetC className="bg-absolute-positive px-0 pb-0 flex flex-col" side={'left'} setIsOpen={setIsOpen}>
                <SheetHeader className="mb-4 bg-gradient-to-b from-absolute-positive to-transparent 4xs:block hidden pt-2 2xs:pt-0">
                <SheetTitle className="flex flex-row justify-start 3xs:justify-center pl-4 3xs:pl-0 gap-2 3xs:gap-4 ">
                    <div className="my-auto"><LayoutsImage/></div>
                    <span className="text-[11px] 4xs:text-[8vw] 3xs:text-xl 4xs:pl-0 font-semibold text-textcolor-primary">Documentation</span>
                </SheetTitle>
                </SheetHeader>
                <SheetContent bottom className="pt-4 4xs:pt-0" onOpenChange={setIsOpen}/>
            </SheetC>
        </Sheet>
    )
}

function isSpecialCase(file: FileElementType) {
    if (file.name === "Components") return true;
    return false;
}

function getLayoutsNamesAsF(level:number, setIsOpen:any) {
    return (
        <>
        {LayoutsComponent.map((c, idx) => {
            return (
                <FileButton key={'sheet_'+idx} f={{name: c.name,
                    parsedName: "components/" + c.tag,
                    folder: []}} i={idx} level={level} setIsOpen={setIsOpen}/>
            )
        })}</>
    )
}

function specialCase(file: FileElementType, level: number, i:number, setIsOpen:any) {

    if (file.name === "Components") {
        if (level === 0) {
            return (<div>
                <span className={cn(folder_1)}>{file.name}</span>
                <div key={i + level} className="w-full h-fit pl-4 mt-3 flex flex-col gap-1 ">
                    
                    {getLayoutsNamesAsF(level, setIsOpen)}

                </div>
            </div>)
        } else if (level === 1) {
            return (
                <Dropdown name={file.name} key={i + level} >
                    {getLayoutsNamesAsF(level, setIsOpen)}
                </Dropdown>
            )
        } else if (level === 2) {
            return (<div>
                <span className={cn(folder_3)}>{file.name}</span>
                <div key={i + level} className="w-full h-fit pl-4 my-3 flex flex-col gap-1">

                    {getLayoutsNamesAsF(level, setIsOpen)}

                </div>
            </div>)
        } else {
            return (
                <>
                    {getLayoutsNamesAsF(level, setIsOpen)}
                </>
            )
        }
    }
    return (
        <></>
    )
}

function parseFileHierarchie(files: FileElementType[], level: number, setIsOpen: any):React.ReactNode {

    return (
    <>
    {files.map((f:FileElementType, i:number) => {
        if(f.folder && f.folder.length > 0) {
            if (isSpecialCase(f)) {
                return specialCase(f, level, i, setIsOpen);
            }
            if (level === 0) {
                return (<div key={i}>
                    <span className={cn(folder_1)}>{f.name}</span>
                    <div key={i + level} className="w-full h-fit 4xs:pl-3 3xs:pl-4 mt-3 flex flex-col gap-1 ">
                        {parseFileHierarchie(f.folder, level+1, setIsOpen)}
                    </div>
                </div>)
            } else if (level === 1) {
                return (
                    <Dropdown name={f.name} key={i + level} >{parseFileHierarchie(f.folder, level+1, setIsOpen)}</Dropdown>
                )
            } else if (level === 2) {
                return (<div key={i}>
                    <span className={cn(folder_3)}>{f.name}</span>
                    <div key={i + level} className="w-full h-fit pl-2 4xs:pl-3 3xs:pl-4 my-3 flex flex-col gap-1">
                        {parseFileHierarchie(f.folder, level+1, setIsOpen)}
                    </div>
                </div>)
            } else {
                return (
                    <>
                        {parseFileHierarchie(f.folder, level+1, setIsOpen)}
                    </>
                )
            }
        } else {
            return <FileButton setIsOpen={setIsOpen} key={i} f={f} i={i} level={level}/>
        }
    })}
    </>
    )
}

const handleOpen = () => {
    const url = 'https://app.layouts.dev';
    window.open(url, '_blank'); // Ouvre la page dans un nouvel onglet
};

const handleDiscordOpen = () => {
    window.open(DISCORD_URL, '_blank'); // Ouvre la page dans un nouvel onglet
};

export function SheetContent({className, bottom=false, onOpenChange}:{className?:string, bottom?:boolean, onOpenChange:any}) {
    const fileNames = getMdxFiles();
    const router = useRouter();

    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    return (
        <>
        {/* <SheetClose>TestClose</SheetClose> */}
        <div className={cn("flex flex-col flex-1 gap-3 px-3 4xs:px-8 overflow-y-scroll", !bottom && "pb-4", className)}>
            {parseFileHierarchie(fileNames, 0, onOpenChange)}
        </div>
        {
            bottom && <div className="w-full border-t border-gray-400/20 h-fit py-6 4xs:p-6 gap-2 flex flex-col items-center 4xs:items-start bg-background">
                <Button onClick={handleDiscordOpen} className="reset flex flex-row gap-2 items-center p-3 w-fit 4xs:w-full mx-auto hover:text-textcolor-primary text-textcolor-secondary font-normal bg-background-2 hover:bg-hover rounded-lg transition delay-0 duration-0 justify-center" variant="secondary" >
                    <img alt="message" className="size-3.5" src="https://illustrations.dev/encrypted/img_MzM1QkNEQUQwQzgzQ0MxOUY0MTBFOTM0ODMwQjlDODM2NTZEQ0E3NzA2ODdGOTZE" />
                    <span className=" hidden 3xs:block text-sm" >Chat with us</span> {/** base text */}
                    <span className="hidden 4xs:block 3xs:hidden text-[15px]" >Chat</span> {/** Small text */}
                </Button>
                {
                    type !== "editor" && <Button onClick={handleOpen} className="reset flex flex-row gap-2 items-center p-3 w-fit 4xs:w-full mx-auto bg-absolute-positive hover:text-textcolor-primary text-textcolor-secondary font-normal hover:bg-background-2 border border-border rounded-lg shadow-sm transition delay-0 duration-0 justify-center" variant="outline" >
                        <img alt="" className="size-3.5 opacity-60" src="https://dl.dropbox.com/scl/fi/igx4yvav3q5ygc1kvhl05/layoutsv2_2.2_black.svg?rlkey=5c93fcyf4414om4ijvnhzpepo&st=p3x6p2ud&dl=0" />
                        <span className=" hidden 3xs:block text-sm" >Open the App</span> {/** base text */}
                        <span className=" hidden 4xs:block 3xs:hidden text-[15px]" >App</span> {/** Small text */}
                    </Button>
                }
            </div>
        }
        
        </>
    )
}