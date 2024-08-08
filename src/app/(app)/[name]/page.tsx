'use server'

import { serialize } from 'next-mdx-remote/serialize'
// import "@mintlify/mdx/dist/styles.css"
import MdxComponent from "@/components/Mdx";
import { findElementByParsedName, getMdxFiles } from "@/lib/fileUtils";
import { redirect } from 'next/navigation';
import { SheetContent } from '@/components/Sheet';

const files = getMdxFiles();

async function getMdxData(filename: string){
  if (!filename) return null;

  // Trouver le fichier correspondant à filename.mdx dans tous les sous-dossiers à partir de src/docs/
  const Dta = findElementByParsedName(files, filename);
  if (!Dta) return null;

  const {content, entries} = Dta;

  // Lire le contenu du fichier MDX
  const mdxSource = await serialize(content.MdxContent);
  
  return {
    entries,
    mdxSource,
    frontMatter: content.MdxFrontMatter
  }
}

export default async function Home({ params }: { params: { name: string } }) {
  const { name } = params;
  let source = await getMdxData(name);
  if (!source) {
    redirect('/')
  };

  return (
    <>
    <MdxComponent content={source}></MdxComponent>
    </>
  );
}