"use client";

import React, { use } from 'react'
import { useSearchParams } from 'next/navigation';
import { SearchCommand } from '../Command/MyCommand';

const LayoutsSearchCommand = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    if (!type || type !== "editor") {
        return (
            <SearchCommand/>
        )
    }
    return null;
}

const SecondLayoutsSearchCommand = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    if (!(!type || type !== "editor")) {
        return (
            <div className="absolute right-0 mr-2">
                <SearchCommand/>
            </div>
        )
    }
    return null;
}

export {LayoutsSearchCommand, SecondLayoutsSearchCommand};