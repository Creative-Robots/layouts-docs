'use client'

import { componentsProps } from "@/lib/componentTypes";
import DocBreadcrums from "../Breadcrums";
import Separator from '../Separator';
import { cn } from "@/lib/cn";
import React from "react";
import CopyClipboard from "../ClipBoard";
import MyCodeBlock from "../CodeBlock";
import { H1, Title } from "./DocComponents";
import { _H2, AcceptChildrenBox, AcceptChildrenIcon, AcceptChildrenTitle, Description, H2Box, isRequiredTitle, PropsCol, PropsColTitle, PropsColTitleText, PropsHeader, PropsHeaderBox, PropsHeaderTitle, PropsLine, PropsLine1_2, PropsLine2_2, PropsLineBox, PropsName } from "@/lib/Style";

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
                <div className={cn(PropsHeaderBox)}>
                    <div className={cn(PropsHeader)}>
                        <p className={cn(PropsHeaderTitle)}>Prop</p>
                        <p className={cn(PropsHeaderTitle)}>Type</p>
                        <p className={cn(PropsHeaderTitle)}>Default</p>
                        <p className={cn(PropsHeaderTitle, isRequiredTitle)}>isRequired</p>
                    </div>
                </div> 
                <div className='w-full h-fit'>
                <Separator/>
                {allowedAttributes.map((attribute, idx) => {
                    const bg = idx % 2 === allowedAttributes.length % 2 ? PropsLine1_2 : PropsLine2_2;
                    return (
                        <div className={cn(PropsLineBox, bg)} key={tag + 'attribute' + idx}>
                        <div className={cn(PropsLine)}>
                            <p className={cn(PropsName)}>{attribute.name}</p>
                            {attribute.acceptedValueTypes && attribute.acceptedValueTypes.length > 0 ? (
                                <>
                                <div className={PropsCol}>
                                {attribute.acceptedValueTypes.map((at, idx2) => (
                                    <div className={cn(PropsColTitle)} key={attribute.name + 'acceptedValueType' + idx2}>
                                        <p className="text-sm text-[#5B5E66]">{at.type}</p>
                                        {at.options?.map((e, i) => (
                                            <span key={e + i}></span>
                                        ))}
                                    </div>
                                ))}
                                </div>
                                <div className={PropsCol}>
                                {attribute.acceptedValueTypes.map((at, idx2) => (
                                    <div className={cn(PropsColTitle, "gap-0.5")} key={attribute.name + 'options' + idx2}>
                                    {at.options?.map((e, i) => (
                                        <p className={cn(PropsColTitleText, "truncate bg-white rounded-sm px-1")} key={e + i}>{e}</p>
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
            <div className={cn(H2Box, AcceptChildrenBox)}>
                <h1 className={cn(_H2, AcceptChildrenTitle)}>Accept children</h1>
                <p className={AcceptChildrenIcon}>{canHaveChildren ? "✅" : "❌"}</p>
            </div>
            {allowedAttributes && allowedAttributes.length > 0 && <>
                <H1 text="Usage Examples"></H1>
                {usageExamples.map((u, i) => (
                <React.Fragment key={u.title + i}>
                    <div className='flex flex-col ml-4'>
                    <h2 className={_H2}>{u.title}</h2>
                    <p className={Description}>{u.description}</p>
                    </div>
                    <MyCodeBlock code={convertToHtmlFormat(u.code)} language="html" withTitleBar={false}></MyCodeBlock>
                </React.Fragment>
                ))}   
            </>}
        </div>
    )
}