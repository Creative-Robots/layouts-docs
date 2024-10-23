'use client'

import { componentsProps } from "@/lib/componentTypes";
import DocBreadcrums from "../Breadcrums";
import Separator from '../Separator';
import { cn } from "@/lib/cn";
import React from "react";
import { Heading1, Heading2, SubHeading, Title } from "../ContentComponents";
import { isRequiredTitle, PropsCol, PropsColTitle, PropsColTitleText, PropsHeader, PropsHeaderBox, PropsHeaderTitle, PropsLine, PropsLine1_2, PropsLine2_2, PropsLineBox, PropsName, requiredCol } from "@/lib/Style";
import { CodeBlock } from "../ContentComponents/CodeBlock";
import { useSearchParams } from "next/navigation";

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

export default function HtmlComponentDoc({children, className, data}:DocProps) {
    const {tag, title, shortDescriptionOfTheTag, allowedAttributes, canHaveChildren, usageExamples} = data;

    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    return (
        
        <div className={cn('flex flex-col gap-3 pb-20 xl:px-44 lg:px-12 md:px-8 px-4 min-h-screen w-middle-box-0/2 md:w-middle-box-1/2 lg:w-middle-box-2/2', type === "editor" ? "pt-[77px]" : "pt-[122px]")}>
            <DocBreadcrums items={[tag]} />
            <div className='flex flex-col'>
                <Title title={title} description={shortDescriptionOfTheTag} ></Title>
                {/* <p className='text-lg text-textcolor-tertiary font-normal'>{shortDescriptionOfTheTag}</p> */}
                {title && <div className='flex flex-row gap-2 items-center  '>
                    <p className='text-xs font-body text-textcolor-primary '>Source : </p>
                    <img alt="authorImg" src="https://seeklogo.com/images/H/html5-without-wordmark-black-white-logo-104D0855A4-seeklogo.com.png"  className='w-[12px]'/>
                    <p className=' text-xs font-body text-textcolor-primary'>HTML 5</p>
                </div>} 
            </div>


            {allowedAttributes && allowedAttributes.length > 0 && 
            <div className="max-w-full overflow-x-scroll">
                <Heading1 title="Props"></Heading1>
                <div className={cn(PropsHeaderBox)}>
                    <div className={cn(PropsHeader)}>
                    <p className={cn(PropsHeaderTitle)}>Prop</p>
                    <p className={cn(PropsHeaderTitle)}>Type</p>
                    <p className={cn(PropsHeaderTitle, "hidden sm:block")}>Default</p>
                    <p className={cn(PropsHeaderTitle, isRequiredTitle, "hidden sm:block")}>isRequired</p>
                    </div>
                </div> 
                <div className='w-full h-fit min-w-[300px] overflow-y-visible'>
                <Separator/>
                {allowedAttributes.map((attribute, idx) => {
                    const tooDown = allowedAttributes.length - idx <= 2;
                    if (attribute === null) return null;
                    const bg = idx % 2 === allowedAttributes.length % 2 ? PropsLine1_2 : PropsLine2_2;
                    return (
                        <div className={cn(PropsLineBox, bg)} key={tag + 'attribute' + idx}>
                        <div className={cn(PropsLine)}>
                            <div className={cn(PropsName)}>{attribute.name}<span className={cn(attribute.isRequired === false ? "sm:hidden opacity-65" : "hidden")}>?</span></div>
                            {attribute.acceptedValueTypes && attribute.acceptedValueTypes.length > 0 ? (
                                <>
                                <div className={PropsCol}>
                                {attribute.acceptedValueTypes.map((at, idx2) => (
                                    <div className={cn(PropsColTitle)} key={attribute.name + 'acceptedValueType' + idx2}>
                                        <p className="text-sm text-textcolor-tertiary">{at.type}</p>
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
                                        <p className={cn(PropsColTitleText, "truncate bg-absolute-positive rounded-sm px-1")} key={e + i}>{e}</p>
                                    ))}
                                    </div>
                                ))}
                                </div>
                            </>
                            ) : (
                                <>
                                <span key="span1"></span>
                                <span key="span2" className="hidden sm:block"></span>
                            </>
                            )}
                            <p className={cn(requiredCol, "hidden sm:block")}>{attribute.isRequired === true ? "✅" : "❌"}</p>
                        </div>
                        </div>
                    );
                })}
                </div>
            </div>}

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