'use client'

import { componentsProps } from "@/lib/componentTypes";
import DocBreadcrums from "../Breadcrums";
import Separator from '../Separator';
import { cn } from "@/lib/cn";
import React from "react";
import CopyClipboard from "../ClipBoard";
import { Heading1, Heading2, SubHeading, Title } from "../ContentComponents";
import { AcceptChildrenBox, AcceptChildrenIcon, AcceptChildrenTitle, Description, isRequiredTitle, PropsCol, PropsColTitle, PropsColTitleText, PropsHeader, PropsHeaderBox, PropsHeaderTitle, PropsLine, PropsLine1_2, PropsLine2_2, PropsLineBox, PropsName } from "@/lib/Style";
import { CodeBlock } from "../ContentComponents/CodeBlock";

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
        layoutsCode: string;
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
        
        <div className='flex flex-col gap-3 pb-20 sm:px-10 px-4 min-h-screen flex-1 pt-[122px]'>
            <DocBreadcrums items={[tag]} />
            <div className='flex flex-col'>
                <Title title={title} description={shortDescriptionOfTheTag} ></Title>
                {/* <p className='text-lg text-[#5B5E66] font-normal'>{shortDescriptionOfTheTag}</p> */}
                {title && <div className='flex flex-row gap-2 items-center  '>
                    <p className='text-xs font-body text-[#1E1F22] '>Source : </p>
                    <img alt="authorImg" src="https://seeklogo.com/images/H/html5-without-wordmark-black-white-logo-104D0855A4-seeklogo.com.png"  className='w-[12px]'/>
                    <p className=' text-xs font-body text-[#1E1F22]'>HTML 5</p>
                </div>} 
            </div>
            {allowedAttributes && allowedAttributes.length > 0 && <>
                <Heading1 title="Props"></Heading1>
                <div className={cn(PropsHeaderBox, "-mt-3 -mb-2")}>
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
            <SubHeading title={"Accept children : " + (canHaveChildren ? "✅" : "❌")}></SubHeading>
            {allowedAttributes && allowedAttributes.length > 0 && <>
                <Heading1 title="Usage Examples"></Heading1>
                {usageExamples.map((u, i) => (
                <React.Fragment key={u.title + i}>
                    <Heading2 title={u.title} description={u.description}></Heading2>
                    {/* <CodeBlock code={convertToHtmlFormat(u.code)} /> */}
                    <CodeBlock code={u.layoutsCode} />
                </React.Fragment>
                ))}   
            </>}
            <div className="h-[64px] w-full flex justify-center items-center" >
                {/* <span className="text-xs" >
                    64px height
                </span> */}
            </div>
        </div>
    )
}