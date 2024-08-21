'use client'
import { FileElementType, getMdxFiles } from "@/lib/fileUtils";
import React from "react";
import Dropdown from "../Dropdown";
import { cn } from "@/lib/cn";
import { useRouter} from 'next/navigation'
import { FileButton } from "./FileButton";
import { folder_1, folder_3 } from "@/lib/Style";

import LayoutsComponent from '../../docs/RawLayouts/Components.json';
import { Button } from "../ui/button";
import { SheetClose } from "../ShadCn/Sheet";

function isSpecialCase(file: FileElementType) {
    if (file.name === "Components") return true;
    return false;
}

function getLayoutsNamesAsF(level:number) {
    return (
        <>
        {LayoutsComponent.map((c, idx) => {
            return (
                <FileButton key={'sheet_'+idx} f={{name: c.name,
                    parsedName: "components/" + c.tag,
                    folder: []}} i={idx} level={level}/>
            )
        })}</>
    )
}

function specialCase(file: FileElementType, level: number, i:number) {

    if (file.name === "Components") {
        if (level === 0) {
            return (<div>
                <span className={cn(folder_1)}>{file.name}</span>
                <div key={i + level} className="w-full h-fit pl-4 mt-3 flex flex-col gap-1 ">
                    
                    {getLayoutsNamesAsF(level)}

                </div>
            </div>)
        } else if (level === 1) {
            return (
                <Dropdown name={file.name} key={i + level} >
                    {getLayoutsNamesAsF(level)}
                </Dropdown>
            )
        } else if (level === 2) {
            return (<div>
                <span className={cn(folder_3)}>{file.name}</span>
                <div key={i + level} className="w-full h-fit pl-4 my-3 flex flex-col gap-1">

                    {getLayoutsNamesAsF(level)}

                </div>
            </div>)
        } else {
            return (
                <>
                    {getLayoutsNamesAsF(level)}
                </>
            )
        }
    }
    return (
        <></>
    )
}

function parseFileHierarchie(files: FileElementType[], level: number):React.ReactNode {

    return (
    <>
    {files.map((f:FileElementType, i:number) => {
        if(f.folder && f.folder.length > 0) {
            if (isSpecialCase(f)) {
                return specialCase(f, level, i);
            }
            if (level === 0) {
                return (<div key={i}>
                    <span className={cn(folder_1)}>{f.name}</span>
                    <div key={i + level} className="w-full h-fit pl-4 mt-3 flex flex-col gap-1 ">
                        {parseFileHierarchie(f.folder, level+1)}
                    </div>
                </div>)
            } else if (level === 1) {
                return (
                    <Dropdown name={f.name} key={i + level} >{parseFileHierarchie(f.folder, level+1)}</Dropdown>
                )
            } else if (level === 2) {
                return (<div key={i}>
                    <span className={cn(folder_3)}>{f.name}</span>
                    <div key={i + level} className="w-full h-fit pl-4 my-3 flex flex-col gap-1">
                        {parseFileHierarchie(f.folder, level+1)}
                    </div>
                </div>)
            } else {
                return (
                    <>
                        {parseFileHierarchie(f.folder, level+1)}
                    </>
                )
            }
        } else {
            return <FileButton key={i} f={f} i={i} level={level}/>
        }
    })}
    </>
    )
}

const handleOpen = () => {
    const url = 'https://app.layouts.dev';
    window.open(url, '_blank'); // Ouvre la page dans un nouvel onglet
};

export function SheetContent({className, bottom=false}:{className?:string, bottom?:boolean}) {
    const fileNames = getMdxFiles();
    const router = useRouter();
    return (
        <>
        <div className={cn("flex flex-col flex-1 gap-3 px-8 pb-4 overflow-y-scroll", className)}>
            {parseFileHierarchie(fileNames, 0)}
        </div>
        {
            bottom && <div className="w-full border-t border-gray-400/20 h-fit p-6  gap-2 flex flex-col bg-white">
                <Button onClick={() => router.push('mailto:hey@@creative-robots.ai')} className="reset flex flex-row gap-2 items-center p-3 w-full mx-auto text-[#5b5e66] hover:text-[#1e1f22] font-normal bg-gray-100 hover:bg-gray-200 rounded-lg transition delay-0 duration-0 justify-center" variant="secondary" >
                    <img alt="message" className="size-3.5" src="https://illustrations.dev/encrypted/img_MzM1QkNEQUQwQzgzQ0MxOUY0MTBFOTM0ODMwQjlDODM2NTZEQ0E3NzA2ODdGOTZE" />
                    <span className="text-sm" >
                        Contact support
                    </span>
                </Button>
                <Button onClick={handleOpen} className="reset flex flex-row gap-2 items-center p-3 w-full mx-auto bg-white text-[#5b5e66] hover:text-[#1e1f22] font-normal hover:bg-gray-50 border border-gray-400/20 rounded-lg shadow-sm transition delay-0 duration-0 justify-center" variant="outline" >
                    <img alt="" className="size-3.5 opacity-60" src="https://dl.dropbox.com/scl/fi/igx4yvav3q5ygc1kvhl05/layoutsv2_2.2_black.svg?rlkey=5c93fcyf4414om4ijvnhzpepo&st=p3x6p2ud&dl=0" />
                    <span className="text-sm" >
                        Open the app
                    </span>
                </Button>
            </div>
        }
        
        </>
    )
}