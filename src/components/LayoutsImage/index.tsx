"use client";

import React, { use } from 'react'
import Image from "next/image";
import { useSearchParams } from 'next/navigation';

const LayoutsImage = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    if (!type || type !== "editor") {
        return (<Image width={20} height={20} className="w-[20px]" alt="CreativeRobots" src={'/logo/layouts-logo.png'}/>)
    }
    return null;
}

export default LayoutsImage;