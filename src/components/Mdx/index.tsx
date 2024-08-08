'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { ReactNode } from "react"
import * as MintComponents from "@mintlify/components"
import { MDXProvider } from '@mdx-js/react'
import { cn } from "@/lib/cn"
import { Card, H3Box_Mdx, Heading2Box_Mdx, info, li, note, responseField, snippetIntro, TitleBox_Mdx, ul } from "@/lib/Style"

import { scrollToElement } from "@/lib/utils"
import { Heading1, Heading2, P, SubHeading, Title } from "../ContentComponents"
import { Label } from "../ui/label"
import { CodeBlock } from "../ContentComponents/CodeBlock"
import { Strong } from "../ContentComponents/Strong"
import Entries from "../ContentComponents/Entry"
import { redirect, useRouter } from "next/navigation"

interface MdxComponentProps {
    content: { 
      mdxSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>; 
      frontMatter: { [key: string]: any; };
      entries: {
        entry: string;
        level: number;
      }[] | undefined;
    }
}

const CustomH1 = ({ children, id }: {children:ReactNode, id:string}) => {
  return (
    <Heading1 title={children as string} className={TitleBox_Mdx}/>
  )
}

const CustomH2 = ({ children, id }: {children:ReactNode, id:string}) => {
  return (
    <Heading2 title={children as string} className={Heading2Box_Mdx}/>
  )
}

const CustomH3 = ({ children, id }: {children:ReactNode, id:string}) => {
  return (
    <SubHeading title={children as string} className={H3Box_Mdx}/>
  )
}

const Linkable = ({id}:{id:string}) => {
    return (
        <div className="absolute">
        <a href={`#${id}`} onClick={scrollToElement} className="-ml-8 flex items-center opacity-0 border-0 group-hover:opacity-100 bg-gray-50 rounded-md shadow size-fit p-1 hover:bg-gray-100" aria-label="Navigate to header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0080ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    {children}
  </div>
);

// Note
const Info = ({ children, id }: {children:ReactNode, id:string}) => (
  <div className={info} id={id}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
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

const Icon = (icon:string) => {
  switch (icon) {
    case 'rocket':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
    case 'display':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
    case 'robot':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
    case 'question':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
    case 'code':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-xml"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
      default:
      return <span>{icon}</span>
  }
}

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


export default function MdxComponent({content}: MdxComponentProps) {

  const router = useRouter();

  const redirCard = (title:string) => {
    if (title === "Help & Support") {
      router.push('/help');
    } else {
      router.push('/' + title.toLowerCase().replace(/ /g, '-'))
    }
  }
  
  // Card
  const CardBox = ({  title, icon, id, children, ...props }: {children:ReactNode, id:string, title:string, icon:string}) => (
    <div className={Card} id={id} onClick={() => redirCard(title)}>
      {Icon(icon)}
      <span className="text-lg font-body mt-2">{title}</span>
      <span className="text-sm font-body text-gray-400 -my-2">{children}</span>
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
    strong: Strong,
    Note: Note,
    Info: Info,
    code: Code,
    ResponseField: ResponseField,
    Latex: Latex,
    SnippetIntro: SnippetIntro,
    Card: CardBox,
  };

    return (
      <>
        <div className="flex flex-row flex-1 max-w-[1440px]">
          <div className="max-w-[1440px] flex-1 pt-[122px] relative">
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
          <Entries entries={content.entries} />
        </div>
      </>
    )
}
