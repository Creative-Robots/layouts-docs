'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { createContext, MouseEventHandler, ReactNode, useEffect, useState } from "react"
import * as MintComponents from "@mintlify/components"
import { MDXProvider } from '@mdx-js/react'
import { cn } from "@/lib/cn"
import { code, description, descriptionBox, h1, h1Box, h2, h2Box, h3, h3Box, info, li, note, p, title, titleBox, ul } from "@/lib/Style"
import MyCodeBlock from "../CodeBlock"

import { rep, repContext, useRepContext } from "@/lib/RepContext"
import { scrollToElement } from "@/lib/utils"

interface MdxComponentProps {
    content: { mdxSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>; frontMatter: { [key: string]: any; }; }
}

// title
const Title = ({ children, id }: {children:ReactNode, id:string}) => (
    <h1 className={cn(titleBox)} id={id}>
      <span className={cn(title)}>{children}</span>
    </h1>
);

//description
const Description = ({ children, id }: {children:ReactNode, id:string}) => (
    <h3 className={cn(descriptionBox)} id={id}>
      <span className={cn(description)}>{children}</span>
    </h3>
);

const Linkable = ({id}:{id:string}) => {
    return (
        <div className="absolute">
        <a href={`#${id}`} onClick={scrollToElement} className="-ml-8 flex items-center opacity-0 border-0 group-hover:opacity-100 bg-gray-50 rounded-md shadow size-fit p-1 hover:bg-gray-100" aria-label="Navigate to header">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </a>
      </div>
    )
}

// h1
const CustomH1 = ({ children }: { children: ReactNode; id?: string }) => {
  const normalizedId = String(children).normalize();
  const { setRep } = useRepContext();
  useEffect(() => {
    setRep((l) => {
      return [...l, { name: children as string, id: normalizedId }];
    });
  }, [setRep]);
  return (
    <h1 className={h1Box} id={normalizedId}>
      <Linkable id={normalizedId} />
      <span className={h1}>{children}</span>
    </h1>
  );
};

// h2
const CustomH2 = ({ children }: {children:ReactNode, id:string}) => {
  const id = String(children).normalize();
  const {setRep} = useRepContext();
  useEffect(() => {
    setRep((l) => {
      if (l.filter(e => e.id == id).length > 0) return [...l];
      return [...l, {name: children as string, id: id}];
    })
  }, [setRep])
  return (
    <h2 className={h2Box} id={id}>
      <Linkable id={id}/>
      <span className={h2}>{children}</span>
    </h2>
)};

// h3
const CustomH3 = ({ children }: {children:ReactNode, id:string}) => {
  const id = String(children).normalize();
  const {setRep} = useRepContext();
  useEffect(() => {
    setRep((l) => {
      if (l.filter(e => e.id == id).length > 0) return [...l];
      return [...l, {name: children as string, id: id}];
    })
  }, [setRep])
  return (
    <h3 className={h3Box} id={id}>
      <Linkable id={id}/>
      <span className={h3}>{children}</span>
    </h3>
)};

// p
const CustomP = ({ children }: {children:ReactNode}) => <p className={p}>{children}</p>;

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
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0080ff" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    {children}
  </div>
);

// Note
const Info = ({ children, id }: {children:ReactNode, id:string}) => (
  <div className={info} id={id}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
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
  ? <MyCodeBlock code={children as string} language="jsx" withTitleBar={false}></MyCodeBlock>
  : <code className="size-fit text-wrap bg-gray-200 text-gray-800 border border-gray-300">{children}</code>
)};

// Combinez vos composants personnalisés avec les composants existants
const components = {
  ...MintComponents,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  p: CustomP,
  ul: CustomUl,
  li: CustomLi,
  Note: Note,
  Info: Info,
  code: Code,
};



export default function MdxComponent({content}: MdxComponentProps) {
    const [rep, setRep] = useState<rep[]>([]);
    return (
      <repContext.Provider value={{setRep}}>
        <div className="flex flex-row flex-1">
          <div className="max-w-[1200px] flex-1 pt-[122px] lg:mx-auto relative">
            <div className="text-gray-800 px-10 w-full max-w-full overflow-hidden">
              {/* FIXME: Remove any below */}
              <MDXProvider components={components as any}>
                  <Title id="title">{content.frontMatter.title}</Title>
                  <Description id="description">{content.frontMatter.description}</Description>
                  <MDXRemote {...content.mdxSource}/>
              </MDXProvider>
            </div>
          </div>
          <div className='w-60 min-w-60 max-w-60 hidden lg:flex sticky top-0  h-screen pl-2 pr-4 pt-[122px] overflow-y-scroll flex-col gap-4'>
            <h1 className='text-sm font-semibold'>On this page</h1>
            {rep.map((e, i) => {
              if (i === rep.length - 1) return null;
              return (
                <a key={'ine' + i} className="text-xs font-semibold hover:text-black text-[#555555] size-fit" href={'#' + e.id} onClick={scrollToElement}>{e.name}</a>
              )
            })}
          </div>
        </div>
      </repContext.Provider>
    )
}
