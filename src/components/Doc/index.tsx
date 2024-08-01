'use client'

import { cn } from '@/lib/cn';
import { componentsProps } from '@/lib/componentTypes';
import React, { useRef, useState } from 'react';
import DocBreadcrums from '../Breadcrums';
import Separator from '../Separator';
import { IoCopySharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { SheetContent } from '../Sheet';
import CopyClipboard from '../ClipBoard';
import { getFilenames } from '@/lib/fileUtils';
import { rep, repContext } from '@/lib/RepContext';
import HtmlComponentDoc from './Html';
import { scrollToElement } from '@/lib/utils';

export type DocType = {
    tag:string;
    title: string;
    shortDescriptionOfTheTag: string;
    allowedAttributes: attributeType[];
    canHaveChildren: boolean;
    usageExamples: {
        title: string;
        description: string;
        code: string;
    }[];
}

type attributeType = {
    name: string;
    isRequired: boolean;
    acceptedValueTypes:
    {
        type: string;
        options: string[];
    }[];
};

// -------------------------------------

interface DocProps extends componentsProps {
    data: DocType;
    isLayouts: boolean;
}

function convertToHtmlFormat(text:string) {
    let formattedText = text.replace('><', '>\n<');
    return formattedText;
}

const Doc = ({children, className, data, isLayouts}:DocProps) => {
    
    const [rep, setRep] = useState<rep[]>([]);
    return (
        <repContext.Provider value={{setRep}}> 

        {isLayouts
        ? <></>
        : <HtmlComponentDoc data={data}></HtmlComponentDoc>}
        
        <div className='w-60 min-w-60 max-w-60 hidden lg:flex sticky top-0  h-screen pl-2 pr-4 pt-[122px] overflow-y-scroll flex-col gap-4'>
            <h1 className='text-sm font-semibold'>On this page</h1>
            {rep.map((e, i) => {
              return (
                <a key={'ine' + i} className="text-xs font-semibold hover:text-black text-[#555555] size-fit" href={'#' + e.id} onClick={scrollToElement}>{e.name}</a>
              )
            })}
        </div>
    </repContext.Provider>)
}

export default Doc;