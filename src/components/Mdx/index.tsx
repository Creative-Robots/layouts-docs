'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { createContext, MouseEventHandler, ReactNode, useEffect, useState } from "react"
import * as MintComponents from "@mintlify/components"
import { MDXProvider } from '@mdx-js/react'
import { cn } from "@/lib/cn"
import { code, info, li, note, responseField, snippetIntro, ul } from "@/lib/Style"
import MyCodeBlock from "../CodeBlock"

import { rep, repContext, useRepContext } from "@/lib/RepContext"
import { scrollToElement } from "@/lib/utils"
import { Heading1, Heading2, P, SubHeading, Title } from "../ContentComponents"
import { Label } from "../ui/label"
import { CodeBlock } from "../ContentComponents/CodeBlock"

interface MdxComponentProps {
    content: { mdxSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>; frontMatter: { [key: string]: any; }; }
}

const CustomH1 = ({ children, id }: {children:ReactNode, id:string}) => {
  return (
    <Heading1 title={children as string}/>
  )
}

const CustomH2 = ({ children, id }: {children:ReactNode, id:string}) => {
  return (
    <Heading2 title={children as string}/>
  )
}

const CustomH3 = ({ children, id }: {children:ReactNode, id:string}) => {
  return (
    <SubHeading title={children as string}/>
  )
}

const Linkable = ({id}:{id:string}) => {
    return (
        <div className="absolute">
        <a href={`#${id}`} onClick={scrollToElement} className="-ml-8 flex items-center opacity-0 border-0 group-hover:opacity-100 bg-gray-50 rounded-md shadow size-fit p-1 hover:bg-gray-100" aria-label="Navigate to header">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </a>
      </div>
    )
}
// Ul
const CustomUl = ({ children, id }: {children:ReactNode, id:string}) => (
    <ul className={ul} id={id}>
      {children}
    </ul>
);

// Li
const CustomLi = ({ children, id }: {children:ReactNode, id:string}) => (
    <li className={li} id={id}>
        <div className="w-3 rounded-full mb-auto mt-3 h-0.5 mx-2 bg-gray-300"></div>
        <p className="text-wrap flex-1 h-fit">{children}</p>
    </li>
);

// Note
const Note = ({ children, id }: {children:ReactNode, id:string}) => (
  <div className={note} id={id}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0080ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    {children}
  </div>
);

// Note
const Info = ({ children, id }: {children:ReactNode, id:string}) => (
  <div className={info} id={id}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    <span>
      {children}
    </span>
  </div>
);

// code
const Code = ({ children, id, ...props }: {children:ReactNode, id:string}) => {
  return (
  String(children).split('\n').length > 1
  // ? <MintComponents.CodeGroup><MintComponents.CodeBlock filename="Layout" className="bg-gray-900">{children}</MintComponents.CodeBlock></MintComponents.CodeGroup>
  ? <CodeBlock code={children as string} className="mb-4"/>
  : <code className="size-fit text-wrap bg-gray-200 text-gray-800 border border-gray-300">{children}</code>
)};

// ResponseField
const ResponseField = ({ children, id }: {children:ReactNode, id:string}) => (
  <div className={responseField} id={id}>
    {children}
  </div>
);

// Latex
const Latex = ({ children, id }: {children:ReactNode, id:string}) => (
  <div className={responseField} id={id}>
    {children}
  </div>
);

// SnippetIntro
const SnippetIntro = ({ children, id }: {children:ReactNode, id:string}) => (
  <div className={snippetIntro} id={id}>
    {children}
  </div>
);

// Combinez vos composants personnalisés avec les composants existants
const components = {
  ...MintComponents,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  p: P,
  ul: CustomUl,
  li: CustomLi,
  Note: Note,
  Info: Info,
  code: Code,
  ResponseField: ResponseField,
  Latex: Latex,
  SnippetIntro: SnippetIntro,
};



export default function MdxComponent({content}: MdxComponentProps) {
    const [rep, setRep] = useState<rep[]>([]);
    console.log(content.mdxSource);
    return (
      <repContext.Provider value={{setRep}}>
        <div className="flex flex-row flex-1">
          <div className="max-w-[720px] flex-1 pt-[122px] lg:mx-auto relative">
            <div className="text-gray-800 px-10 w-full max-w-full overflow-hidden">
              {/* FIXME: Remove any below */}
              <MDXProvider components={components as any}>
                  <Title title={content.frontMatter.title} description={content.frontMatter.description}/>
                  <MDXRemote {...content.mdxSource}/>
              </MDXProvider>
            </div>
            <div className="h-[64px] w-full flex justify-center items-center mb-10" >
              {/* <span className="text-xs" >
                  64px height
              </span> */}
            </div>
          </div>
          <div className='w-60 min-w-60 max-w-60 hidden lg:flex sticky top-0  h-screen pl-2 pr-4 pt-[122px] overflow-y-scroll flex-col gap-4'>
            <Label className="text-sm font-body" >
							On this page
						</Label>
            {rep.map((e, i) => {
              if (i === rep.length - 1) return null;
              return (
                <a key={'ine' + i} className="text-xs font-normal text-gray-400 hover:text-[#1e1f22] cursor-pointer" href={'#' + e.id} onClick={scrollToElement}>{e.name}</a>
              )
            })}
          </div>
        </div>
      </repContext.Provider>
    )
}
