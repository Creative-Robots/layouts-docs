'use server'


import { redirect } from "next/navigation";
import path from "path";
import * as fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize'
import { getCompiledServerMdx, MDXComponent } from "@mintlify/mdx";
// import {Info} from "@mintlify/components"
import * as MintComponents from "@mintlify/components"
import matter from 'gray-matter'

import "@mintlify/mdx/dist/styles.css"
import MdxComponent from "@/components/Mdx";
import { findElementByParsedName, getFilenames } from "@/lib/fileUtils";

const files = getFilenames('src/docs/essentials/');

// async function findFileRecursively(directory: string, filename: string): Promise<string | null> {
//   const files = fs.readdirSync(directory);

//   for (const file of files) {
//     const filePath = path.join(directory, file);
//     const stat = fs.lstatSync(filePath);

//     if (stat.isDirectory()) {
//       // Si c'est un dossier, appeler récursivement la fonction
//       const result = await findFileRecursively(filePath, filename);
//       if (result) {
//         return result;
//       }
//     } else if (stat.isFile() && file === `${filename}.mdx`) {
//       // Si c'est le fichier recherché
//       return filePath;
//     }
//   }

//   return null;
// }

async function getMdxData(filename: string){
  if (!filename) return null;

  // Trouver le fichier correspondant à filename.mdx dans tous les sous-dossiers à partir de src/docs/
  const filePath = findElementByParsedName(files, filename);
  // const filePath = await findFileRecursively(path.join(process.cwd(), 'src/docs/essentials/'), filename);

  if (!filePath) return null;

  // Lire le contenu du fichier MDX
  const fileContent = fs.readFileSync(filePath);
  const { content, data } = matter(fileContent)
  const mdxSource = await serialize(content)
  
  return {
    mdxSource,
    frontMatter: data
  }
}

export default async function Home({ params }: { params: { name: string } }) {
  const { name } = params;
  let source = await getMdxData(name);
  if (!source) redirect('/');

  return (
    <>
    <MdxComponent content={source}></MdxComponent>
    </>
  );
}