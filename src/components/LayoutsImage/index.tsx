"use client";

import React, { use } from 'react'
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { ReactComponent as Logo } from "../../../public/assets/LayoutsLogo.svg";
import { ReactComponent as DarkLogo } from "../../../public/assets/LayoutsDarkLogo.svg";

const LayoutsImage = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    

    if (!type || type !== "editor") {
        return (
        <>
            <Image width={18} height={18} className="size-[18px] dark:hidden" alt="CreativeRobots" src={'/logo/layouts-logo.png'}></Image> 
            <Image width={18} height={18} className="size-[18px] hidden dark:flex"  alt="CreativeRobots" src={'/logo/LayoutsDarkLogo.png'}></Image>
        </>
    )
    }
    return null;
}

export default LayoutsImage;