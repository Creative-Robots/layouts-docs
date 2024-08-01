'use server'

import Doc, { DocType } from "@/components/Doc";
import { redirect } from "next/navigation";
import path from "path";
import * as fs from 'fs';

import LayoutsComponents from '../../../docs/Layouts/Components.json';

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
  if (filename === null) return null;
  const filePath = path.join(process.cwd(), 'src/docs/html/', `${filename}.json`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(fileContent);
  return jsonData;
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
  const htmlData = await getJsonData(name);
  if (htmlData) {
    return (
      <Doc htmldata={htmlData} isLayouts={false} layoutData={null}/>
    );
  } else {
    const layoutsData:ComponentDoc|null = getJsonDataLayouts(name);
    if (layoutsData) return <Doc layoutData={layoutsData} htmldata={null} isLayouts/>;
    else redirect('/');
  }
}