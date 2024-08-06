'use client'

import { cn } from '@/lib/cn';
import { componentsProps } from '@/lib/componentTypes';
import React, { useRef, useState } from 'react';
import { rep, repContext } from '@/lib/RepContext';
import HtmlComponentDoc from './Html';
import { scrollToElement } from '@/lib/utils';
import { ComponentDoc } from '@/app/components/[name]/page';
import LayoutComponentsDoc from './Layout';

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

export type LayoutDocType = {
    data: ComponentDoc;
}

type attributeType = {
    name: string;
    isRequired: boolean;
    acceptedValueTypes:
    {
        type: string;
        options?: string[];
    }[];
};

// -------------------------------------

interface DocProps {
    htmldata: DocType|null;
    layoutData: ComponentDoc|null;
    isLayouts: boolean;
}

function convertToHtmlFormat(text:string) {
    let formattedText = text.replace('><', '>\n<');
    return formattedText;
}

const Doc = ({htmldata, isLayouts, layoutData}:DocProps) => {
    
    const [rep, setRep] = useState<rep[]>([]);
    return (
        <repContext.Provider value={{setRep}}> 

        {isLayouts
        ? layoutData ? <LayoutComponentsDoc data={layoutData}></LayoutComponentsDoc> : null
        : htmldata ? <HtmlComponentDoc data={htmldata}></HtmlComponentDoc> : null}
        
        <div className='w-60 min-w-60 max-w-60 hidden lg:flex sticky top-0  h-screen pl-2 pr-4 pt-[122px] overflow-y-scroll flex-col gap-4'>
            <h1 className='text-sm font-body'>On this page</h1>
            {rep.map((e, i) => {
              return (
                <a key={'ine' + i} className={cn("text-xs font-normal text-gray-400 hover:text-[#1e1f22] cursor-pointer group flex flex-row items-center", e.level === 2 ? "pl-4" : e.level === 3 ? "pl-8" : "" )} href={'#' + e.id} onClick={scrollToElement}>
                    {e.level === 2 ? <div className='text-xs h-0.5 w-1 rounded-full bg-gray-300 group-hover:bg-[#1e1f22] mr-2'></div> : null}
                    {e.level === 3 ? <div className='text-xs size-0.5 rounded-none bg-gray-200 group-hover:bg-[#1e1f22] mr-2'></div> : null}
                    {e.name}
                </a>
              )
            })}
        </div>
    </repContext.Provider>)
}

export default Doc;