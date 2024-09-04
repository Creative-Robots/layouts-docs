"use client";

import React, { use } from 'react'
import { useSearchParams } from 'next/navigation';
import { SearchCommand } from '../Command/MyCommand';

const LayoutsSearchCommand = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    if (!type || type !== "editor") {
        return (
            <SearchCommand first={true}/>
        )
    }
    return null;
}

const SecondLayoutsSearchCommand = ({first} : {first: boolean}) => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    if (!(!type || type !== "editor")) {
        return (
            <div className="absolute right-0 mr-2">
                <SearchCommand first={first}/>
            </div>
        )
    }
    return null;
}

export {LayoutsSearchCommand, SecondLayoutsSearchCommand};