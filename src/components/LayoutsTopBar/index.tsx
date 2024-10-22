"use client";

import React, { use } from 'react'
import { useSearchParams } from 'next/navigation';
import LayoutsImage from '../LayoutsImage';
import Badge from '../Badge';
import { LayoutsSearchCommand, SecondLayoutsSearchCommand } from '../SearchCommand';
import { IoSunnyOutline } from 'react-icons/io5';
import { cn } from '@/lib/cn';

const LayoutsTopBar = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    if (!type || type !== "editor") {
        return (            
            <div className="flex flex-row w-full max-w-[2000px] mx-auto h-fit p-4">
                <div className="flex flex-row gap-1.5 items-center w-fit">
                    <LayoutsImage/>
                    <h1 className="text-base tracking-tight font-[Inter_Display] font-medium text-textcolor-primary hidden 3xs:block ">Layouts.dev</h1>
                    <Badge className="bg-background-2 text-textcolor-secondary text-xs font-[Roboto_Mono]  hover:bg-background-2 py-1 h-min hidden 2xs:block">Docs</Badge>
                </div>
                <LayoutsSearchCommand/>
                <div className="p-2 rounded hidden hover:bg-absolute-negative/5 size-fit self-center">
                    <IoSunnyOutline className="text-textcolor-primary" width={16} height={16}/>
                </div>
            </div>
        )
    }
    return null;
}

const SecondLayoutsTopBar = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    if (!(!type || type !== "editor")) {
        return (            
            <div className="h-12 w-full flex-row border-t border-absolute-negative/5 hidden md:flex">
                <div className={cn("h-fit w-fit flex flex-row gap-1 justify-start items-center my-auto ml-4")}>
                    <SecondLayoutsSearchCommand first={false}/>
                </div>
            </div>
        )
    }
    return null;
}

export {LayoutsTopBar, SecondLayoutsTopBar};