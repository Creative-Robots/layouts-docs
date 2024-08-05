'use client'

import { componentsProps } from "@/lib/componentTypes";
import DocBreadcrums from "../Breadcrums";
import Separator from '../Separator';
import { cn } from "@/lib/cn";
import React from "react";
import CopyClipboard from "../ClipBoard";
import MyCodeBlock from "../CodeBlock";
import { H1, Title } from "./DocComponents";

interface DocProps extends componentsProps {
    data: DocType;
}

type DocType = {
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
        options?: string[];
    }[];
};

function convertToHtmlFormat(text:string) {
    let formattedText = text.replace('><', '>\n<');
    return formattedText;
}


export default function HtmlComponentDoc({children, className, data}:DocProps) {
    const {tag, title, shortDescriptionOfTheTag, allowedAttributes, canHaveChildren, usageExamples} = data;
    return (
        
        <div className='flex flex-col gap-3 pb-20 lg:px-12 md:px-10 sm:px-8 px-5 min-h-screen max-w-[1200px] flex-1 pt-[122px] lg:mx-auto'>
            <DocBreadcrums items={[tag]} />
            <div className='flex flex-col gap-4'>
                <Title text={title}></Title>
                <p className='text-lg text-[#5B5E66] font-normal'>{shortDescriptionOfTheTag}</p>
                {title && <div className='flex flex-row gap-2 items-center  '>
                    <p className='text-[#1E1F22] text-sm font-normal '>Source : </p>
                    <img alt="authorImg" src="https://seeklogo.com/images/H/html5-without-wordmark-black-white-logo-104D0855A4-seeklogo.com.png"  className='w-[18px]'/>
                    <p className=' text-xs font-bold text-[#1E1F22]'>HTML 5</p>
                </div>} 
            </div>
            {allowedAttributes && allowedAttributes.length > 0 && <>
                <H1 text="Props"></H1>
                <div className='flex flex-col gap-2 px-4 w-full'>
                    <div className='grid grid-cols-11'>
                        <p className='text-base text-[#5B5E66] font-semibold col-span-3'>Prop</p>
                        <p className='text-base text-[#5B5E66] font-semibold col-span-3'>Type</p>
                        <p className='text-base text-[#5B5E66] font-semibold w-fit col-span-3'>Options</p>
                        <p className='text-base text-[#5B5E66] font-semibold text-center col-span-2'>isRequired</p>
                    </div>
                </div> 
                <div className='w-full h-fit'>
                <Separator/>
                {allowedAttributes.map((attribute, idx) => {
                    const bg = idx % 2 === allowedAttributes.length % 2 ? "bg-[#fcfcfc]" : "bg-[#fafafa]";
                    return (
                        <div className={cn('flex flex-col gap-4 min-h-8 justify-center px-4 border-b py-3', bg)} key={tag + 'attribute' + idx}>
                        <div className='grid grid-cols-11 items-center'>
                            <p className="text-sm text-[#373114] bg-gray-200 px-2 py-1 rounded-lg w-fit col-span-3 truncate">{attribute.name}</p>
                            {attribute.acceptedValueTypes && attribute.acceptedValueTypes.length > 0 ? (
                                <>
                                <div className='flex flex-col items-start col-span-3'>
                                {attribute.acceptedValueTypes.map((at, idx2) => (
                                    <div className='flex flex-col justify-normal items-start' key={attribute.name + 'acceptedValueType' + idx2}>
                                        <p className="text-sm text-[#5B5E66]">{at.type}</p>
                                        {at.options?.map((e, i) => (
                                            <span key={e + i}></span>
                                        ))}
                                    </div>
                                ))}
                                </div>
                                <div className='flex flex-col justify-normal items-start col-span-3'>
                                {attribute.acceptedValueTypes.map((at, idx2) => (
                                    <div className='flex flex-col justify-normal items-center gap-0.5' key={attribute.name + 'options' + idx2}>
                                    {at.options?.map((e, i) => (
                                        <p className="text-sm text-[#5B5E66] bg-white rounded-sm px-1" key={e + i}>{e}</p>
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
                            <p className="text-sm text-[#1E1F22] text-center col-span-2">{attribute.isRequired === true ? "✅" : "❌"}</p>
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
                <H1 text="Usage Examples"></H1>
                {usageExamples.map((u, i) => (
                    <React.Fragment key={u.title + i}>
                    <div className='flex flex-col ml-4'>
                    <h2 className='text-lg'>{u.title}</h2>
                    <p className='text-base text-[#5B5E66]'>{u.description}</p>
                    </div>
                    <MyCodeBlock code={convertToHtmlFormat(u.code)} language="html" withTitleBar={false}></MyCodeBlock>
                </React.Fragment>
                ))}   
            </>}
        </div>
    )
}