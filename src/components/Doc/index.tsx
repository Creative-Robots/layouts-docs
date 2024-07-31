'use server'

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
}

function convertToHtmlFormat(text:string) {
    let formattedText = text.replace('><', '>\n<');
    return formattedText;
}

const Doc = ({children, className, data}:DocProps) => {
    const {tag, title, shortDescriptionOfTheTag, allowedAttributes, canHaveChildren, usageExamples} = data;

    return (
        <>
        <div className='flex flex-col gap-3 pt-[122px] pb-20 lg:px-12 md:px-10 sm:px-8 px-5 min-h-screen flex-1 max-w-[716px]'>
            <DocBreadcrums items={[tag]} />
            <div className='flex flex-col gap-4'>
                <h1 className="text-5xl font-semibold">{title}</h1>
                <p className='text-lg text-[#5B5E66] font-normal'>{shortDescriptionOfTheTag}</p>
                {title && <div className='flex flex-row gap-2 items-center  '>
                    <p className='text-[#1E1F22] text-sm font-normal '>Source : </p>
                    <img alt="authorImg" src="https://seeklogo.com/images/H/html5-without-wordmark-black-white-logo-104D0855A4-seeklogo.com.png"  className='w-[18px]'/>
                    <p className=' text-xs font-bold text-[#1E1F22]'>HTML 5</p>
                </div>}
            </div>
            {allowedAttributes && allowedAttributes.length > 0 && <>
                <div className='flex flex-col gap-2 mt-8'>
                    <h1 className='text-xl font-medium'>Props</h1>
                    {/* <p className='text-sm text-[#5B5E66] font-normal '>The /alert component uses the alert message component by shadcn/UI.</p> */}
                </div>
                <div className='flex flex-col gap-2 px-4 w-full'>
                    <div className='grid grid-cols-4'>
                        <p className='text-base text-[#5B5E66] font-semibold'>Prop</p>
                        <p className='text-base text-[#5B5E66] font-semibold'>Type</p>
                        <p className='text-base text-[#5B5E66] font-semibold w-fit'>Options</p>
                        <p className='text-base text-[#5B5E66] font-semibold text-center'>isRequired</p>
                    </div>
                </div> 
                <div className='w-full h-fit'>
                <Separator/>
                {allowedAttributes.map((attribute, idx) => {
                    const bg = idx % 2 === allowedAttributes.length % 2 ? "bg-[#fcfcfc]" : "bg-[#fafafa]";
                    return (
                        <div className={cn('flex flex-col gap-4 min-h-8 justify-center px-4', bg)} key={tag + 'attribute' + idx}>
                        <div className='grid grid-cols-4'>
                            <p className="text-sm text-[#373114]">{attribute.name}</p>
                            {attribute.acceptedValueTypes && attribute.acceptedValueTypes.length > 0 ? (
                                <>
                                <div className='flex flex-col items-start'>
                                {attribute.acceptedValueTypes.map((at, idx2) => (
                                    <div className='flex flex-col justify-normal items-start' key={attribute.name + 'acceptedValueType' + idx2}>
                                    <p className="text-sm text-[#5B5E66]">{at.type}</p>
                                    {at.options?.map((e, i) => (
                                        <span key={e + i}></span>
                                    ))}
                                    </div>
                                ))}
                                </div>
                                <div className='flex flex-col justify-normal items-start'>
                                {attribute.acceptedValueTypes.map((at, idx2) => (
                                    <div className='flex flex-col justify-normal items-start' key={attribute.name + 'options' + idx2}>
                                    {at.options?.map((e, i) => (
                                        <p className="text-sm text-[#5B5E66]" key={e + i}>{e}</p>
                                    ))}
                                    </div>
                                ))}
                                </div>
                            </>
                            ) : (
                                <>
                                <span key="span1"></span>
                                <span key="span2"></span>
                            </>
                            )}
                            <p className="text-sm text-[#1E1F22] text-center">{attribute.isRequired === true ? "✅" : "❌"}</p>
                        </div>
                        </div>
                    );
                })}
                </div>
            </>}
            <div className='flex flex-row gap-2 mt-8 items-center'>
                <h1 className='text-xl font-medium'>Accept children</h1>
                <p className='text-sm text-[#5B5E66] font-normal ml-10'>{canHaveChildren ? "✅" : "❌"}</p>
            </div>
            {allowedAttributes && allowedAttributes.length > 0 && <>
                <div className='flex flex-col gap-2 mt-8'>
                    <h1 className='text-xl font-medium'>Usage Examples</h1>
                </div>
                {usageExamples.map((u, i) => (
                    <React.Fragment key={u.title + i}>
                    <div className='flex flex-col ml-4'>
                    <h2 className='text-lg'>{u.title}</h2>
                    <p className='text-base text-[#5B5E66]'>{u.description}</p>
                    </div>
                    <div className='w-full h-fit text-wrap relative'>
                    <textarea
                        readOnly
                        name={u.title}
                        id={u.title + String(i)}
                        className='w-full h-fit bg-[#414141] text-white rounded-md resize-none p-2'
                        defaultValue={convertToHtmlFormat(u.code)}
                        />
                    <CopyClipboard id={u.title + String(i)} />
                    </div>
                </React.Fragment>
                ))}   
            </>}
        </div>
        
        <div className='w-[250px] hidden lg:block sticky top-0  h-screen p-2 pt-[122px] overflow-y-scroll'>
            <h1 className='text-sm font-semibold'>On this page</h1>
        </div>
    </>)
}

export default Doc;