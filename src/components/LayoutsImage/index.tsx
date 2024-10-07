"use client";

import React, { use } from 'react'
import Image from "next/image";
import { useSearchParams } from 'next/navigation';

const LayoutsImage = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    if (!type || type !== "editor") {
        return (<Image width={18} height={18} className="w-[18px]" alt="CreativeRobots" src={'/logo/layouts-logo.png'}></Image>)
    }
    return null;
}

export default LayoutsImage;