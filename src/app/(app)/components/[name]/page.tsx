'use server'

import Doc, { DocType } from "@/components/Doc";
import { redirect } from "next/navigation";
import path from "path";
import fs from 'fs';

import LayoutsComponents from '../../../../docs/layouts.json';
import HtmlComponents from '../../../../docs/html.json'

export type RadixPropDocumentation = {
  name: string,
  required?: boolean,
  type: string,
  default?: any,
  description: string,
  descriptionMdx: string
};

export type ComponentDoc = {
  name: string,
  tag: string,
  description?: string,
  refImplementation?: string,

  props: Partial<RadixPropDocumentation>[]|null[],
  subComponents: any[],

  examples: {
    title: string,
    description?: string,
    code?: string,
  }[],
  sources?: string[];
};

function getJsonData(filename:string):{
  entries: any,
  content: DocType
} |null {
  const match = HtmlComponents.find(e => e.parsedName === filename);
  if (!match) return null;
  return {
    entries: match.entries,
    content: match.content
  };
}

function getJsonDataLayouts(filename:string):{
  entries: any,
  content: ComponentDoc
} |null {
  const match = LayoutsComponents.find(e => e.parsedName === filename);
  if (!match) return null;
  return {
    entries: match.entries,
    content: {
      name: match.content.name,
      tag: match.content.tag,
      description: match.content.description,
      refImplementation: match.content.refImplementation,

      props: match.content.props,
      subComponents: match.content.subComponents,

      examples: match.content.examples,
      sources: match.content.sources
    }
  };
}

export default async function Home({ params }: { params: { name: string } }) {
  const { name } = params;
  const layoutsData:{
    entries: any,
    content: ComponentDoc
  } |null = getJsonDataLayouts(name);
  if (layoutsData) return <Doc layoutData={layoutsData.content} htmldata={null} entries={layoutsData.entries} isLayouts/>;
  else {
    const htmlData = getJsonData(name);
    if (htmlData) {
      return (
        <Doc htmldata={htmlData.content} isLayouts={false} entries={htmlData.entries} layoutData={null}/>
      );
    } else redirect('/');
  }
}