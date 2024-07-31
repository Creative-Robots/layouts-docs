import { componentsProps } from "@/lib/componentTypes";
import { FileElementType, getFilenames } from "@/lib/fileUtils";
import React from "react";
import Dropdown from "../Dropdown";
import { cn } from "@/lib/cn";


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

const textColor = "text-[#555555]";

function parseFileHierarchie(files: FileElementType[], level: number):React.ReactNode {

    return (
    <>
    {files.map((f:FileElementType, i:number) => {
        if(f.folder.length > 0) {
            if (level === 0) {
                return (<div>
                    <span className="text-base font-semibold truncate">{f.name}</span>
                    <div key={i + level} className="w-full h-fit pl-4 mt-3 flex flex-col gap-3 ">
                        {parseFileHierarchie(f.folder, level+1)}
                    </div>
                </div>)
            } else if (level === 1) {
                return (
                    <Dropdown name={f.name} key={i + level} >{parseFileHierarchie(f.folder, level+1)}</Dropdown>
                )
            } else if (level === 2) {
                return (<div>
                    <span className={cn("text-base truncate", textColor)}>{f.name}</span>
                    <div key={i + level} className="w-full h-fit pl-4 my-3 flex flex-col gap-3">
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
            return (
                <button key={i + level} className={cn("hover:text-black self-start truncate", textColor)}>{f.name}</button>
            )
        }
    })}
    </>
    )
}

export function SheetContent() {
    const fileNames = getFilenames('src/docs/essentials/');
    return (
        <div className="flex flex-col h-fit gap-3">
        {parseFileHierarchie(fileNames, 0)}
        </div>
    )
}