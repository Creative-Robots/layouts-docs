"use client";

import React, { use } from 'react'
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/cn';

function BorderDisable({children}:{children: React.ReactNode}) {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
   
    return (
        <div className={cn('h-12 w-full flex flex-row border-absolute-negative/5 md:hidden', !type || type !== "editor" ? 'border-t' : "")}>
            {children}
        </div>
    )
}

export default BorderDisable;