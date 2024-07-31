'use server'

import { redirect } from "next/navigation";
import path from "path";
import * as fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize'
import MdxComponent from "@/components/Mdx";
import { getCompiledServerMdx } from "@mintlify/mdx";
import {Info} from "@mintlify/components"


async function findFileRecursively(directory: string, filename: string): Promise<string | null> {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      // Si c'est un dossier, appeler récursivement la fonction
      const result = await findFileRecursively(filePath, filename);
      if (result) {
        return result;
      }
    } else if (stat.isFile() && file === `${filename}.mdx`) {
      // Si c'est le fichier recherché
      return filePath;
    }
  }

  return null;
}

async function getMdxData(filename: string){
  if (!filename) return null;

  // Trouver le fichier correspondant à filename.mdx dans tous les sous-dossiers à partir de src/docs/
  const filePath = await findFileRecursively(path.join(process.cwd(), 'src/docs/essentials/'), filename);

  if (!filePath) return null;

  // Lire le contenu du fichier MDX
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const mdxSource = await getCompiledServerMdx({source: fileContent });
  return mdxSource;
}

export default async function Home({ params }: { params: { name: string } }) {
  const { name } = params;
  let mdxSource = await getMdxData(name);
  if (!mdxSource) redirect('/');

  return (
    <>
      {/* <MdxComponent mdxSource={mdxSource} /> */}
      {mdxSource.content}
    </>
  );
}