'use client'

import { cn } from "@/lib/cn"
import { FileElementType } from "@/lib/fileUtils"
import { element, selectedElementStyle } from "@/lib/Style"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"

export const FileButton = ({f, i, level}:{f:FileElementType, i:number, level:number}) => {
    const router = useRouter();
    const path = usePathname();
    const isSelected = useMemo(() => {
        return path.includes(f.parsedName);
    }, [path])
    return (
        <button key={i + level} className={cn(element, isSelected ? selectedElementStyle : " ")} onClick={() => router.push('/' + f.parsedName)}>{f.name}</button>
    )
}