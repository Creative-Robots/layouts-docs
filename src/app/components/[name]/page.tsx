'use server'

import Doc from "@/components/Doc";
import { redirect } from "next/navigation";
import path from "path";
import fs from 'fs';

import LayoutsComponents from '../../../docs/Layouts/Components.json';
import HtmlComponents from '../../../docs/html.json'

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
  subComponents: ComponentDoc[],

  examples: {
    title: string,
    description?: string,
    code?: string,
  }[],
};

async function getJsonData(filename:string) {
  const match = HtmlComponents.filter(e => e.parsedName === filename);
  if (match.length !== 1) return null;
  return match[0].content;
}

function getJsonDataLayouts(filename:string):ComponentDoc|null {
  const match = LayoutsComponents.filter(e => e.tag === filename);
  if (match.length !== 1) return null;
  return {
    name: match[0].name,
    tag: match[0].tag,
    description: match[0].description,
    refImplementation: match[0].refImplementation,

    props: match[0].props,
    subComponents: match[0].subComponents,

    examples: match[0].examples,
  };
}

export default async function Home({ params }: { params: { name: string } }) {
  const { name } = params;
  const layoutsData:ComponentDoc|null = getJsonDataLayouts(name);
  if (layoutsData) return <Doc layoutData={layoutsData} htmldata={null} isLayouts/>;
  else {
    const htmlData = await getJsonData(name);
    if (htmlData) {
      return (
        <Doc htmldata={htmlData} isLayouts={false} layoutData={null}/>
      );
    } else redirect('/');
  }
}