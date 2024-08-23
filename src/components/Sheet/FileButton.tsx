'use client'

import { cn } from "@/lib/cn"
import { FileElementType } from "@/lib/fileUtils"
import { element, selectedElementStyle } from "@/lib/Style"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react";


function specialName(name: string) {
    if (name === "Help and Support") {
        return "Help & Support";
    }
    return name;
}

export const FileButton = ({f, i, level, setIsOpen}:{f:FileElementType, i:number, level:number, setIsOpen:any}) => {
    const router = useRouter();
    const path = usePathname();
    const isSelected = useMemo(() => {
        return path === '/' + f.parsedName;
    }, [path])
    return (
        <button key={i + level} className={cn(element, isSelected ? selectedElementStyle : " ")} onClick={() => { if (setIsOpen) {setIsOpen(false);} router.push('/' + f.parsedName);}}>{specialName(f.name)}</button>
    )
}