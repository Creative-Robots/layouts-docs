"use client";

import React, { use } from 'react'
import { useSearchParams } from 'next/navigation';
import { SheetContent } from '../Sheet';
import { cn } from '@/lib/cn';

const LayoutsMain = ({children} : {children?: React.ReactNode}) => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    return (            
        <div className='flex flex-row h-full w-full justify-center relative max-w-screen gap-0'>
            <div className={cn('min-w-72 w-72 hidden border-r border-gray-400/20 md:flex sticky top-0 h-screen p-2 overflow-y-scroll ml-12 justify-between', type === "editor" ? "pt-[77px]" : "pt-[122px]")}>
                <SheetContent onOpenChange={null}/>
            </div>
            {children || <>
                <div className="h-full flex-1 max-w-[1440px]"></div>
            </>}
        </div>
    )
}

export default LayoutsMain;