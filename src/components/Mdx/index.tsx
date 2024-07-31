'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { useState } from "react"
import * as MintComponents from "@mintlify/components"
import { MDXComponent } from "@mintlify/mdx"

interface MdxComponentProps {
    content: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
}

export default function MdxComponent({content}:MdxComponentProps) {
    return (
        <div className="max-w-[716px] pt-[122px]">
            <MDXComponent  {...content} components={MintComponents}/>
        </div>
    )
}