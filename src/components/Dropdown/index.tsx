'use client'

import { cn } from "@/lib/cn";
import { componentsProps } from "@/lib/componentTypes";
import { folder_2 } from "@/lib/Style";
import { useState } from "react"
import { BiChevronDown } from "react-icons/bi";

interface DropdownProps extends componentsProps{
    name: string;
}

export default function Dropdown({name, children}:DropdownProps) {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(s => !s);
    }

    return (
        <>
            <button onClick={toggle} className={cn("w-full h-fit flex flex-row justify-between items-center rounded-md pr-2",)}>
                <span className={cn(folder_2)}>{name}</span>
                <BiChevronDown size={15} className={cn(open ? "rotate-180" : "")}/>
            </button>
            <div className={cn("w-full transition-all overflow-hidden pl-4 flex flex-row", open ? "h-fit" : "hidden")}>
                <div className="bg-gray-200 w-[1px] ml-1 mr-3 flex-shrink-0"></div>
                <div className="h-fit flex flex-col gap-1">
                    {children}
                </div>
            </div>
        </>
    )
}