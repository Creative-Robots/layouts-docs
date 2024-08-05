
import { componentsProps } from "@/lib/componentTypes";
import { FileElementType, getFilenames } from "@/lib/fileUtils";
import React from "react";
import Dropdown from "../Dropdown";
import { cn } from "@/lib/cn";
import {redirect} from 'next/navigation'
import { FileButton } from "./FileButton";
import { folder_1, folder_2, folder_3 } from "@/lib/Style";
import { headers } from "next/headers";
import { URL } from "url";

import LayoutsComponent from '../../docs/Layouts/Components.json';

interface SheetProps extends componentsProps {
    open: boolean;
}

export default function Sheet({open}:SheetProps) {

    // const useMemo

    return (
        <div className="">
            
        </div>
    )
}

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
                    path: "",
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
        if(f.folder.length > 0) {
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

function removeHost(url: string): string {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
    } catch (e) {
      // If the URL is relative (i.e., it doesn't include a host), just return it as is
      return url;
    }
  }

export function SheetContent() {
    const fileNames = getFilenames('src/docs/essentials/');
    return (
        <div className="flex flex-col h-fit gap-3">
        {parseFileHierarchie(fileNames, 0)}
        </div>
    )
}